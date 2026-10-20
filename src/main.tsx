// Global styles first: they declare the cascade layer order (theme, base,
// components, utilities) that every component stylesheet relies on.
import "./styles/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const root = document.getElementById("root");
if (!root) throw new Error("No se encontró el elemento #root");

// Restoring the previous scroll position fights the pinned hero on reload.
history.scrollRestoration = "manual";

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
