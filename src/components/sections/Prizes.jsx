import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import Icon from "../ui/Icon";
import { event } from "../../data/event";
import "../section.css";

export default function Prizes({ id = "prizes" }) {
  return (
    <section className="section prizes" id={id}>
      <div className="prize-orb prize-orb--a" aria-hidden="true" />
      <div className="container">
        <Reveal>
          <SectionHeading
            overline="Prizes & Perks"
            title="What's on the line"
            sub="Beyond the cash — mentorship, incubation and interviews."
          />
        </Reveal>

        <div className="prizes-grid">
          {event.prizes.map((p, i) => (
            <Reveal key={p.place} delay={i * 90}>
              <div className={`card prize-card ${p.highlight ? "prize-card--gold" : ""}`}>
                {p.highlight && (
                  <span className="prize-card__best">Best of the best</span>
                )}
                <div className="prize-card__icon">
                  <Icon name={p.highlight ? "trophy" : "gift"} size={26} />
                </div>
                <h3 className="prize-card__place">{p.place}</h3>
                <p className="prize-card__amount text-gradient">{p.amount}</p>
                <p className="prize-card__perks muted">{p.perks}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}