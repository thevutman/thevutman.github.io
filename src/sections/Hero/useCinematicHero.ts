import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { ease, media } from "@/lib/motion";
import { closestTrack, exitRange } from "@/lib/stack";

/**
 * All hero motion, scoped to the hero element:
 *  1. entrance — layers and name fade in once on load;
 *  2. parallax — inner planes follow a fine pointer, scaled by `data-depth`;
 *  3. transition — while the projects panel slides over the hero, the scene
 *     breaks apart layer by layer, scrubbed by scroll.
 *
 * Each concern lives in its own matchMedia block so crossing a breakpoint
 * rebuilds only the parts that depend on it. With reduced motion none of them
 * run and the hero is a static, fully readable section.
 */
export function useCinematicHero(heroRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const mm = gsap.matchMedia(hero);

    mm.add(media.motionOk, () => {
      gsap
        .timeline({ defaults: { ease: ease.out } })
        .from(".parallax-plane:not(.star-plane)", { opacity: 0, duration: 1.1, stagger: 0.06 }, 0)
        .from(".name-line", { y: 36, opacity: 0, duration: 1, stagger: 0.12 }, 0.15)
        .from(".hero-detail", { y: 10, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.45);
    });

    mm.add(`${media.motionOk} and ${media.finePointer}`, () => {
      const planes = gsap.utils.toArray<HTMLElement>("[data-depth]").map((plane) => ({
        depth: Number(plane.dataset["depth"]),
        x: gsap.quickTo(plane, "x", { duration: 1.3, ease: ease.out }),
        y: gsap.quickTo(plane, "y", { duration: 1.3, ease: ease.out }),
      }));
      let bounds = hero.getBoundingClientRect();

      const measure = () => {
        bounds = hero.getBoundingClientRect();
      };
      const follow = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        // Normalised to [-0.5, 0.5]; depth is the maximum offset in px.
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        planes.forEach((plane) => {
          plane.x(x * plane.depth);
          plane.y(y * plane.depth * 0.5);
        });
      };
      const reset = () => {
        planes.forEach((plane) => {
          plane.x(0);
          plane.y(0);
        });
      };

      hero.addEventListener("pointerenter", measure);
      hero.addEventListener("pointermove", follow);
      hero.addEventListener("pointerleave", reset);
      return () => {
        hero.removeEventListener("pointerenter", measure);
        hero.removeEventListener("pointermove", follow);
        hero.removeEventListener("pointerleave", reset);
      };
    });

    mm.add(media.stack, () => {
      const track = closestTrack(hero);
      if (!track) return;

      gsap
        .timeline({
          defaults: { ease: ease.scrub },
          scrollTrigger: { ...exitRange(track), scrub: true },
        })
        .to(".hero-identity, .hero-bottom", { y: -45, opacity: 0, duration: 0.35 }, 0)
        .to(".star-layer", { yPercent: -55, opacity: 0, duration: 0.8 }, 0.05)
        .to(".moon-layer", { xPercent: 20, yPercent: -65, opacity: 0, duration: 0.8 }, 0.05)
        .to(".mountain-layer", { yPercent: -35, opacity: 0, duration: 0.8 }, 0.1)
        .to(".distant-forest-layer", { xPercent: -25, opacity: 0, duration: 0.7 }, 0.15)
        .to(".river-layer", { yPercent: 50, opacity: 0, duration: 0.7 }, 0.2)
        .to(".near-forest-layer", { xPercent: 30, yPercent: 25, opacity: 0, duration: 0.7 }, 0.15)
        .to(".wolf-layer", { xPercent: 35, yPercent: 30, opacity: 0, duration: 0.65 }, 0.2)
        .to(".foreground-layer", { yPercent: 110, opacity: 0, duration: 0.6 }, 0.2)
        .to(".landscape", { opacity: 0, duration: 0.35 }, 0.65);
    });

    return () => mm.revert();
  }, [heroRef]);
}
