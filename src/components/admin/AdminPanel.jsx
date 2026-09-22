import { useEffect, useMemo, useState } from "react";
import { db, auth } from "../../lib/firebase";
import { useContent } from "../../context/content";
import { DEFAULT_CONTENT } from "../../data/contentSchema";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { SECTIONS } from "./schema";
import { TextInput, TextArea, BoolInput, Field } from "./fields";
import "../../styles/admin.css";

function getAt(obj, path) {
  return path.reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

function setAt(obj, path, value) {
  if (path.length === 0) return value;
  const [head, ...rest] = path;
  const next = Array.isArray(obj) ? [...obj] : { ...(obj ?? {}) };
  next[head] = setAt(next[head], rest, value);
  return next;
}

function Control({ def, value, onChange }) {
  switch (def.type) {
    case "textarea":
      return <TextArea value={value} onChange={onChange} rows={def.rows} />;
    case "boolean":
      return <BoolInput value={value} onChange={onChange} label={def.label} />;
    default:
      return <TextInput value={value} onChange={onChange} />;
  }
}

function StringListEditor({ label, value, onChange }) {
  const items = value ?? [];
  return (
    <div className="ad-list">
      <span className="ad-label">{label}</span>
      {items.map((item, i) => (
        <div className="ad-list__row" key={i}>
          <input
            type="text"
            className="ad-field"
            value={item}
            onChange={(e) => onChange(items.map((it, j) => (j === i ? e.target.value : it)))}
          />
          <button
            type="button"
            className="ad-btn ad-btn--ghost"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        className="ad-btn ad-btn--sm"
        onClick={() => onChange([...items, ""])}
      >
        + Add
      </button>
    </div>
  );
}

function GroupEditor({ value, fields, onChange }) {
  const group = value ?? {};
  return (
    <div className="ad-group">
      {Object.entries(fields).map(([key, def]) => {
        if (def.type === "listString") {
          return (
            <StringListEditor
              key={key}
              label={def.label}
              value={group[key]}
              onChange={(v) => onChange({ ...group, [key]: v })}
            />
          );
        }
        if (def.type === "boolean") {
          return (
            <Control
              key={key}
              def={def}
              value={group[key]}
              onChange={(v) => onChange({ ...group, [key]: v })}
            />
          );
        }
        return (
          <Field key={key} label={def.label}>
            <Control
              def={def}
              value={group[key]}
              onChange={(v) => onChange({ ...group, [key]: v })}
            />
          </Field>
        );
      })}
    </div>
  );
}

function ListEditor({ items, itemFields, defaults, onChange }) {
  const list = items ?? [];
  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= list.length) return;
    const next = [...list];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div className="ad-list">
      {list.map((item, i) => (
        <div className="ad-card" key={i}>
          <div className="ad-card__head">
            <span className="ad-card__index">#{i + 1}</span>
            <div className="ad-card__tools">
              <button type="button" className="ad-btn ad-btn--ghost" onClick={() => move(i, -1)} disabled={i === 0}>
                ↑
              </button>
              <button type="button" className="ad-btn ad-btn--ghost" onClick={() => move(i, 1)} disabled={i === list.length - 1}>
                ↓
              </button>
              <button
                type="button"
                className="ad-btn ad-btn--danger"
                onClick={() => onChange(list.filter((_, j) => j !== i))}
              >
                Remove
              </button>
            </div>
          </div>
          <GroupEditor
            value={item}
            fields={itemFields}
            onChange={(updated) => onChange(list.map((it, j) => (j === i ? updated : it)))}
          />
        </div>
      ))}
      <button
        type="button"
        className="ad-btn ad-btn--sm"
        onClick={() => onChange([...list, { ...defaults }])}
      >
        + Add item
      </button>
    </div>
  );
}

function SectionEditor({ section, value, onChange }) {
  if (section.kind === "list") {
    return <ListEditor items={value} itemFields={section.itemFields} defaults={section.defaultItem} onChange={onChange} />;
  }
  if (section.kind === "group") {
    return <GroupEditor value={value} fields={section.fields} onChange={onChange} />;
  }
  return (
    <Field label={section.title}>
      <Control def={{ type: section.kind }} value={value} onChange={onChange} />
    </Field>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.code === "auth/invalid-credential" ? "Incorrect email or password." : err.message);
    }
    setBusy(false);
  };

  return (
    <form className="ad-login" onSubmit={submit}>
      <h2>Content Admin</h2>
      <p className="ad-login__hint">Sign in with your JYC member account to edit the site.</p>
      <Field label="Email">
        <TextInput value={email} onChange={setEmail} placeholder="member@jyc.events" />
      </Field>
      <Field label="Password">
        <input
          type="password"
          className="ad-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
      </Field>
      {error && <p className="ad-error">{error}</p>}
      <button type="submit" className="ad-btn ad-btn--primary" disabled={busy}>
        {busy ? "Signing in…" : "Sign in"}
      </button>
      <a href="#home" className="ad-btn ad-btn--ghost">
        Back to site
      </a>
    </form>
  );
}

