import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useContent } from "../context/content";
import ThemeToggle from "./ThemeToggle";
import "../styles/navbar.css";

export default function Navbar({ onRegister }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeTarget, setActiveTarget] = useState(null);
  const [indicator, setIndicator] = useState(null);
  const linksRef = useRef(null);
  const linkRefs = useRef(new Map());
  const { event, site } = useContent();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const updateActiveTarget = () => {
      const position = window.scrollY + window.innerHeight * 0.35;
      let currentTarget = null;

      site.nav.forEach((item) => {
        const section = document.querySelector(item.target);
        if (section && section.getBoundingClientRect().top + window.scrollY <= position) {
          currentTarget = item.target;
        }
      });

      setActiveTarget((current) => (current === currentTarget ? current : currentTarget));
    };

    updateActiveTarget();
    window.addEventListener("scroll", updateActiveTarget, { passive: true });
    window.addEventListener("resize", updateActiveTarget);
    return () => {
      window.removeEventListener("scroll", updateActiveTarget);
      window.removeEventListener("resize", updateActiveTarget);
    };
  }, [site.nav]);

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const links = linksRef.current;
      const link = activeTarget ? linkRefs.current.get(activeTarget) : null;

      if (!links || !link) {
        setIndicator((current) => (current?.visible ? null : current));
        return;
      }

      const linksRect = links.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      const next = {
        left: linkRect.left - linksRect.left - 7,
        top: linkRect.top - linksRect.top - 4,
        width: linkRect.width + 14,
        height: linkRect.height + 8,
        visible: true,
      };

      setIndicator((current) => {
        if (
          current?.visible &&
          Math.abs(current.left - next.left) < 0.5 &&
          Math.abs(current.top - next.top) < 0.5 &&
          Math.abs(current.width - next.width) < 0.5 &&
          Math.abs(current.height - next.height) < 0.5
        ) {
          return current;
        }
        return next;
      });
    };

    const frame = window.requestAnimationFrame(updateIndicator);
    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(updateIndicator);

    if (linksRef.current) {
      resizeObserver?.observe(linksRef.current);
    }
    if (activeTarget && linkRefs.current.get(activeTarget)) {
      resizeObserver?.observe(linkRefs.current.get(activeTarget));
    }

    window.addEventListener("resize", updateIndicator);
    window.addEventListener("scroll", updateIndicator, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateIndicator);
      window.removeEventListener("scroll", updateIndicator);
      resizeObserver?.disconnect();
    };
  }, [activeTarget, scrolled, open, site.nav]);

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        <a href="#home" className="navbar__brand" aria-label="Home">
          <span className="navbar__logo" aria-hidden="true">
            <img src={site.logoUrl || "/logo.png"} alt="" width="28" height="28" />
          </span>
          <span className="navbar__name">
            {event.name} <sup className="navbar__year">{event.edition}</sup>
          </span>
        </a>

        <ul className={`navbar__links ${open ? "is-open" : ""}`} ref={linksRef}>
          <li
            className={`navbar__indicator ${indicator?.visible ? "is-visible" : ""}`}
            aria-hidden="true"
            style={
              indicator?.visible
                ? {
                    transform: `translate(${indicator.left}px, ${indicator.top}px)`,
                    width: `${indicator.width}px`,
                    height: `${indicator.height}px`,
                  }
                : undefined
            }
          />
          {site.nav.map((item) => (
            <li key={item.target}>
              <a
                href={item.target}
                aria-current={activeTarget === item.target ? "true" : undefined}
                ref={(node) => {
                  if (node) {
                    linkRefs.current.set(item.target, node);
                  } else {
                    linkRefs.current.delete(item.target);
                  }
                }}
                onClick={() => {
                  setOpen(false);
                  setActiveTarget(item.target);
                }}
              >
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
              Get Involved
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
