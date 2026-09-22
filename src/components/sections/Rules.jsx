import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import Icon from "../ui/Icon";
import { useContent } from "../../context/content";
import "../section.css";

export default function Rules({ id = "rules" }) {
  const { event } = useContent();
  return (
    <section className="section rules" id={id}>
      <div className="grid-bg" aria-hidden="true" />
      <div className="container">
        <Reveal>
          <SectionHeading
            overline="Who Should Attend?"
            title="Built for the entire AI ecosystem"
            sub="Researchers, builders, leaders and curious minds — JAIIS 2026 welcomes everyone shaping the future of Agentic AI."
          />
        </Reveal>

        <div className="rules-grid">
          {event.rules.map((rule, i) => (
            <Reveal key={i} delay={(i % 2) * 70}>
              <div className={"rule-item" + (event.rulesTbd ? " rule-item--tbd" : "")}>
                <span className="rule-item__check">
                  <Icon name={event.rulesTbd ? "clock" : "check"} size={16} strokeWidth={2.2} />
                </span>
                <p>{rule}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}