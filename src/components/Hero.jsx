import { lazy, Suspense } from "react";
import { event, site } from "../data/event";
import "../styles/hero.css";

const Hero3D = lazy(() => import("./Hero3D"));

export default function Hero({ onRegister }) {
  return (
    <header className="hero" id="home">
      <Suspense
        fallback={
          <div className="hero3d hero3d--pending" aria-hidden="true">
            <div className="fallback-orb fallback-orb--a" />
            <div className="fallback-orb fallback-orb--b" />
            <div className="fallback-grid" />
          </div>
        }
      >
        <Hero3D />
      </Suspense>
      <div className="hero-vignette" aria-hidden="true" />

      <div className="hero-content">
        <span className="badge hero-badge">
          <span className="badge--dot" />
          {event.badge} — {event.name} {event.edition}
        </span>

        <h1 className="hero-title">
          Build{" "}
          <span className="hero-word">
              <span className="text-gradient">autonomous AI agents</span>
            <svg
              className="hero-underline"
              viewBox="0 0 220 14"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M4 10c32-6 60-2 92-4s66-3 120-6"
                stroke="url(#underline-grad)"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <defs>
                <linearGradient id="underline-grad" x1="0" y1="0" x2="220" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3b82f6" />
                  <stop offset="1" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </svg>
          </span>{" "}
          that think, act &amp; ship.
        </h1>

        <div className="hero-cta">
          <button type="button" className="btn btn-primary btn-lg" onClick={onRegister}>
            Register Now
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <a href="#about" className="btn btn-ghost btn-lg">
            Explore More
          </a>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat__num">48h</span>
            <span className="hero-stat__label">Build Sprint</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat__num">₹5L</span>
            <span className="hero-stat__label">Prize Pool</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat__num">1–4</span>
            <span className="hero-stat__label">Team Size</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat__num">Hybrid</span>
            <span className="hero-stat__label">Online + On-site</span>
          </div>
        </div>

        <div className="hero-meta muted">
          {event.details[0].value} · 100% free · {site.register.googleFormLabel} open now
        </div>
      </div>

      <a href="#about" className="hero-scroll" aria-label="Scroll to content">
        <span />
      </a>
    </header>
  );
}