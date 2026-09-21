import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import { event } from "../../data/event";
import "../section.css";

export default function About({ id = "about" }) {
  return (
    <section className="section" id={id}>
      <div className="grid-bg" aria-hidden="true" />
      <div className="container">
        <Reveal>
          <SectionHeading
            overline="About the Hackathon"
            title={event.about.heading}
            sub="One weekend. One mission. Agents that act."
          />
        </Reveal>

        <div className="about-grid">
          {event.about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 90}>
              <div className={`card about-card ${i === 1 ? "about-card--accent" : ""}`}>
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