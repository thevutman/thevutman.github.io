import { gsap } from "@/lib/gsap";
import { ease } from "@/lib/motion";

/** Seconds for one step; longer jumps take a little more. */
const STEP_DURATION = 0.7;
/** The step between the hero and the next panel is slower so the scene's
    parallax break-apart can be seen. */
const FIRST_STEP_DURATION = 1.5;
/** A wheel pause longer than this (ms) starts a new gesture. */
const GESTURE_GAP = 160;
/** Minimum swipe (px) that counts as a step on touch screens. */
const SWIPE_DISTANCE = 40;

/** Scroll positions of every resting point marker StackPanel renders. */
function restingPoints() {
  const points = gsap.utils
    .toArray<HTMLElement>(".stack-snap")
    .filter((marker) => marker.offsetParent !== null)
    .map((marker) => Math.round(marker.getBoundingClientRect().top + window.scrollY));
  return [...new Set(points)].sort((a, b) => a - b);
}

function nearestIndex(points: number[], position: number) {
  let best = 0;
  points.forEach((point, index) => {
    if (Math.abs(point - position) < Math.abs((points[best] ?? 0) - position)) best = index;
  });
  return best;
}

/** Inputs that belong to something else: an open dialog, a form field, zooming. */
function isElsewhere(event: Event) {
  if (document.querySelector("dialog[open]")) return true;
  const target = event.target as Element | null;
  return Boolean(target?.closest("input, textarea, select, [contenteditable='true']"));
}

/**
 * One gesture, one step: a wheel notch, a swipe or an arrow key immediately
 * travels to the next resting point in that direction, instead of waiting for
 * the scroll to stop and then settling. Trackpad inertia that follows a step
 * belongs to the same gesture and is ignored. Scrollbar drags and other
 * native scrolls settle on the nearest point once they end.
 *
 * Returns a cleanup function that removes every listener.
 */
export function enableStepScroll() {
  let tween: gsap.core.Tween | null = null;
  let lastWheel = 0;
  let lastDelta = 0;
  let gestureUsed = false;
  let touchStart: number | null = null;

  const goTo = (target: number) => {
    const distance = Math.abs(target - window.scrollY);
    if (distance < 2) return;
    const steps = distance / window.innerHeight;
    const firstStepEnd = restingPoints()[1] ?? 0;
    const withinFirstStep = Math.max(window.scrollY, target) <= firstStepEnd + 2;
    const proxy = { y: window.scrollY };
    tween = gsap.to(proxy, {
      y: target,
      duration: withinFirstStep
        ? FIRST_STEP_DURATION
        : Math.min(STEP_DURATION + (steps - 1) * 0.12, 1.4),
      ease: ease.inOut,
      onUpdate: () => window.scrollTo(0, proxy.y),
      onComplete: () => {
        tween = null;
      },
    });
  };

  const step = (direction: 1 | -1) => {
    if (tween) return;
    const points = restingPoints();
    const position = window.scrollY;
    const target =
      direction > 0
        ? points.find((point) => point > position + 2)
        : points.findLast((point) => point < position - 2);
    if (target !== undefined) goTo(target);
  };

  const onWheel = (event: WheelEvent) => {
    if (event.ctrlKey || isElsewhere(event)) return;
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    event.preventDefault();

    const now = performance.now();
    const delta = Math.abs(event.deltaY);
    // A pause, or a sudden acceleration over decaying inertia, is a new gesture.
    if (now - lastWheel > GESTURE_GAP || delta > lastDelta * 1.6) gestureUsed = false;
    lastWheel = now;
    lastDelta = delta;

    if (gestureUsed || tween || delta < 2) return;
    gestureUsed = true;
    step(event.deltaY > 0 ? 1 : -1);
  };

  const onTouchStart = (event: TouchEvent) => {
    touchStart = isElsewhere(event) ? null : (event.touches[0]?.clientY ?? null);
  };

  const onTouchMove = (event: TouchEvent) => {
    if (touchStart !== null && event.cancelable) event.preventDefault();
  };

  const onTouchEnd = (event: TouchEvent) => {
    if (touchStart === null) return;
    const end = event.changedTouches[0]?.clientY ?? touchStart;
    const distance = touchStart - end;
    touchStart = null;
    if (Math.abs(distance) >= SWIPE_DISTANCE) step(distance > 0 ? 1 : -1);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.altKey || event.ctrlKey || event.metaKey || isElsewhere(event)) return;
    // Space on a focused button or link activates it.
    if (event.key === " " && (event.target as Element).closest("a, button")) return;

    const forward =
      ["ArrowDown", "PageDown"].includes(event.key) || (event.key === " " && !event.shiftKey);
    const backward =
      ["ArrowUp", "PageUp"].includes(event.key) || (event.key === " " && event.shiftKey);
    if (forward || backward) {
      event.preventDefault();
      step(forward ? 1 : -1);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const points = restingPoints();
      const target = event.key === "Home" ? points[0] : points.at(-1);
      if (target !== undefined && !tween) goTo(target);
    }
  };

  // Scrollbar drags, find-in-page and the like end between resting points.
  const onScrollEnd = () => {
    if (tween || document.querySelector("dialog[open]")) return;
    const points = restingPoints();
    const target = points[nearestIndex(points, window.scrollY)];
    if (target !== undefined) goTo(target);
  };

  window.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: false });
  window.addEventListener("touchend", onTouchEnd);
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("scrollend", onScrollEnd);

  return () => {
    tween?.kill();
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchend", onTouchEnd);
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("scrollend", onScrollEnd);
  };
}
