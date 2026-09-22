import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import Icon from "../ui/Icon";
import { useContent } from "../../context/content";
import "../section.css";

export default function Tracks({ id = "tracks" }) {
  const { event } = useContent();
  return (
    <section className="section tracks" id={id}>
      <div className="grid-bg" aria-hidden="true" />
      <div className="container">
        <Reveal>
          <SectionHeading
            align="left"
            overline="Key Thematic Areas"
            title="Fifteen areas shaping Agentic AI"
            sub="Dive into the domains where agentic systems are redefining what technology can do."
          />
        </Reveal>

        <div className="tracks-grid">
          {event.tracks.map((t, i) => (
            <Reveal key={t.title} delay={i * 80}>
              <div className={`card track-card ${i === 2 ? "card--elevated card--round-lg" : ""}`}>
                <div className="track-card__icon">
                  <Icon name={t.icon} size={24} />
                </div>
                <h3 className="track-card__title">{t.title}</h3>
                <p className="track-card__desc muted">{t.desc}</p>
                <span className="track-card__tag">
                  Area {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}