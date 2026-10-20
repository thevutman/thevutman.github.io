import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { ease, media } from "@/lib/motion";

/**
 * Discreet staggered entrance for the editorial sections. Content is visible by
 * default; the animation only runs when motion is allowed and is reverted on
 * unmount (including React Strict Mode's double mount).
 */
export function useScrollReveal(scope: RefObject<HTMLElement | null>, targets: string) {
  useLayoutEffect(() => {
    const element = scope.current;
    if (!element) return;

    const mm = gsap.matchMedia(element);
    mm.add(media.motionOk, () => {
      gsap.from(targets, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.1,
        ease: ease.out,
        clearProps: "opacity,transform",
        scrollTrigger: { trigger: element, start: "top 85%", once: true },
      });
    });
    return () => mm.revert();
  }, [scope, targets]);
}
