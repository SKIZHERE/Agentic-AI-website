import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import Icon from "../ui/Icon";
import { event } from "../../data/event";
import "../section.css";

export default function Rules({ id = "rules" }) {
  return (
    <section className="section rules" id={id}>
      <div className="grid-bg" aria-hidden="true" />
      <div className="container">
        <Reveal>
          <SectionHeading
            overline="Rules & Eligibility"
            title="Keep it fair, keep it agentic"
            sub="Short, sharp rules so the playing field stays level for everyone."
          />
        </Reveal>

        <div className="rules-grid">
          {event.rules.map((rule, i) => (
            <Reveal key={i} delay={(i % 2) * 70}>
              <div className="rule-item">
                <span className="rule-item__check">
                  <Icon name="check" size={16} strokeWidth={2.2} />
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