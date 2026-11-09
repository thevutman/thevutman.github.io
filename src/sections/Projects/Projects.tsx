import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { SplitText } from "@/components/SplitText/SplitText";
import { projectColors, projectNumber, projects } from "@/data/projects";
import { gsap, hasFinePointer, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";
import { ProjectCase, type CaseOrigin } from "./ProjectCase";
import "./Projects.css";

const darkTheme = {
  "--bg": "#1b1a18",
  "--fg": "#efebe4",
  "--muted": "#8f8a80",
  "--line": "rgba(239,235,228,.16)",
};
const lightTheme = {
  "--bg": "#efebe4",
  "--fg": "#1b1a18",
  "--muted": "#7b766d",
  "--line": "rgba(27,26,24,.14)",
};

/**
 * Interactive list. The page turns ink-dark while it is on screen; a card in
 * the project's colour follows the cursor and rolls to the hovered project
 * like a slot machine; clicking opens the case study out of the click point.
 */
export function Projects() {
  const rootRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [open, setOpen] = useState<CaseOrigin | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const still = prefersReducedMotion();
    let resetSkew: (() => void) | null = null;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        start: "top 55%",
        end: "bottom 45%",
        onToggle: (self) =>
          gsap.to(document.documentElement, {
            ...(self.isActive ? darkTheme : lightTheme),
            duration: still ? 0 : 0.8,
            ease: "power2.inOut",
          }),
      });
      if (still) return;

      gsap.from(".work-title .ch", {
        yPercent: 120,
        scaleY: 3,
        duration: 1.3,
        ease: "expo.out",
        stagger: 0.04,
        scrollTrigger: {
          trigger: ".work-title",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
      gsap.utils.toArray<HTMLElement>(".row").forEach((row) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          })
          .from(row.querySelector(".row-line"), { scaleX: 0, duration: 1.2, ease: "expo.inOut" })
          .from(
            row.querySelector(".row-name"),
            { yPercent: 110, duration: 1, ease: "expo.out" },
            0.25,
          )
          .from(
            row.querySelectorAll(".mono, .row-arrow"),
            { opacity: 0, x: -20, duration: 0.8, stagger: 0.1 },
            0.4,
          );
      });

      // Names lean with scroll velocity.
      const skew = gsap.quickTo(".row-name", "skewY", { duration: 0.5 });
      ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => skew(gsap.utils.clamp(-6, 6, self.getVelocity() / -250)),
      });
      resetSkew = () => skew(0);
      ScrollTrigger.addEventListener("scrollEnd", resetSkew);
    }, root);
    return () => {
      if (resetSkew) ScrollTrigger.removeEventListener("scrollEnd", resetSkew);
      ctx.revert();
      gsap.set(document.documentElement, lightTheme);
    };
  }, []);

  // Preview card that follows the cursor.
  useEffect(() => {
    const preview = previewRef.current;
    const list = rootRef.current?.querySelector<HTMLElement>(".rows");
    if (!preview || !list || !hasFinePointer()) return;
    const strip = preview.querySelector(".preview-strip");
    const px = gsap.quickTo(preview, "x", { duration: 0.7, ease: "power3" });
    const py = gsap.quickTo(preview, "y", { duration: 0.7, ease: "power3" });
    const pr = gsap.quickTo(preview, "rotation", { duration: 0.6, ease: "power3" });
    let lastX = 0;
    const onMove = (event: PointerEvent) => {
      px(event.clientX);
      py(event.clientY);
      pr(gsap.utils.clamp(-18, 18, (event.clientX - lastX) * 0.6));
      lastX = event.clientX;
    };
    const onEnter = (event: PointerEvent) => {
      gsap.set(preview, { x: event.clientX, y: event.clientY });
      gsap.to(preview, { scale: 1, duration: 0.6, ease: "expo.out" });
    };
    const onLeave = () =>
      gsap.to(preview, { scale: 0, rotation: 0, duration: 0.5, ease: "expo.in" });
    const onOver = (event: PointerEvent) => {
      const row = (event.target as Element).closest<HTMLElement>(".row");
      if (row)
        gsap.to(strip, {
          yPercent: (-100 / projects.length) * Number(row.dataset.index),
          duration: 0.8,
          ease: "expo.out",
        });
    };
    list.addEventListener("pointermove", onMove);
    list.addEventListener("pointerenter", onEnter);
    list.addEventListener("pointerleave", onLeave);
    list.addEventListener("pointerover", onOver);
    return () => {
      list.removeEventListener("pointermove", onMove);
      list.removeEventListener("pointerenter", onEnter);
      list.removeEventListener("pointerleave", onLeave);
      list.removeEventListener("pointerover", onOver);
    };
  }, []);

  const openCase = (index: number, x: number, y: number) => {
    gsap.to(previewRef.current, { scale: 0, duration: 0.3 });
    setOpen({ index, x, y });
  };

  return (
    <section ref={rootRef} className="work" id="proyectos" aria-labelledby="work-title">
      <div className="work-head">
        <h2 className="work-title" id="work-title">
          <span className="line-mask">
            <SplitText text="Proyectos" />
          </span>
        </h2>
        <span className="mono muted">({projectNumber(projects.length - 1)}) Selección</span>
      </div>
      <ul className="rows">
        {projects.map((project, i) => (
          <li key={project.id}>
            <button
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              type="button"
              className="row"
              data-index={i}
              data-cursor="Ver"
              onClick={(event) => {
                // Keyboard clicks have no pointer position: open from the row's centre.
                const r = event.currentTarget.getBoundingClientRect();
                const fromPointer = event.detail > 0;
                openCase(
                  i,
                  fromPointer ? event.clientX : r.left + r.width / 2,
                  fromPointer ? event.clientY : r.top + r.height / 2,
                );
              }}
            >
              <span className="row-line" />
              <span className="row-inner">
                <span className="mono muted">{projectNumber(i)}</span>
                <span className="line-mask">
                  <span className="row-name">{project.name}</span>
                </span>
                <span className="mono muted row-meta">
                  {project.type} · {project.year}
                </span>
                <span className="row-arrow" aria-hidden="true">
                  →
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div ref={previewRef} className="preview" aria-hidden="true">
        <div className="preview-strip">
          {projects.map((project, i) => (
            <div
              key={project.id}
              style={{ "--p-bg": projectColors(project).bg, "--p-fg": projectColors(project).fg } as CSSProperties}
            >
              <span className="mono">
                {projectNumber(i)} — {project.type}
              </span>
              {project.cover ? <img src={project.cover.src} alt="" /> : null}
              <b>{project.name}</b>
            </div>
          ))}
        </div>
      </div>

      {open ? (
        <ProjectCase
          origin={open}
          onClose={(shown) => {
            // Focus goes back to the row of the project on screen, which may be a later one.
            const row = rowRefs.current[shown];
            setOpen(null);
            row?.focus({ preventScroll: true });
          }}
        />
      ) : null}
    </section>
  );
}
