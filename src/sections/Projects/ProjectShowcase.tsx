import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ProjectCover } from "@/components/ui/ProjectCover/ProjectCover";
import { ProjectDialog } from "@/components/ui/ProjectDialog/ProjectDialog";
import { projectMeta, projectNumber, type Project } from "@/data/projects";

/**
 * One project per screen: an oversized name, a meta line and a large cover.
 * With stacked panels the items share the same place and the page scroll
 * swaps them (see Projects.tsx); otherwise they simply follow each other.
 * Opening a cover shows the case study in a full-screen dialog.
 */
export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex === null ? undefined : projects[openIndex];

  return (
    <>
      <ol className="showcase-index" aria-hidden="true">
        {projects.map((project) => (
          <li key={project.id} className="showcase-tick" />
        ))}
      </ol>

      <ul className="showcase-list">
        {projects.map((project, index) => {
          const number = projectNumber(index);
          const titleId = `${project.id}-titulo`;
          const subject = project.isPlaceholder ? `del proyecto ${number}` : `de ${project.name}`;

          return (
            <li key={project.id} className={`showcase-item showcase-tone-${index % 4}`}>
              <div className="showcase-backdrop" aria-hidden="true" />
              <article className="showcase-article" aria-labelledby={titleId}>
                <h3 className="showcase-title" id={titleId}>
                  <span className="showcase-mask-inner">{project.name}</span>
                </h3>
                <p className="showcase-meta">
                  <span className="showcase-mask-inner">
                    <span className="showcase-number">{number}</span>
                    {projectMeta(project).map((item) => (
                      <span key={item} className="showcase-meta-item">
                        {item}
                      </span>
                    ))}
                  </span>
                </p>
                <button
                  type="button"
                  className="showcase-media"
                  aria-haspopup="dialog"
                  aria-label={`Ver caso de estudio ${subject}`}
                  onClick={() => setOpenIndex(index)}
                >
                  <span className="showcase-media-inner">
                    <ProjectCover project={project} lazy={index > 0} />
                  </span>
                  {project.isPlaceholder && (
                    <span className="showcase-badge">CONTENIDO PENDIENTE</span>
                  )}
                  <span className="showcase-cta" aria-hidden="true">
                    Ver proyecto <ArrowUpRight />
                  </span>
                </button>
              </article>
            </li>
          );
        })}
      </ul>

      {open && openIndex !== null && (
        <ProjectDialog
          key={open.id}
          project={open}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}
