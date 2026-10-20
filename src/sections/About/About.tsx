import { useRef } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle/SectionTitle";
import { about } from "@/data/profile";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import "./About.css";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef, ".section-heading, .about-main > *, .about-block");

  return (
    <section
      ref={sectionRef}
      className="about-section content-band"
      id="sobre-mi"
      tabIndex={-1}
      aria-labelledby="about-title"
    >
      <SectionTitle eyebrow="03 / SOBRE MÍ" title="Más allá de la pantalla" id="about-title" />
      <div className="about-layout">
        <div className="about-main">
          <span className="detail-label">{about.label}</span>
          <p className="about-highlight">{about.highlight}</p>
          <div className="about-description">
            {about.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <ol className="about-blocks">
          {about.blocks.map(({ title, lead, content }, index) => (
            <li key={title} className="about-block">
              <span className="about-block-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{title}</h3>
                <p>
                  {lead && <span className="about-block-lead">{lead}</span>} {content}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
