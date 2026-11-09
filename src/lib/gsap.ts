import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Plugins are registered once, here; components import GSAP from this module.
gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);

export { Draggable, gsap, ScrollTrigger };

export const media = {
  reducedMotion: "(prefers-reduced-motion: reduce)",
  finePointer: "(hover: hover) and (pointer: fine)",
  mobile: "(max-width: 760px)",
} as const;

/**
 * How letters enter everywhere: they rise from below the line with a slight tilt and fade in at
 * the same time. Without stretching (scaleY), so halfway through a letter looks soft and faint,
 * not stretched and cut by the line mask. Use as `gsap.from(chars, { ...lettersIn, duration })`.
 */
export const lettersIn = {
  yPercent: 60,
  opacity: 0,
  rotation: 6,
  transformOrigin: "0% 100%",
  ease: "expo.out",
} as const;

export function prefersReducedMotion() {
  return window.matchMedia(media.reducedMotion).matches;
}

export function hasFinePointer() {
  return window.matchMedia(media.finePointer).matches;
}
