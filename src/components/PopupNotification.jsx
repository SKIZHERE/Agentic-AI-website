import { useEffect, useRef } from "react";
import { useContent } from "../context/content";
import "../styles/popup.css";

export default function PopupNotification({ open, onClose, onRegister, onExplore }) {
  const closeRef = useRef(null);
  const { event } = useContent();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="popup-overlay" role="dialog" aria-modal="true" aria-labelledby="popup-title">
      <div className="popup-backdrop" onClick={onClose} />
      <div className="popup-card glass">
        <button
          ref={closeRef}
          type="button"
          className="popup-close"
          aria-label="Close notification"
          onClick={onClose}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        <div className="popup-glow" aria-hidden="true" />

        <div className="popup-card__scroll">
          <div className="popup-top">
            <span className="badge">
              <span className="badge--dot" />
              {event.badge}
            </span>
            <span className="popup-kicker">{event.popup.kicker}</span>
          </div>

          <h2 id="popup-title" className="popup-title">{event.popup.title}</h2>

          <div className="popup-event" aria-hidden="true">
            <span className="popup-event__name">{event.name}</span>
            <span className="popup-event__year">{event.edition}</span>
          </div>

          <p
            className="popup-body"
            dangerouslySetInnerHTML={{ __html: event.popup.body }}
          />

          <div className="popup-actions">
            <button type="button" className="btn btn-primary btn-lg" onClick={onRegister}>
              {event.popup.primaryLabel}
            </button>
            <button type="button" className="btn btn-ghost btn-lg" onClick={onExplore}>
              {event.popup.secondaryLabel}
            </button>
          </div>

          <p className="popup-disclaimer muted">{event.popup.disclaimer}</p>
        </div>
      </div>
    </div>
  );
}