import { useLayoutEffect, useRef, type RefObject } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle/SectionTitle";
import { TitleCard } from "@/components/ui/TitleCard/TitleCard";
import { projects } from "@/data/projects";
import { gsap } from "@/lib/gsap";
import { media } from "@/lib/motion";
import { closestTrack, trackMetrics } from "@/lib/stack";
import { titleCardScenes } from "@/lib/titleCard";
import { ProjectShowcase } from "./ProjectShowcase";
import "./Projects.css";

/** Rounded clip of a cover: hidden below its box, or fully shown. */
const CLIP_HIDDEN = "inset(100% 0% 0% 0% round 18px)";
const CLIP_SHOWN = "inset(0% 0% 0% 0% round 18px)";

/**
 * Scenes of the projects panel: the title card gives way to the first project,
 * then every resting step swaps in the next one. Its cover rises from below
 * over the previous one, the name and meta roll up and the backdrop takes the
 * new project's tone. Project k rests at time k + 1 of the timeline.
 */
function useShowcaseScenes(sectionRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = section && closestTrack(section);
    if (!section || !track) return;

    const mm = gsap.matchMedia(section);
    mm.add(media.stack, () => {
      const items = gsap.utils.toArray<HTMLElement>(".showcase-item");
      const ticks = gsap.utils.toArray<HTMLElement>(".showcase-tick");
      const part = (item: HTMLElement | undefined, selector: string) =>
        item ? gsap.utils.toArray<HTMLElement>(selector, item) : [];

      const first = items[0];
      gsap.set(part(first, ".showcase-backdrop"), { opacity: 0 });
      gsap.set(ticks, { scaleX: 0.45, opacity: 0.35 });
      gsap.set(ticks.slice(0, 1), { scaleX: 1, opacity: 1 });

      const scenes = titleCardScenes(
        track,
        section,
        ".showcase-index, .showcase-item:first-child .showcase-article > *",
      ).to(part(first, ".showcase-backdrop"), { opacity: 1, duration: 0.5 }, 0.3);

      items.slice(1).forEach((item, offset) => {
        const previous = items[offset];
        const at = offset + 1;

        gsap.set(part(item, ".showcase-media"), { clipPath: CLIP_HIDDEN });
        gsap.set(part(item, ".showcase-media-inner"), { scale: 1.3 });
        gsap.set(part(item, ".showcase-mask-inner"), { yPercent: 110 });
        gsap.set(part(item, ".showcase-backdrop"), { opacity: 0 });

        scenes
          .to(
            part(previous, ".showcase-mask-inner"),
            { yPercent: -110, duration: 0.4, stagger: 0.04, ease: "power3.in" },
            at + 0.05,
          )
          .to(
            part(previous, ".showcase-media"),
            { scale: 0.9, opacity: 0.35, duration: 0.8, ease: "power2.inOut" },
            at + 0.1,
          )
          .to(
            part(item, ".showcase-media"),
            { clipPath: CLIP_SHOWN, duration: 0.8, ease: "power3.inOut" },
            at + 0.1,
          )
          .to(
            part(item, ".showcase-media-inner"),
            { scale: 1, duration: 0.8, ease: "power2.out" },
            at + 0.1,
          )
          .to(
            part(item, ".showcase-backdrop"),
            { opacity: 1, duration: 0.6, ease: "none" },
            at + 0.2,
          )
          .to(
            part(item, ".showcase-mask-inner"),
            { yPercent: 0, duration: 0.45, stagger: 0.05, ease: "power3.out" },
            at + 0.45,
          )
          .to(
            ticks.slice(offset, offset + 1),
            { scaleX: 0.45, opacity: 0.35, duration: 0.3 },
            at + 0.2,
          )
          .to(ticks.slice(at, at + 1), { scaleX: 1, opacity: 1, duration: 0.3 }, at + 0.4);
      });
      // Keep one full unit per project so resting points land on whole times.
      scenes.to({}, { duration: 0.05 }, items.length - 0.05);

      // Keyboard users tab through covers that may be hidden: scroll to the
      // resting point that shows the focused project.
      const showFocused = (event: FocusEvent) => {
        const item = (event.target as Element).closest(".showcase-item");
        const index = items.indexOf(item as HTMLElement);
        if (index < 0) return;
        const { start, height } = trackMetrics(track);
        window.scrollTo({ top: start + (index + 1) * height, behavior: "instant" });
      };
      section.addEventListener("focusin", showFocused);
      return () => section.removeEventListener("focusin", showFocused);
    });
    return () => mm.revert();
  }, [sectionRef]);
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  useShowcaseScenes(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="portfolio-section content-band"
      id="proyectos"
      tabIndex={-1}
      aria-labelledby="projects-title"
    >
      <TitleCard eyebrow="02 / PORTAFOLIO" title="Proyectos" />
      <SectionTitle eyebrow="02 / PORTAFOLIO" title="Proyectos seleccionados" id="projects-title" />
      <ProjectShowcase projects={projects} />
    </section>
  );
}
