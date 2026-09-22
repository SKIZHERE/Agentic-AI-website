import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import { useContent } from "../../context/content";
import "../section.css";

export default function About({ id = "about" }) {
  const { event } = useContent();
  return (
    <section className="section" id={id}>
      <div className="grid-bg" aria-hidden="true" />
      <div className="container">
        <Reveal>
          <SectionHeading
            overline="Jaypee Agentic AI International Summit"
            title={event.about.heading}
            sub="Intelligent Agents. Real-World Impact."
          />
        </Reveal>

        <div className="about-grid">
          {event.about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 90}>
              <div
                className={`card about-card ${i === 1 ? "about-card--accent card--round-lg" : ""}`}
              >
                <span className="about-card__num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p>{p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}