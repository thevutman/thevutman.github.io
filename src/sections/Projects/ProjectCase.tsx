import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { SplitText } from "@/components/SplitText/SplitText";
import { caseStudySections, projectNumber, projects } from "@/data/projects";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { lockScroll } from "@/lib/smoothScroll";

export type CaseOrigin = { index: number; x: number; y: number };

/**
 * Full-screen case study that grows out of the click point like ink and
 * shrinks back into it on close (button or Escape).
 */
export function ProjectCase({ origin, onClose }: { origin: CaseOrigin; onClose: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);
  const project = projects[origin.index];
  const at = `${origin.x}px ${origin.y}px`;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    lockScroll(true);
    closeRef.current?.focus({ preventScroll: true });
    if (prefersReducedMotion()) return () => lockScroll(false);
    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .fromTo(
          root,
          { clipPath: `circle(0px at ${at})` },
          { clipPath: `circle(150% at ${at})`, duration: 1.1, ease: "expo.inOut" },
        )
        .from(
          ".case-title .ch",
          { yPercent: 120, scaleY: 2.8, duration: 1.2, ease: "expo.out", stagger: 0.03 },
          0.5,
        )
        .from(".case-reveal", { y: 30, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.8)
        .from(".case-close", { scale: 0, duration: 0.6, ease: "back.out(2)" }, 0.8);
    }, root);
    return () => {
      ctx.revert();
      lockScroll(false);
    };
  }, [at]);

  const close = useCallback(() => {
    const root = rootRef.current;
    if (!root || closing.current) return;
    closing.current = true;
    if (prefersReducedMotion()) {
      onClose();
      return;
    }
    gsap.to(".case-close", { scale: 0, duration: 0.3 });
    gsap.to(root, {
      clipPath: `circle(0px at ${at})`,
      duration: 0.9,
      ease: "expo.inOut",
      onComplete: onClose,
    });
  }, [at, onClose]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  if (!project) return null;
  const links = [
    project.liveUrl && { label: "Sitio", href: project.liveUrl },
    project.repositoryUrl && { label: "GitHub", href: project.repositoryUrl },
  ].filter((link): link is { label: string; href: string } => Boolean(link));
  const sections = caseStudySections.filter(({ key }) => project.caseStudy?.[key]);

  return createPortal(
    <div
      ref={rootRef}
      className="case"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-title"
      style={{ background: `var(--${project.tone})` }}
      data-lenis-prevent
    >
      <button
        ref={closeRef}
        type="button"
        className="case-close"
        data-cursor="Cerrar"
        onClick={close}
      >
        Cerrar ✕
      </button>
      <div className="case-inner">
        <div>
          <span className="mono case-reveal">Proyecto {projectNumber(origin.index)}</span>
          <h2 className="case-title" id="case-title">
            <SplitText text={project.name} />
          </h2>
          <p className="case-summary case-reveal">
            {project.summary ??
              "Descripción por completar: qué es el proyecto, para quién y qué problema resuelve."}
          </p>
        </div>

        {project.cover ? (
          <img
            className="case-cover case-reveal"
            src={project.cover.src}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
          />
        ) : null}

        {sections.length > 0 ? (
          <div className="case-sections">
            {sections.map(({ key, title }) => (
              <section key={key} className="case-reveal">
                <span className="mono">{title}</span>
                <p>{project.caseStudy?.[key]}</p>
              </section>
            ))}
          </div>
        ) : null}

        <div className="case-meta">
          <div className="case-reveal">
            <span className="mono">Tipo</span>
            <b>{project.type}</b>
          </div>
          <div className="case-reveal">
            <span className="mono">Rol</span>
            <b>{project.role ?? "Full Stack"}</b>
          </div>
          <div className="case-reveal">
            <span className="mono">Año</span>
            <b>{project.year}</b>
          </div>
          <div className="case-reveal">
            <span className="mono">{project.technologies?.length ? "Stack" : "Explorar"}</span>
            {project.technologies?.length ? <b>{project.technologies.join(" · ")}</b> : null}
            {links.length > 0 ? (
              <b>
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="Abrir"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </b>
            ) : project.technologies?.length ? null : (
              <b>Enlaces por completar</b>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
