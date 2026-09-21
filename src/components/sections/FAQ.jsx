import { useState } from "react";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import { event } from "../../data/event";
import "../section.css";

function FaqItem({ faq, i }) {
  const [open, setOpen] = useState(false);
  const id = `faq-panel-${i}`;

  return (
    <div className={`faq-item ${open ? "is-open" : ""}`}>
      <button
        type="button"
        className="faq-item__head"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="faq-item__q">{faq.q}</span>
        <span className="faq-item__toggle" aria-hidden="true" />
      </button>
      <div id={id} className="faq-item__body">
        <p>{faq.a}</p>
      </div>
    </div>
  );
}

export default function FAQ({ id = "faq" }) {
  return (
    <section className="section faq" id={id}>
      <div className="container">
        <Reveal>
          <SectionHeading
            overline="FAQ"
            title="Questions, answered"
            sub="Anything else? Ping us at the event Discord."
          />
        </Reveal>

        <div className="faq-list">
          {event.faqs.map((faq, i) => (
            <Reveal key={i} delay={(i % 2) * 60}>
              <FaqItem faq={faq} i={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}