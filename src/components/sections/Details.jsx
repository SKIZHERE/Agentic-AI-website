import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import Icon from "../ui/Icon";
import { useContent } from "../../context/content";
import "../section.css";

export default function Details({ id = "details" }) {
  const { event } = useContent();
  return (
    <section className="section details" id={id}>
      <div className="container">
        <Reveal>
          <SectionHeading
            align="left"
            overline="Key Highlights"
            title="What to expect at JAAIS 2026"
            sub="Connect, learn, build and collaborate with the agentic AI community."
          />
        </Reveal>

        <div className="details-grid">
          {event.details.map((d, i) => (
            <Reveal key={d.label} delay={i * 80}>
              <div className="card details-card">
                <div className="details-card__icon">
                  <Icon name={d.icon} size={22} />
                </div>
                <span className="details-card__label">{d.label}</span>
                <span className="details-card__value">{d.value}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}