import Lenis from "lenis";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";

/**
 * One Lenis instance for the whole page, driven by GSAP's ticker so smooth
 * scrolling and ScrollTrigger stay in the same frame.
 */
let lenis: Lenis | null = null;

export function startSmoothScroll() {
  if (lenis || prefersReducedMotion()) return () => undefined;
  const instance = new Lenis({ lerp: 0.085 });
  const tick = (time: number) => instance.raf(time * 1000);
  instance.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  lenis = instance;
  return () => {
    gsap.ticker.remove(tick);
    instance.destroy();
    lenis = null;
  };
}

/** Freezes scrolling (loader, open case study) and lets it go again. */
export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

/** Scrolls to a section id; "contacto" goes to the very end, where the footer is revealed. */
export function scrollToSection(id: string) {
  const end = document.documentElement.scrollHeight;
  const target = id === "contacto" ? end : document.getElementById(id);
  if (!target) return;
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.6 });
    return;
  }
  const top =
    typeof target === "number" ? target : target.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

/** Click handler for in-page links: smooth-scrolls instead of jumping. */
export function goTo(event: { preventDefault(): void }, id: string) {
  event.preventDefault();
  scrollToSection(id);
}
