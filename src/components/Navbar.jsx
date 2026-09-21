import { useEffect, useState } from "react";
import { event, site } from "../data/event";
import "../styles/navbar.css";

export default function Navbar({ onRegister }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        <a href="#home" className="navbar__brand" aria-label="Home">
          <span className="navbar__logo" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l2.1 6.2L20 10l-5.9 1.8L12 18l-2.1-6.2L4 10l5.9-1.8L12 2z" fill="url(#bl)" />
              <circle cx="18.5" cy="4.5" r="2" fill="url(#bl)" />
              <defs>
                <linearGradient id="bl" x1="4" y1="2" x2="20" y2="18">
                  <stop stopColor="#3b82f6" />
                  <stop offset="1" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="navbar__name">
            {event.name} <sup className="navbar__year">{event.edition}</sup>
          </span>
        </a>

        <ul className={`navbar__links ${open ? "is-open" : ""}`}>
          {site.nav.map((item) => (
            <li key={item.target}>
              <a href={item.target} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
          <li className="navbar__links-cta">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => {
                setOpen(false);
                onRegister();
              }}
            >
              Register
            </button>
          </li>
        </ul>

        <button
          type="button"
          className={`navbar__toggle ${open ? "is-open" : ""}`}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}