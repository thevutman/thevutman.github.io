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

export function prefersReducedMotion() {
  return window.matchMedia(media.reducedMotion).matches;
}

export function hasFinePointer() {
  return window.matchMedia(media.finePointer).matches;
}
