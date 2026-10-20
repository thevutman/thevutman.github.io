import type { MouseEvent } from "react";

/** Breathing room kept between the fixed navigation bar and a section. */
const HEADER_GAP = 10;

function headerHeight() {
  return document.querySelector<HTMLElement>(".portfolio-header")?.offsetHeight ?? 0;
}

/**
 * Resting scroll position for a section, shared by the navigation and the
 * snapping so both land in exactly the same place: sections that fit below the
 * header are centred in that space, taller ones align their top under it.
 * Anything inside the hero resolves to the top of the page.
 */
export function sectionScrollTarget(element: HTMLElement) {
  if (element.closest("#inicio")) return 0;

  const header = headerHeight();
  const available = window.innerHeight - header;
  const { top, height } = element.getBoundingClientRect();
  const offset = height <= available ? header + (available - height) / 2 : header + HEADER_GAP;
  const max = document.documentElement.scrollHeight - window.innerHeight;

  return Math.min(Math.max(window.scrollY + top - offset, 0), max);
}

/** Jumps straight to a section without playing the pinned hero transition. */
export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  const top = sectionScrollTarget(target);
  target.focus({ preventScroll: true });
  window.scrollTo({ top, behavior: "instant" });
  // Focusing an element inside a pinned container can schedule a native
  // scroll; re-applying the position on the next frame keeps the jump exact.
  requestAnimationFrame(() => window.scrollTo({ top, behavior: "instant" }));
}

/** Click handler for in-page anchors; modified clicks keep native behaviour. */
export function handleSectionLink(event: MouseEvent<HTMLAnchorElement>, id: string) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return;
  }
  event.preventDefault();
  history.replaceState(null, "", `#${id}`);
  scrollToSection(id);
}
