import { event, site } from "../data/event";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2l2.1 6.2L20 10l-5.9 1.8L12 18l-2.1-6.2L4 10l5.9-1.8L12 2z" fill="url(#fg)" />
              <circle cx="18.5" cy="4.5" r="2" fill="url(#fg)" />
              <defs>
                <linearGradient id="fg" x1="4" y1="2" x2="20" y2="18">
                  <stop stopColor="#3b82f6" />
                  <stop offset="1" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>
            <p className="footer__name">
              {event.name} <span className="footer__year">{event.edition}</span>
            </p>
            <p className="footer__organizer muted">{event.organizer}</p>
          </div>
        </div>

        <div className="footer__links">
          {site.nav.map((item) => (
            <a key={item.target} href={item.target}>
              {item.label}
            </a>
          ))}
          <a href="mailto:hello@agenticai.events">{site.social.email}</a>
        </div>

        <p className="footer__note muted">{site.footerNote}</p>

        <p className="footer__copy muted">
          © {new Date().getFullYear()} Agentic AI Hackathon · All rights reserved.
        </p>
      </div>
    </footer>
  );
}