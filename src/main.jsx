import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/theme.css";
import "./styles/global.css";
import App from "./App.jsx";

function bootTheme() {
  try {
    const stored = window.localStorage.getItem("agentic-ai-theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* storage unavailable */
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

document.documentElement.dataset.theme = bootTheme();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);