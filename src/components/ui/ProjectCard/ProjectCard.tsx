import type { MouseEvent } from "react";
import { ArrowUpRight, Image, X } from "lucide-react";
import { ProjectDetail } from "@/components/ui/ProjectDetail/ProjectDetail";
import type { Project } from "@/data/projects";
import "./ProjectCard.css";

type ProjectCardProps = {
  project: Project;
  /** Position in the original list; drives the number and the colour tone. */
  index: number;
  expanded: boolean;
  /** Another card is expanded, so this one steps back. */
  muted: boolean;
  onToggle: (event: MouseEvent<HTMLButtonElement>) => void;
};

export function ProjectCard({ project, index, expanded, muted, onToggle }: ProjectCardProps) {
  const number = String(index + 1).padStart(2, "0");
  const titleId = `${project.id}-titulo`;
  const detailId = `${project.id}-detalle`;
  const subject = project.isPlaceholder ? `del proyecto ${number}` : `de ${project.name}`;

  const classes = [
    "project-card",
    `project-tone-${index % 4}`,
    expanded && "project-selected",
    muted && "project-muted",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={classes} data-project-id={project.id} aria-labelledby={titleId}>
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
          <div className="project-placeholder" aria-hidden="true">
            <div className="placeholder-frame">
              <Image />
              <span>Imagen del proyecto</span>
              <span className="placeholder-caption">POR AÑADIR</span>
            </div>
          </div>
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
          aria-expanded={expanded}
          aria-controls={detailId}
          aria-label={expanded ? `Cerrar detalle ${subject}` : `Ver detalles ${subject}`}
          title={expanded ? "Cerrar detalle" : "Ver detalles"}
          onClick={onToggle}
        >
          <span className="project-toggle-text">{expanded ? "Cerrar" : "Ver detalles"}</span>
          {expanded ? <X aria-hidden="true" /> : <ArrowUpRight aria-hidden="true" />}
        </button>
      </div>

      {expanded && <ProjectDetail project={project} id={detailId} labelledBy={titleId} />}
    </article>
  );
}
