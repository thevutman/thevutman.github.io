import { caseStudySections, type Project } from "@/data/projects";
import "./ProjectDetail.css";

type ProjectDetailProps = {
  project: Project;
};

const PENDING = "Información pendiente";

/**
 * Case study sections and gallery shown in the project dialog. Sections
 * without content are omitted for real projects; placeholders list every
 * section as pending so the structure is visible.
 */
export function ProjectDetail({ project }: ProjectDetailProps) {
  const sections = caseStudySections
    .map(({ key, title }) => ({ key, title, content: project.caseStudy?.[key] }))
    .filter(({ content }) => project.isPlaceholder || content);

  return (
    <div className="project-detail">
      {sections.length > 0 && (
        <div className="detail-grid">
          {sections.map(({ key, title, content }) => (
            <div key={key}>
              <h3>{title}</h3>
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
    </div>
  );
}
