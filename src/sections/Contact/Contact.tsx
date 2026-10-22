import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight, BriefcaseBusiness, FolderGit2, Mail, type LucideIcon } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle/SectionTitle";
import { TitleCard } from "@/components/ui/TitleCard/TitleCard";
import { contact, contactChannels, type ContactChannel } from "@/data/profile";
import { gsap } from "@/lib/gsap";
import { media } from "@/lib/motion";
import { closestTrack } from "@/lib/stack";
import { titleCardScenes } from "@/lib/titleCard";
import "./Contact.css";

// Lucide no longer ships brand logos, so each channel uses a neutral glyph.
const icons: Record<ContactChannel["id"], LucideIcon> = {
  linkedin: BriefcaseBusiness,
  github: FolderGit2,
  email: Mail,
};

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  // Opens with its title card, which blurs away to reveal the channels.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = section && closestTrack(section);
    if (!section || !track) return;

    const mm = gsap.matchMedia(section);
    mm.add(media.stack, () => {
      titleCardScenes(track, section, ".section-heading, .contact-intro, .contact-list");
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
      <TitleCard eyebrow="04 / CONTACTO" title="Contacto" />
      <SectionTitle
        eyebrow="04 / CONTACTO"
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
