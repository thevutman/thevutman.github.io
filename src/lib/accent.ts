import { gsap } from "@/lib/gsap";

/** Orange is home; each tap on the dot of the i moves to the next one. */
export const accents = ["#ff4a1c", "#2f4bff", "#c6f432", "#ff3d8b", "#14b88a"] as const;

let current = 0;

/**
 * Swaps the accent colour across the whole site. The dot squashes and springs
 * back and two rings of the new colour ripple out of it.
 */
export function cycleAccent(dot: HTMLElement) {
  current = (current + 1) % accents.length;
  const next = accents[current] ?? accents[0];
  gsap.to(document.documentElement, { "--accent": next, duration: 0.5, ease: "power2.inOut" });
  gsap
    .timeline()
    .to(".tittle-pop", { scale: 0.55, duration: 0.1, ease: "power2.in" })
    .to(".tittle-pop", { scale: 1, duration: 0.9, ease: "elastic.out(1.3, .35)" });
  for (let k = 0; k < 2; k++) {
    const ring = document.createElement("span");
    ring.className = "ripple";
    ring.style.setProperty("--c", next);
    dot.append(ring);
    gsap.fromTo(
      ring,
      { scale: 1, opacity: 1 },
      {
        scale: 4 + k * 2.5,
        opacity: 0,
        duration: 0.9 + k * 0.3,
        delay: k * 0.08,
        ease: "expo.out",
        onComplete: () => ring.remove(),
      },
    );
  }
}
