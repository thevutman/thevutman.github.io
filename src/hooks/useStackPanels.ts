import { useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ease, media } from "@/lib/motion";
import { exitRange } from "@/lib/stack";

/** Share of a step the user has to scroll before it completes itself. */
const COMMIT = 0.08;

/** Scroll positions of every resting point marker StackPanel renders. */
function restingPoints() {
  const points = gsap.utils
    .toArray<HTMLElement>(".stack-snap")
    .filter((marker) => marker.offsetParent !== null)
    .map((marker) => Math.round(marker.getBoundingClientRect().top + window.scrollY));
  return [...new Set(points)].sort((a, b) => a - b);
}

/**
 * Page-level behaviour of the stacked panels:
 *  - every panel but the last recedes and dims while the next one covers it
 *    (section scenes live in each section);
 *  - directional snapping: once a scroll moves a little past a resting point,
 *    it completes the step in that direction. Native CSS mandatory snapping
 *    would pull a single wheel notch back to where it started.
 */
export function useStackPanels() {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(media.stack, () => {
      const tracks = gsap.utils.toArray<HTMLElement>(".stack-track");
      tracks.slice(0, -1).forEach((track) => {
        gsap.to(track.querySelector(".stack-content"), {
          scale: 0.9,
          yPercent: 4,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: { ...exitRange(track), scrub: true },
        });
      });

      ScrollTrigger.create({
        start: 0,
        end: "max",
        snap: {
          snapTo: (progress, self) => {
            const distance = self ? self.end - self.start : 0;
            if (!self || distance <= 0) return progress;

            const position = progress * distance;
            const points = restingPoints();
            const next = points.find((point) => point > position);
            const previous = points.findLast((point) => point <= position);
            if (next === undefined || previous === undefined) return progress;

            const advanced = (position - previous) / (next - previous);
            const target =
              self.direction > 0
                ? advanced > COMMIT
                  ? next
                  : previous
                : advanced < 1 - COMMIT
                  ? previous
                  : next;
            return target / distance;
          },
          inertia: false,
          delay: 0.08,
          duration: { min: 0.35, max: 0.9 },
          ease: ease.inOut,
        },
      });
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
