import { useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { media } from "@/lib/motion";
import { exitRange } from "@/lib/stack";
import { enableStepScroll } from "@/lib/stepScroll";

/**
 * Page-level behaviour of the stacked panels:
 *  - every panel between the first and the last recedes and dims while the
 *    next one covers it; the hero breaks apart on its own (useCinematicHero)
 *    and the other section scenes live in each section;
 *  - scrolling moves one resting point per gesture (see enableStepScroll).
 */
export function useStackPanels() {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(media.stack, () => {
      const tracks = gsap.utils.toArray<HTMLElement>(".stack-track");
      tracks.slice(1, -1).forEach((track) => {
        gsap.to(track.querySelector(".stack-content"), {
          scale: 0.9,
          yPercent: 4,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: { ...exitRange(track), scrub: true },
        });
      });

      return enableStepScroll();
    });

    // Track positions depend on final font metrics and image layout.
    let cancelled = false;
    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };
    void document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      cancelled = true;
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);
}
