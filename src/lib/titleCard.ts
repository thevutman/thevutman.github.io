import { gsap } from "@/lib/gsap";
import { ease } from "@/lib/motion";
import { entranceRange, hideUntilRevealed, holdRange } from "@/lib/stack";

/**
 * Scenes of a panel that opens with a TitleCard, like a film title:
 *  - while the panel slides in, the title's letters light up one by one;
 *  - on the first resting step the title blurs away and `content` rises in.
 *
 * Returns the resting timeline with that first step spanning time 0–1, so a
 * section can append one more unit of time per extra step (time k is the
 * k-th resting point). Call it inside a scoped `gsap.matchMedia` block.
 */
export function titleCardScenes(track: HTMLElement, scope: HTMLElement, content: string) {
  const card = scope.querySelector(".title-card");
  const letters = gsap.utils.toArray<HTMLElement>(".title-card-char", scope);
  const revealed = gsap.utils.toArray<HTMLElement>(content, scope);

  gsap.set(letters, { opacity: 0.1, yPercent: 35 });
  gsap.to(letters, {
    opacity: 1,
    yPercent: 0,
    ease: ease.out,
    stagger: { amount: 0.35 },
    scrollTrigger: { ...entranceRange(track), scrub: true },
  });

  hideUntilRevealed(revealed, 50);

  return gsap
    .timeline({
      defaults: { ease: ease.scrub },
      scrollTrigger: { ...holdRange(track), scrub: true },
    })
    .to(card, { opacity: 0, scale: 0.86, filter: "blur(18px)", duration: 0.45 }, 0)
    .to(revealed, { opacity: 1, y: 0, duration: 0.4, stagger: { amount: 0.2 } }, 0.35)
    .to({}, { duration: 0.05 }, 0.95);
}
