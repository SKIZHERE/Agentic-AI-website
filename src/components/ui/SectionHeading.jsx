export default function SectionHeading({ overline, title, sub, align = "center" }) {
  const cls = align === "left" ? "section-heading section-heading--left" : "section-heading";
  return (
    <div className={cls}>
      {overline && <span className="overline">{overline}</span>}
      <h2 className="section-title">{title}</h2>
      {sub && <p className="section-sub">{sub}</p>}
    </div>
  );
}