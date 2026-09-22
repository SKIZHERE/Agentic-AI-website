import { useEffect, useMemo, useState } from "react";
import { db } from "../lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { DEFAULT_CONTENT, CONTENT_PATH } from "../data/contentSchema";
import { ContentContext } from "./content";

export function ContentProvider({ children }) {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [status, setStatus] = useState("static");
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!db) return undefined;

    const ref = doc(db, ...CONTENT_PATH.split("/"));

    let unsub;
    try {
      unsub = onSnapshot(
        ref,
        (snap) => {
          if (snap.exists()) {
            const remote = snap.data();
            setContent({
              event: { ...DEFAULT_CONTENT.event, ...(remote.event || {}) },
              site: { ...DEFAULT_CONTENT.site, ...(remote.site || {}) },
            });
            setConnected(true);
          } else {
            setContent(DEFAULT_CONTENT);
            setConnected(false);
          }
          setStatus("ready");
        },
        (err) => {
          console.warn("Firestore unavailable — falling back to local content.", err);
          setContent(DEFAULT_CONTENT);
          setStatus("static");
          setConnected(false);
        }
      );
    } catch (err) {
      console.warn("Firebase init failed — falling back to local content.", err);
      setStatus("static");
      setConnected(false);
    }

    return () => {
      if (unsub) unsub();
    };
  }, []);

  const value = useMemo(
    () => ({ event: content.event, site: content.site, status, connected }),
    [content, status, connected]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}