import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight, BriefcaseBusiness, FolderGit2, Mail, type LucideIcon } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle/SectionTitle";
import { contact, contactChannels, type ContactChannel } from "@/data/profile";
import { gsap } from "@/lib/gsap";
import { ease, media } from "@/lib/motion";
import { closestTrack, entranceRange, hideUntilRevealed } from "@/lib/stack";
import "./Contact.css";

// Lucide no longer ships brand logos, so each channel uses a neutral glyph.
const icons: Record<ContactChannel["id"], LucideIcon> = {
  linkedin: BriefcaseBusiness,
  github: FolderGit2,
  email: Mail,
};

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  // Rises into place while the panel slides over the previous one.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = section && closestTrack(section);
    if (!section || !track) return;

    const mm = gsap.matchMedia(section);
    mm.add(media.stack, () => {
      hideUntilRevealed(".section-heading, .contact-intro, .contact-row", 70);
      gsap.to(".section-heading, .contact-intro, .contact-row", {
        y: 0,
        opacity: 1,
        stagger: 0.07,
        ease: ease.out,
        scrollTrigger: { ...entranceRange(track), scrub: 0.5 },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="contact-section content-band"
      id="contacto"
      tabIndex={-1}
      aria-labelledby="contact-title"
    >
      <SectionTitle
        eyebrow="05 / CONTACTO"
        title={contact.title}
        id="contact-title"
        size="display"
      />
      <p className="contact-intro">{contact.intro}</p>

      <ul className="contact-list">
        {contactChannels.map(({ id, label, description, href, display }) => {
          const Icon = icons[id];
          const external = href.startsWith("http");
          return (
            <li key={id} className="contact-row">
              <a
                href={href}
                className="contact-link"
                aria-label={`${label}: ${display}${external ? " (se abre en una pestaña nueva)" : ""}`}
                aria-describedby={`contacto-${id}-descripcion`}
                {...(external && { target: "_blank", rel: "noopener noreferrer" })}
              >
                <Icon className="contact-icon" aria-hidden="true" />
                <span className="contact-text">
                  <span className="contact-label">{label}</span>
                  <span className="contact-description" id={`contacto-${id}-descripcion`}>
                    {description}
                  </span>
                </span>
                <span className="contact-value">{display}</span>
                <ArrowUpRight className="contact-arrow" aria-hidden="true" />
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
