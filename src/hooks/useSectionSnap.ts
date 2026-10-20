import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { HERO_TRANSITION_ID, media } from "@/lib/motion";
import { sectionScrollTarget } from "@/lib/scrollToSection";

/** Two resting points closer than this (in viewports) count as one step. */
const STEP_LIMIT = 1.2;
/** Share of a step that has to be scrolled before it completes itself. */
const COMMIT = 0.1;
/** Inside long stretches, how close (in viewports) the next resting point must be to snap. */
const SNAP_RANGE = 0.3;

/** Resting points: top, end of the hero transition, and every section. */
function restingPoints() {
  const points = [0];
  const hero = ScrollTrigger.getById(HERO_TRANSITION_ID);
  if (hero) points.push(hero.end);
  document.querySelectorAll<HTMLElement>("main > section:not(#inicio)").forEach((section) => {
    points.push(sectionScrollTarget(section));
  });
  return [...new Set(points.map(Math.round))].sort((a, b) => a - b);
}

/**
 * Section snapping driven by one ScrollTrigger over the whole page, so it
 * cooperates with the pinned hero instead of fighting it:
 *  - between two nearby resting points (the hero transition, short sections)
 *    the scroll completes itself in the direction the user was moving;
 *  - across long stretches (the gallery, an open case study) it only settles
 *    when the user stops close to a section, so reading is never interrupted.
 * Resting points match the navigation targets. Disabled with reduced motion.
 */
export function useSectionSnap() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(media.motionOk, () => {
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

            const viewport = window.innerHeight;
            const step = next - previous;
            let target: number | undefined;

            if (step <= viewport * STEP_LIMIT) {
              const advanced = (position - previous) / step;
              target =
                self.direction > 0
                  ? advanced > COMMIT
                    ? next
                    : previous
                  : advanced < 1 - COMMIT
                    ? previous
                    : next;
            } else {
              // Only settle on the point the user is heading towards, so
              // starting to read a long section never pulls back to its top.
              const ahead = self.direction > 0 ? next : previous;
              if (Math.abs(ahead - position) <= viewport * SNAP_RANGE) target = ahead;
            }

            return target === undefined ? progress : target / distance;
          },
          inertia: false,
          delay: 0.15,
          duration: { min: 0.25, max: 0.8 },
          ease: "power2.inOut",
        },
      });
    });

    return () => mm.revert();
  }, []);
}
