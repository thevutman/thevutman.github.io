import { useState } from "react";
import { ProjectCard } from "@/components/ui/ProjectCard/ProjectCard";
import { ProjectDialog } from "@/components/ui/ProjectDialog/ProjectDialog";
import type { Project } from "@/data/projects";

/**
 * Horizontal rail of project cards. With stacked panels the rail is moved by
 * the page scroll (see Projects); otherwise it scrolls sideways natively.
 * Opening a card shows its case study in a modal dialog.
 */
export function ProjectGallery({ projects }: { projects: Project[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex === null ? undefined : projects[openIndex];

  return (
    <>
      <div className="project-rail-viewport">
        <ul className="project-rail">
          {projects.map((project, index) => (
            <li key={project.id} className="project-slide">
              <ProjectCard project={project} index={index} onOpen={() => setOpenIndex(index)} />
            </li>
          ))}
        </ul>
      </div>
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
