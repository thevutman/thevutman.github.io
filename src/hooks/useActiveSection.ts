import { useEffect, useState } from "react";

/** Distance from the top of the viewport at which a section counts as current. */
const ACTIVATION_OFFSET = 160;
const SCROLLED_THRESHOLD = 60;

/**
 * Tracks which section is under the navigation bar and whether the page has
 * left the top. Scroll work is batched into one read per animation frame.
 */
export function useActiveSection<T extends string>(ids: readonly T[]) {
  const [active, setActive] = useState<T | undefined>(ids[0]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const root = document.documentElement;
      const atEnd =
        window.scrollY > 0 && window.scrollY + window.innerHeight >= root.scrollHeight - 4;
      const current = ids
        .filter(
          (id) =>
            (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <=
            ACTIVATION_OFFSET,
        )
        .at(-1);
      setScrolled(window.scrollY > SCROLLED_THRESHOLD);
      setActive(atEnd ? ids.at(-1) : (current ?? ids[0]));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ids]);

  return { active, scrolled };
}
