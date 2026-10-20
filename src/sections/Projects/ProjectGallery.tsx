import { useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { ProjectCard } from "@/components/ui/ProjectCard/ProjectCard";
import type { Project } from "@/data/projects";
import { Flip, gsap, ScrollTrigger } from "@/lib/gsap";
import { ease, media, prefersReducedMotion } from "@/lib/motion";

type FlipState = ReturnType<typeof Flip.getState>;

/** Space kept clear of the fixed header when bringing a card into view. */
const HEADER_CLEARANCE = 90;

/**
 * Editorial grid with one expandable card at a time.
 *
 * React state is the single source of truth: the selected card is rendered
 * first and spans the full row, so DOM order, tab order and visual order always
 * match. GSAP Flip only animates between the layouts React produces — if it
 * does not run (reduced motion), the gallery behaves the same without motion.
 */
export function ProjectGallery({ projects }: { projects: Project[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const flipState = useRef<FlipState | null>(null);

  const ordered = useMemo(() => {
    const items = projects.map((project, index) => ({ project, index }));
    const selected = items.find(({ project }) => project.id === selectedId);
    return selected ? [selected, ...items.filter((item) => item !== selected)] : items;
  }, [projects, selectedId]);

  const select = (id: string | null, toggle: HTMLButtonElement | null) => {
    const gallery = galleryRef.current;
    if (gallery && !prefersReducedMotion()) {
      flipState.current = Flip.getState(gallery.querySelectorAll(".project-card"));
    }
    toggleRef.current = toggle;
    setSelectedId(id);
  };

  useLayoutEffect(() => {
    const gallery = galleryRef.current;
    const toggle = toggleRef.current;
    // Nothing to do until the user has opened a card.
    if (!gallery || !toggle) return;

    // Reordering can move the focused button in the DOM; keep focus on it.
    if (document.activeElement !== toggle) toggle.focus({ preventScroll: true });

    // Applies to opening and closing: the card the user acted on stays in view.
    const bringIntoView = () => {
      ScrollTrigger.refresh();
      const card = toggle.closest(".project-card");
      const top = card?.getBoundingClientRect().top ?? 0;
      if (top < HEADER_CLEARANCE || top > window.innerHeight * 0.6) {
        window.scrollTo({
          top: window.scrollY + top - HEADER_CLEARANCE,
          behavior: prefersReducedMotion() ? "instant" : "smooth",
        });
      }
    };

    const state = flipState.current;
    flipState.current = null;
    if (!state) {
      bringIntoView();
      return;
    }

    const mm = gsap.matchMedia(gallery);
    mm.add(media.motionOk, () => {
      Flip.from(state, {
        duration: 0.55,
        ease: ease.inOut,
        scale: false,
        onComplete: bringIntoView,
      });
      if (selectedId) {
        gsap.from(".project-detail > *", {
          opacity: 0,
          y: 12,
          duration: 0.4,
          stagger: 0.08,
          clearProps: "opacity,transform",
        });
      }
    });
    return () => mm.revert();
  }, [selectedId]);

  const closeOnEscape = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Escape" || !selectedId) return;
    event.preventDefault();
    select(null, toggleRef.current);
  };

  return (
    // Escape bubbles up from the focused card controls; the grid itself is not interactive.
    <div ref={galleryRef} className="project-grid" onKeyDown={closeOnEscape}>
      {ordered.map(({ project, index }) => {
        const expanded = project.id === selectedId;
        return (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            expanded={expanded}
            muted={selectedId !== null && !expanded}
            onToggle={(event) => select(expanded ? null : project.id, event.currentTarget)}
          />
        );
      })}
    </div>
  );
}
