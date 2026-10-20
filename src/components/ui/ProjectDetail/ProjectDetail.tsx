import { ExternalLink } from "lucide-react";
import { IconLink } from "@/components/ui/IconLink/IconLink";
import { caseStudySections, type Project } from "@/data/projects";
import "./ProjectDetail.css";

type ProjectDetailProps = {
  project: Project;
  id: string;
  labelledBy: string;
};

const PENDING = "Información pendiente";

/**
 * Expanded case study. Sections without content are omitted for real projects;
 * placeholders list every section as pending so the structure is visible.
 */
export function ProjectDetail({ project, id, labelledBy }: ProjectDetailProps) {
  const sections = caseStudySections
    .map(({ key, title }) => ({ key, title, content: project.caseStudy?.[key] }))
    .filter(({ content }) => project.isPlaceholder || content);

  return (
    <div className="project-detail" id={id} role="region" aria-labelledby={labelledBy}>
      {sections.length > 0 && (
        <div className="detail-grid">
          {sections.map(({ key, title, content }) => (
            <div key={key}>
              <h4>{title}</h4>
              <p>{content ?? PENDING}</p>
            </div>
          ))}
        </div>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <div className="detail-gallery">
          {project.gallery.map((image) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      )}

      <div className="detail-footer">
        <div>
          <span className="detail-label">TECNOLOGÍAS</span>
          <p>
            {project.technologies.length
              ? project.technologies.join(" · ")
              : "Tecnologías por añadir"}
          </p>
        </div>
        <div className="project-destinations">
          {project.liveUrl ? (
            <IconLink href={project.liveUrl} icon={ExternalLink}>
              Ver proyecto
            </IconLink>
          ) : (
            <span>Proyecto · Enlace por añadir</span>
          )}
          {project.repositoryUrl ? (
            <IconLink href={project.repositoryUrl} icon={ExternalLink}>
              GitHub
            </IconLink>
          ) : (
            <span>GitHub · Enlace por añadir</span>
          )}
        </div>
      </div>
    </div>
  );
}
