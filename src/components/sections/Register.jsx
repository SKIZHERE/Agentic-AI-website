import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import { useContent } from "../../context/content";
import "../section.css";

export default function Register({ id = "register" }) {
  const { event, site } = useContent();
  return (
    <section className="section register" id={id}>
      <div className="register-orb register-orb--a" aria-hidden="true" />
      <div className="register-orb register-orb--b" aria-hidden="true" />
      <div className="container">
        <Reveal>
          <SectionHeading
            overline="Registration"
            title="Secure your seat, builder"
            sub={event.register.note}
          />

          <div className="register-panel glass">
            <span className="badge register-panel__badge">
              <span className="badge--dot" />
              Slots filling fast
            </span>

            <p className="register-panel__lead">
              Pick your doorway — both go to the same registration.
            </p>

            <div className="register-panel__actions">
              <a
                className="btn btn-primary btn-lg"
                href={site.register.googleFormUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 3v9m0 0l4-4m-4 4L8 8M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {site.register.googleFormLabel}
              </a>
              <a
                className="btn btn-ghost btn-lg"
                href={site.register.unstopUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                {site.register.unstopLabel}
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <p className="register-panel__hint muted">
              100% free · No login to browse · Google Form & Unstop both accepted
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}