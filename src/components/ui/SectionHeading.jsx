export default function SectionHeading({ overline, title, sub }) {
  return (
    <div className="section-heading">
      {overline && <span className="overline">{overline}</span>}
      <h2 className="section-title">{title}</h2>
      {sub && <p className="section-sub">{sub}</p>}
    </div>
  );
}