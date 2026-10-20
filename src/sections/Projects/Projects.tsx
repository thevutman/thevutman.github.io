import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle/SectionTitle";
import { projects } from "@/data/projects";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ProjectGallery } from "./ProjectGallery";
import "./Projects.css";

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef, ".section-heading, .project-card");

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
