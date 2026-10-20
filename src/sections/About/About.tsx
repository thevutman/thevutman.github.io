import { useLayoutEffect, useRef, type RefObject } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle/SectionTitle";
import { about } from "@/data/profile";
import { gsap } from "@/lib/gsap";
import { ease, media } from "@/lib/motion";
import { closestTrack, entranceRange, hideUntilRevealed, holdRange } from "@/lib/stack";
import "./About.css";

/**
 * With stacked panels the section plays in scenes, like a title card:
 *  1. the highlight fills the screen, its words lighting up as the panel enters;
 *  2. it blurs away and the presentation takes its place;
 *  3. on phones, where both columns do not fit, the blocks replace the text.
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

      gsap.set(".about-statement-word", { opacity: 0.12, y: 24 });
      gsap.to(".about-statement-word", {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        ease: ease.out,
        scrollTrigger: { ...entranceRange(track), scrub: 0.5 },
      });

      const presentation = mobile
        ? ".section-heading, .about-main > *"
        : ".section-heading, .about-main > *, .about-block";
      hideUntilRevealed(mobile ? `${presentation}, .about-block` : presentation, 50);

      const scenes = gsap.timeline({
        defaults: { ease: ease.scrub },
        scrollTrigger: { ...holdRange(track), scrub: 0.6 },
      });

      scenes
        .to(".about-statement", { opacity: 0, scale: 0.88, filter: "blur(16px)", duration: 0.5 }, 0)
        .to(presentation, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 }, 0.3);

      if (mobile) {
        // Each half rests on its own snap point (time 1 of 2.2).
        scenes
          .to(".about-main", { opacity: 0, y: -40, duration: 0.4 }, 1.2)
          .to(".about-block", { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, 1.4)
          .to({}, { duration: 0.2 }, 2);
      } else {
        scenes.to({}, { duration: 0.1 }, 0.9);
      }
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
      {/* Title card for the scenes; the same sentence is the highlight below. */}
      <p className="about-statement" aria-hidden="true">
        <span className="about-statement-text">
          {about.highlight.split(" ").map((word, index) => (
            // Words repeat, so the position is part of the key.
            <span key={`${index}-${word}`} className="about-statement-word">
              {word}{" "}
            </span>
          ))}
        </span>
      </p>

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
