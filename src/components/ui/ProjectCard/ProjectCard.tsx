import type { MouseEvent } from "react";
import { ArrowUpRight, Image } from "lucide-react";
import { projectNumber, type Project } from "@/data/projects";
import "./ProjectCard.css";

type ProjectCardProps = {
  project: Project;
  /** Position in the list; drives the number and the colour tone. */
  index: number;
  onOpen: (event: MouseEvent<HTMLButtonElement>) => void;
};

export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const number = projectNumber(index);
  const titleId = `${project.id}-titulo`;
  const subject = project.isPlaceholder ? `del proyecto ${number}` : `de ${project.name}`;

  return (
    <article className={`project-card project-tone-${index % 4}`} aria-labelledby={titleId}>
      <div className="project-media">
        {project.cover ? (
          <img
            src={project.cover.src}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <ProjectPlaceholder />
        )}
        <span className="project-number" aria-hidden="true">
          {number}
        </span>
        {project.isPlaceholder && <span className="placeholder-badge">CONTENIDO PENDIENTE</span>}
      </div>

      <div className="project-summary">
        <div>
          <p className="project-category">
            {project.disciplines.length
              ? project.disciplines.join(" / ")
              : "DISCIPLINAS POR AÑADIR"}
          </p>
          <h3 id={titleId}>{project.name}</h3>
          <p className="project-description">{project.summary}</p>
        </div>
        <button
          type="button"
          className="ui-control project-toggle"
          aria-haspopup="dialog"
          aria-label={`Ver detalles ${subject}`}
          title="Ver detalles"
          onClick={onOpen}
        >
          <span className="project-toggle-text">Ver detalles</span>
          <ArrowUpRight aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

export function ProjectPlaceholder() {
  return (
    <div className="project-placeholder" aria-hidden="true">
      <div className="placeholder-frame">
        <Image />
        <span>Imagen del proyecto</span>
        <span className="placeholder-caption">POR AÑADIR</span>
      </div>
    </div>
  );
}
