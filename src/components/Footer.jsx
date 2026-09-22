import { useContent } from "../context/content";
import "../styles/footer.css";

export default function Footer() {
  const { event, site } = useContent();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <img src={site.logoUrl || "/logo.png"} alt="" width="30" height="30" aria-hidden="true" />
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
          © {new Date().getFullYear()} Jaypee AI Summit · Built by JYC · All rights reserved.
        </p>

        <a href="#admin" className="footer__admin muted">
          Content Admin
        </a>
      </div>
    </footer>
  );
}