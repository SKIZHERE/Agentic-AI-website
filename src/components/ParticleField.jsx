import { useEffect, useRef } from "react";
import "../styles/particles.css";

const REPEL_RADIUS = 130;
const REPEL_STRENGTH = 0.55;

function countFor(width) {
  if (width < 480) return 42;
  if (width < 900) return 72;
  return 110;
}

export default function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    let particles = [];
    let W = 0;
    let H = 0;
    let raf = 0;

    const makeParticle = () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 0.7 + Math.random() * 1.5,
      vx: (Math.random() - 0.5) * 0.12,
      vy: -(0.05 + Math.random() * 0.16),
      phase: Math.random() * Math.PI * 2,
      sway: 0.1 + Math.random() * 0.18,
    });

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: countFor(W) }, makeParticle);
      if (reduced) draw();
    };

    const themeAlpha = () => {
      const light = document.documentElement.dataset.theme === "light";
      return light ? 0.3 : 0.55;
    };

    const draw = (tick = 0) => {
      ctx.clearRect(0, 0, W, H);
      const alpha = themeAlpha();
      for (const p of particles) {
        const swayX = Math.sin(tick * 0.008 + p.phase) * p.sway;
        const tw = 0.35 + 0.65 * Math.abs(Math.sin(tick * 0.02 + p.phase));
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < REPEL_RADIUS && dist > 0.001) {
          const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_STRENGTH;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }
        p.x += p.vx + swayX * 0.25;
        p.y += p.vy;
        if (p.y < -6) {
          p.y = H + 6;
          p.x = Math.random() * W;
        }
        if (p.x < -6) p.x = W + 6;
        if (p.x > W + 6) p.x = -6;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37, 99, 235, ${alpha * tw})`;
        ctx.fill();
      }
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      draw((tick += 1));
    };
    let tick = 0;

    const onMouse = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (!reduced) window.requestAnimationFrame(() => (raf = requestAnimationFrame(loop)));
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    if (!reduced) loop();
    else draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />;
}