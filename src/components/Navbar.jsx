import { useEffect, useState } from "react";
import { event, site } from "../data/event";
import ThemeToggle from "./ThemeToggle";
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
            <img src="/logo.png" alt="" width="28" height="28" />
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

        <div className="navbar__right">
          <ThemeToggle />
          <button
            type="button"
            className={`navbar__toggle ${open ? "is-open" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  );
}