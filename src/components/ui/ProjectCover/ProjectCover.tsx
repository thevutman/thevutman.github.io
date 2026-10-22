import { Image } from "lucide-react";
import type { Project } from "@/data/projects";
import "./ProjectCover.css";

type ProjectCoverProps = {
  project: Project;
  /** Below-the-fold covers can wait; the first one should not. */
  lazy?: boolean;
};

/** Project cover image, or a framed placeholder while there is none. */
export function ProjectCover({ project, lazy = true }: ProjectCoverProps) {
  if (project.cover) {
    return (
      <img
        className="project-cover"
        src={project.cover.src}
        alt={project.cover.alt}
        width={project.cover.width}
        height={project.cover.height}
        loading={lazy ? "lazy" : "eager"}
        decoding="async"
      />
    );
  }

  return (
    <div className="project-cover project-cover-placeholder" aria-hidden="true">
      <div className="placeholder-frame">
        <Image />
        <span>Imagen del proyecto</span>
        <span className="placeholder-caption">POR AÑADIR</span>
      </div>
    </div>
  );
}
