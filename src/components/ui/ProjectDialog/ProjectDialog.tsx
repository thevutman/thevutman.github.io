import { useEffect, useRef, type MouseEvent } from "react";
import { X } from "lucide-react";
import { ProjectPlaceholder } from "@/components/ui/ProjectCard/ProjectCard";
import { ProjectDetail } from "@/components/ui/ProjectDetail/ProjectDetail";
import { projectNumber, type Project } from "@/data/projects";
import "./ProjectDialog.css";

type ProjectDialogProps = {
  project: Project;
  index: number;
  onClose: () => void;
};

/**
 * Case study in a native modal dialog: it traps focus, closes with Escape and
 * returns focus to the card's button. Mount it only while a project is open.
 */
export function ProjectDialog({ project, index, onClose }: ProjectDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = `${project.id}-dialogo-titulo`;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  // A click on the dialog itself, not its sheet, is a click on the backdrop.
  const closeOnBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) dialogRef.current?.close();
  };

  return (
    // Escape and the close button are the keyboard routes; this only adds the backdrop click.
    <dialog
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={closeOnBackdrop}
    >
      <div className={`project-sheet project-tone-${index % 4}`}>
        <header className="project-sheet-header">
          <div>
            <span className="section-number">PROYECTO {projectNumber(index)}</span>
            <h2 id={titleId}>{project.name}</h2>
            <p>{project.summary}</p>
          </div>
          <button
            type="button"
            className="ui-control project-sheet-close"
            aria-label="Cerrar detalle"
            title="Cerrar"
            onClick={() => dialogRef.current?.close()}
          >
            <X aria-hidden="true" />
          </button>
        </header>

        <div className="project-media project-sheet-media">
          {project.cover ? (
            <img
              src={project.cover.src}
              alt={project.cover.alt}
              width={project.cover.width}
              height={project.cover.height}
              decoding="async"
            />
          ) : (
            <ProjectPlaceholder />
          )}
        </div>

        <ProjectDetail project={project} />
      </div>
    </dialog>
  );
}
