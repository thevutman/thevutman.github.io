/** Media queries shared by every GSAP `matchMedia` block (see tokens.css breakpoints). */
export const media = {
  motionOk: "(prefers-reduced-motion: no-preference)",
  reducedMotion: "(prefers-reduced-motion: reduce)",
  mobile: "(max-width: 640px)",
  finePointer: "(hover: hover) and (pointer: fine)",
} as const;

export const ease = {
  out: "power3.out",
  inOut: "power2.inOut",
  scrub: "power1.inOut",
} as const;

/** ScrollTrigger id of the pinned hero transition, read by the section snapping. */
export const HERO_TRANSITION_ID = "hero-transition";

export function prefersReducedMotion() {
  return window.matchMedia(media.reducedMotion).matches;
}
