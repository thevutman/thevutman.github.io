import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle/SectionTitle";
import { projects } from "@/data/projects";
import { gsap } from "@/lib/gsap";
import { ease, media } from "@/lib/motion";
import {
  closestTrack,
  entranceRange,
  hideUntilRevealed,
  holdRange,
  trackMetrics,
} from "@/lib/stack";
import { ProjectGallery } from "./ProjectGallery";
import "./Projects.css";

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = section && closestTrack(section);
    if (!section || !track) return;

    const mm = gsap.matchMedia(section);
    mm.add(media.stack, () => {
      // Rises into place while the panel slides over the hero.
      hideUntilRevealed(".section-heading, .project-slide", 90);
      gsap.to(".section-heading, .project-slide", {
        y: 0,
        opacity: 1,
        stagger: 0.06,
        ease: ease.out,
        scrollTrigger: { ...entranceRange(track), scrub: 0.5 },
      });

      // While the panel rests, each screen of scroll brings the next card to
      // the left edge, so every snap point frames one project.
      const slides = gsap.utils.toArray<HTMLElement>(".project-slide");
      const first = slides[0];
      const last = slides.at(-1);
      if (!first || !last || first === last) return;
      gsap.to(".project-rail", {
        x: () => -(last.offsetLeft - first.offsetLeft),
        ease: "none",
        scrollTrigger: { ...holdRange(track), scrub: 0.5 },
      });

      // Keyboard users tab through cards that may be off screen: scroll to
      // the resting point that frames the focused card.
      const frameFocused = (event: FocusEvent) => {
        const slide = (event.target as Element).closest(".project-slide");
        const index = slides.indexOf(slide as HTMLElement);
        if (index < 0) return;
        const { start, height } = trackMetrics(track);
        window.scrollTo({ top: start + index * height, behavior: "instant" });
      };
      section.addEventListener("focusin", frameFocused);
      return () => section.removeEventListener("focusin", frameFocused);
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="portfolio-section content-band"
      id="proyectos"
      tabIndex={-1}
      aria-labelledby="projects-title"
    >
      <SectionTitle
        eyebrow="02 / PORTAFOLIO"
        title="Proyectos seleccionados"
        id="projects-title"
        aside={<ArrowUpRight className="projects-arrow" aria-hidden="true" />}
      />
      <ProjectGallery projects={projects} />
    </section>
  );
}
