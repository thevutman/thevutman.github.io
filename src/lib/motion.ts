/** Media queries shared by every GSAP `matchMedia` block (see tokens.css breakpoints). */
export const media = {
  motionOk: "(prefers-reduced-motion: no-preference)",
  reducedMotion: "(prefers-reduced-motion: reduce)",
  mobile: "(max-width: 640px)",
  finePointer: "(hover: hover) and (pointer: fine)",
  /**
   * Full-screen stacked panels. Kept in sync with the same query in
   * StackPanel.css: with reduced motion or a very short viewport the page falls
   * back to ordinary flowing sections.
   */
  stack: "(prefers-reduced-motion: no-preference) and (min-height: 560px)",
} as const;

export const ease = {
  out: "power3.out",
  inOut: "power2.inOut",
  scrub: "power1.inOut",
} as const;

export function prefersReducedMotion() {
  return window.matchMedia(media.reducedMotion).matches;
}

export function isStacked() {
  return window.matchMedia(media.stack).matches;
}
