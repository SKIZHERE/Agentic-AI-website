export function TextInput({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      className="ad-field"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

export function TextArea({ value, onChange, rows = 3, placeholder }) {
  return (
    <textarea
      className="ad-field ad-field--area"
      rows={rows}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

export function BoolInput({ value, onChange, label }) {
  return (
    <label className="ad-bool">
      <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

export function Field({ label, children }) {
  return (
    <label className="ad-field-block">
      <span className="ad-label">{label}</span>
      {children}
    </label>
  );
}