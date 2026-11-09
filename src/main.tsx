// Global styles first: they declare the cascade layer order (theme, base,
// components, utilities) that every component stylesheet relies on.
import "./styles/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ScrollTrigger } from "@/lib/gsap";
import { App } from "./App";

const root = document.getElementById("root");
if (!root) throw new Error("No se encontró el elemento #root");

// The page always opens at the top, behind the loader. ScrollTrigger keeps its
// own scroll memory, so it is told to forget it too.
ScrollTrigger.clearScrollMemory("manual");
window.scrollTo(0, 0);

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
