import { useLayoutEffect, useRef, type RefObject } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle/SectionTitle";
import { TitleCard } from "@/components/ui/TitleCard/TitleCard";
import { about } from "@/data/profile";
import { gsap } from "@/lib/gsap";
import { media } from "@/lib/motion";
import { closestTrack, hideUntilRevealed } from "@/lib/stack";
import { titleCardScenes } from "@/lib/titleCard";
import "./About.css";

/**
 * With stacked panels the section opens with its title card, which blurs away
 * to reveal the presentation. On phones, where both columns do not fit, one
 * more step replaces the text with the blocks.
 */
function useAboutScenes(sectionRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = section && closestTrack(section);
    if (!section || !track) return;

    const mm = gsap.matchMedia(section);
    mm.add({ stack: media.stack, mobile: media.mobile }, (context) => {
      const { stack, mobile } = context.conditions ?? {};
      if (!stack) return;

      const scenes = titleCardScenes(
        track,
        section,
        mobile
          ? ".section-heading, .about-main > *"
          : ".section-heading, .about-main > *, .about-block",
      );
      if (!mobile) return;

      hideUntilRevealed(".about-block", 50);
      scenes
        .to(".about-main", { opacity: 0, y: -40, duration: 0.4 }, 1.15)
        .to(".about-block", { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, 1.35)
        .to({}, { duration: 0.05 }, 1.95);
    });
    return () => mm.revert();
  }, [sectionRef]);
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  useAboutScenes(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="about-section content-band"
      id="sobre-mi"
      tabIndex={-1}
      aria-labelledby="about-title"
    >
      <TitleCard eyebrow="03 / SOBRE MÍ" title="Sobre mí" />

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
