import { gsap } from "@/lib/gsap";

/**
 * Geometry of the stacked panels (see StackPanel). Every track is laid out by
 * CSS alone, so these values are read from the DOM whenever ScrollTrigger
 * refreshes instead of being duplicated in JavaScript.
 *
 * A track's scroll story, in absolute scroll positions:
 *   [start - height, start]           the panel slides up over the previous one
 *   [start, start + hold]             the panel rests while its own scenes play
 *   [start + hold, start + hold + height]  the next panel covers it
 */
export function trackMetrics(track: HTMLElement) {
  const panel = track.querySelector<HTMLElement>(".stack-panel");
  const height = panel?.offsetHeight ?? window.innerHeight;
  const steps = Number(getComputedStyle(track).getPropertyValue("--steps").trim()) || 0;
  const start = track.getBoundingClientRect().top + window.scrollY;
  return { start, height, hold: steps * height };
}

/** ScrollTrigger range for the scenes played while the panel rests. */
export function holdRange(track: HTMLElement) {
  return {
    trigger: track,
    start: () => trackMetrics(track).start,
    end: () => {
      const { start, hold } = trackMetrics(track);
      return start + hold;
    },
    invalidateOnRefresh: true,
  };
}

/** ScrollTrigger range for the panel sliding in over the previous one. */
export function entranceRange(track: HTMLElement) {
  return {
    trigger: track,
    start: () => {
      const { start, height } = trackMetrics(track);
      return start - height;
    },
    end: () => trackMetrics(track).start,
    invalidateOnRefresh: true,
  };
}

/** ScrollTrigger range for the panel being covered by the next one. */
export function exitRange(track: HTMLElement) {
  return {
    trigger: track,
    start: () => {
      const { start, hold } = trackMetrics(track);
      return start + hold;
    },
    end: () => {
      const { start, hold, height } = trackMetrics(track);
      return start + hold + height;
    },
    invalidateOnRefresh: true,
  };
}

/**
 * Hidden state for content that a scrubbed animation reveals later. It must be
 * set outside the scroll animation: ScrollTrigger reverts its animations on
 * every refresh, and a tween that has not started yet (a later stagger target,
 * a tween placed mid-timeline) is not re-rendered, so it would show up early.
 * Pair it with a `.to()` towards `{ opacity: 1, y: 0 }`.
 */
export function hideUntilRevealed(targets: gsap.TweenTarget, y: number) {
  gsap.set(targets, { opacity: 0, y });
}

export function closestTrack(element: Element) {
  return element.closest<HTMLElement>(".stack-track");
}