function Editor({ user }) {
  const live = useContent();
  const [draft, setDraft] = useState(() => structuredClone(DEFAULT_CONTENT));
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (live.connected) setDraft(structuredClone({ event: live.event, site: live.site }));
  }, [live.connected]);

  const liveSnapshot = useMemo(() => ({ event: live.event, site: live.site }), [live.event, live.site]);
  const dirty = JSON.stringify(draft) !== JSON.stringify(liveSnapshot);

  const save = async () => {
    setSaving(true);
    setMsg("");
    try {
      await setDoc(
        doc(db, "content", "site"),
        { event: draft.event, site: draft.site, updatedAt: serverTimestamp(), updatedBy: user.email },
        { merge: true }
      );
      setMsg("Saved — site updated live.");
    } catch (err) {
      setMsg("Save failed: " + err.message);
    }
    setSaving(false);
  };

  const resetToDefaults = async () => {
    if (!window.confirm("Overwrite the live content with the local defaults?")) return;
    setSaving(true);
    try {
      await setDoc(doc(db, "content", "site"), DEFAULT_CONTENT);
      setDraft(structuredClone(DEFAULT_CONTENT));
      setMsg("Reset to defaults — site updated live.");
    } catch (err) {
      setMsg("Reset failed: " + err.message);
    }
    setSaving(false);
  };

  return (
    <div className="ad-wrap">
      <header className="ad-head">
        <div>
          <h2>Content Admin</h2>
          <p className="ad-head__sub">
            Signed in as <strong>{user.email}</strong>
            {live.connected ? (
              <span className="ad-pill ad-pill--live">Live</span>
            ) : (
              <span className="ad-pill ad-pill--off">Offline</span>
            )}
          </p>
        </div>
        <div className="ad-head__actions">
          <button
            type="button"
            className="ad-btn"
            onClick={() => setDraft(structuredClone(liveSnapshot))}
          >
            Refresh from live
          </button>
          <button type="button" className="ad-btn ad-btn--ghost" onClick={() => signOut(auth)}>
            Sign out
          </button>
          <a href="#home" className="ad-btn ad-btn--ghost">
            Back to site
          </a>
        </div>
      </header>

      {dirty && <p className="ad-dirty">Unsaved changes</p>}
      {msg && <p className="ad-msg">{msg}</p>}

      <div className="ad-sections">
        {SECTIONS.map((section, i) => (
          <details className="ad-section" key={i} open={i === 0}>
            <summary>{section.title}</summary>
            <div className="ad-section__body">
              <SectionEditor
                section={section}
                value={getAt(draft, section.path)}
                onChange={(v) => setDraft((d) => setAt(d, section.path, v))}
              />
            </div>
          </details>
        ))}
      </div>

      <footer className="ad-foot">
        <button type="button" className="ad-btn ad-btn--primary" onClick={save} disabled={saving || !dirty}>
          {saving ? "Saving…" : dirty ? "Save changes" : "No changes"}
        </button>
        <button type="button" className="ad-btn ad-btn--danger" onClick={resetToDefaults} disabled={saving}>
          Reset to defaults
        </button>
      </footer>
    </div>
  );
}

function AuthGate() {
  const [user, setUser] = useState(null);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    if (!auth) return undefined;
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setBusy(false);
    });
  }, []);

  if (busy) {
    return <div className="ad-wrap-center">Checking session…</div>;
  }
  if (!user) return <LoginForm />;
  return <Editor user={user} />;
}

export default function AdminPanel() {
  const [open, setOpen] = useState(() => window.location.hash === "#admin");

  useEffect(() => {
    const onHash = () => setOpen(window.location.hash === "#admin");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  if (!open) return null;

  if (!db) {
    return (
      <div className="ad-overlay">
        <div className="ad-wrap-center">
          <h2>Content Admin</h2>
          <p>
            Firebase isn't configured yet. Add your keys to the <code>.env</code> file (see{" "}
            <code>.env.example</code>) and restart the dev server.
          </p>
          <a href="#home" className="ad-btn">
            Back to site
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="ad-overlay">
      <AuthGate />
    </div>
  );
}