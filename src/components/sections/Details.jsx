import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import Icon from "../ui/Icon";
import { event } from "../../data/event";
import "../section.css";

export default function Details({ id = "details" }) {
  return (
    <section className="section details" id={id}>
      <div className="container">
        <Reveal>
          <SectionHeading
            overline="Event Details"
            title="When & where the magic happens"
            sub="Everything you need to plan your weekend around the build."
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