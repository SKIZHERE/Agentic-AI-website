import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import { useContent } from "../../context/content";
import "../section.css";

export default function Timeline({ id = "timeline" }) {
  const { event } = useContent();
  return (
    <section className="section timeline" id={id}>
      <div className="container">
        <Reveal>
          <SectionHeading
            align="left"
            overline="Roadmap"
            title="The 24-hour build sprint"
            sub="A rough arc — burnouts optional, shipping agents not."
          />
        </Reveal>

        <div className="timeline-list">
          {event.timeline.map((t, i) => (
            <Reveal key={t.title} delay={i * 90}>
              <div className="timeline-item">
                <div className="timeline-item__rail">
                  <span className="timeline-item__node">{i + 1}</span>
                  {i < event.timeline.length - 1 && <span className="timeline-item__line" />}
                </div>
                <div className="card timeline-item__card">
                  <span className="timeline-item__phase text-gradient">{t.phase}</span>
                  <h3 className="timeline-item__title">{t.title}</h3>
                  <span className="timeline-item__date">{t.date}</span>
                  <p className="timeline-item__desc muted">{t.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}