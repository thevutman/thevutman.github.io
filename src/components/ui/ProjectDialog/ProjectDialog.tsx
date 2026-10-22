import { useEffect, useRef } from "react";
import { ExternalLink, X } from "lucide-react";
import { IconLink } from "@/components/ui/IconLink/IconLink";
import { ProjectCover } from "@/components/ui/ProjectCover/ProjectCover";
import { ProjectDetail } from "@/components/ui/ProjectDetail/ProjectDetail";
import { projectMeta, projectNumber, type Project } from "@/data/projects";
import "./ProjectDialog.css";

type ProjectDialogProps = {
  project: Project;
  index: number;
  onClose: () => void;
};

/**
 * Full-screen case study in a native modal dialog: it traps focus, closes
 * with Escape and returns focus to the cover that opened it. The cover opens
 * up into a full-bleed hero with the project name over it. Mount it only
 * while a project is open.
 */
export function ProjectDialog({ project, index, onClose }: ProjectDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = `${project.id}-dialogo-titulo`;
  const [type, date, role] = projectMeta(project);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog ref={dialogRef} className="project-dialog" aria-labelledby={titleId} onClose={onClose}>
      <button
        type="button"
        className="ui-control case-close"
        aria-label="Cerrar caso de estudio"
        title="Cerrar"
        onClick={() => dialogRef.current?.close()}
      >
        <X aria-hidden="true" />
        <span aria-hidden="true">CERRAR</span>
      </button>

      <header className={`case-hero showcase-tone-${index % 4}`}>
        <div className="case-cover">
          <ProjectCover project={project} lazy={false} />
        </div>
        <div className="case-hero-text">
          <span className="section-number">PROYECTO {projectNumber(index)}</span>
          <h2 id={titleId}>{project.name}</h2>
        </div>
      </header>

      <div className="case-body">
        <dl className="case-meta">
          <div>
            <dt>Tipo</dt>
            <dd>{type}</dd>
          </div>
          <div>
            <dt>Rol</dt>
            <dd>{role}</dd>
          </div>
          <div>
            <dt>Fecha</dt>
            <dd>{date}</dd>
          </div>
          <div>
            <dt>Tecnologías</dt>
            <dd>
              {project.technologies.length
                ? project.technologies.join(" · ")
                : "Tecnologías por añadir"}
            </dd>
          </div>
          <div>
            <dt>Explorar</dt>
            <dd className="case-links">
              {project.liveUrl ? (
                <IconLink href={project.liveUrl} icon={ExternalLink}>
                  Ver sitio
                </IconLink>
              ) : (
                <span>Sitio por añadir</span>
              )}
              {project.repositoryUrl ? (
                <IconLink href={project.repositoryUrl} icon={ExternalLink}>
                  GitHub
                </IconLink>
              ) : (
                <span>GitHub por añadir</span>
              )}
            </dd>
          </div>
        </dl>

        <p className="case-summary">{project.summary}</p>
        <ProjectDetail project={project} />
      </div>
    </dialog>
  );
}
