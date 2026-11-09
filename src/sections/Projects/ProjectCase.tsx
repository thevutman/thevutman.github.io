import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { SplitText } from "@/components/SplitText/SplitText";
import { caseStudySections, projectColors, projectNumber, projects, type Project } from "@/data/projects";
import type { Screen } from "@/data/screens";
import { Draggable, gsap, hasFinePointer, lettersIn, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";
import { lockScroll } from "@/lib/smoothScroll";

export type CaseOrigin = { index: number; x: number; y: number };

const host = (url?: string) => (url ? new URL(url).host : "");

/** The next project that already has a case study, wrapping around. */
function nextIndex(from: number) {
  for (let step = 1; step <= projects.length; step++) {
    const i = (from + step) % projects.length;
    if (projects[i]?.summary) return i;
  }
  return from;
}

const colorVars = (project: Project) =>
  ({ "--p-bg": projectColors(project).bg, "--p-fg": projectColors(project).fg }) as CSSProperties;

/**
 * Full-screen case study that grows out of the click point like ink and shrinks back into it
 * on close (button or Escape). Inside, everything moves with the case's own scroll: the cover
 * opens up, the screens can be dragged, the phones float in parallax and any screen opens
 * large. At the end, "Siguiente proyecto" swaps to the next one without closing.
 */
export function ProjectCase({ origin, onClose }: { origin: CaseOrigin; onClose: (index: number) => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);
  const switching = useRef(false);
  const first = useRef(true);
  const [index, setIndex] = useState(origin.index);
  const [zoom, setZoom] = useState<number | null>(null);
  const project = projects[index];
  const at = `${origin.x}px ${origin.y}px`;

  // Opening: the ink circle. Runs once.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    lockScroll(true);
    closeRef.current?.focus({ preventScroll: true });
    if (prefersReducedMotion()) return () => lockScroll(false);
    const tween = gsap.fromTo(
      root,
      { clipPath: `circle(0px at ${at})` },
      { clipPath: `circle(150% at ${at})`, duration: 1.1, ease: "expo.inOut", clearProps: "clipPath" },
    );
    gsap.from(".case-close", { scale: 0, duration: 0.6, ease: "back.out(2)", delay: 0.8 });
    return () => {
      tween.kill();
      lockScroll(false);
    };
  }, [at]);

  // Content: intro and every scroll animation. Runs again for each project shown.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const delay = first.current ? 0.5 : 0.05;
    first.current = false;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay })
        .from(".case-title .ch", { ...lettersIn, duration: 1.2, stagger: 0.03 })
        .from(".case-reveal", { y: 30, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.3);

      const scroller = root;
      // The cover starts small with round corners and opens up to full width as you scroll.
      gsap.fromTo(
        ".case-cover",
        { scale: 0.86, borderRadius: 48 },
        {
          scale: 1,
          borderRadius: 22,
          ease: "none",
          scrollTrigger: { trigger: ".case-cover", scroller, start: "top bottom", end: "center center", scrub: true },
        },
      );
      gsap.fromTo(
        ".case-cover img",
        { yPercent: -3, scale: 1.06 },
        { yPercent: 3, scale: 1.06, ease: "none", scrollTrigger: { trigger: ".case-cover", scroller, scrub: true } },
      );
      // Text blocks rise as they enter.
      gsap.utils.toArray<HTMLElement>(".case-scroll").forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: el, scroller, start: "top 88%" },
        });
      });
      gsap.from(".case-chip", {
        y: 24,
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: "back.out(2)",
        stagger: 0.04,
        scrollTrigger: { trigger: ".case-chips", scroller, start: "top 90%" },
      });
      // Gallery slides in from the right.
      gsap.from(".gallery-item", {
        x: 160,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".gallery", scroller, start: "top 85%" },
      });
      // Phones float at different speeds.
      gsap.utils.toArray<HTMLElement>(".phone").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: i % 2 ? 110 : 40, rotation: i % 2 ? 4 : -4 },
          {
            y: i % 2 ? -40 : -10,
            rotation: 0,
            ease: "none",
            scrollTrigger: { trigger: ".phones", scroller, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
      gsap.from(".case-next .ch", {
        ...lettersIn,
        duration: 1,
        stagger: 0.02,
        scrollTrigger: { trigger: ".case-next", scroller, start: "top 92%" },
      });
    }, root);
    // Images change the height of the page, so the triggers are measured again once they load.
    const refresh = () => ScrollTrigger.refresh();
    const imgs = [...root.querySelectorAll("img")];
    imgs.forEach((img) => img.addEventListener("load", refresh, { once: true }));
    return () => {
      imgs.forEach((img) => img.removeEventListener("load", refresh));
      ctx.revert();
    };
  }, [index]);

  const close = useCallback(() => {
    const root = rootRef.current;
    if (!root || closing.current) return;
    closing.current = true;
    if (prefersReducedMotion()) {
      onClose(index);
      return;
    }
    gsap.to(".case-close", { scale: 0, duration: 0.3 });
    gsap.fromTo(
      root,
      { clipPath: `circle(150% at ${at})` },
      { clipPath: `circle(0px at ${at})`, duration: 0.9, ease: "expo.inOut", onComplete: () => onClose(index) },
    );
  }, [at, index, onClose]);

  const goNext = useCallback(() => {
    const root = rootRef.current;
    if (!root || switching.current) return;
    const next = nextIndex(index);
    if (prefersReducedMotion()) {
      setIndex(next);
      root.scrollTop = 0;
      return;
    }
    const target = projects[next];
    if (!target) return;
    switching.current = true;
    const to = projectColors(target);
    gsap
      .timeline({
        onComplete: () => {
          root.scrollTop = 0;
          setIndex(next);
          switching.current = false;
        },
      })
      .to(".case-inner", { y: -80, opacity: 0, duration: 0.5, ease: "power3.in" })
      .to(root, { "--p-bg": to.bg, "--p-fg": to.fg, duration: 0.6, ease: "power2.inOut" }, 0.1);
  }, [index]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (zoom !== null) setZoom(null);
      else close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, zoom]);

  if (!project) return null;
  const links = [
    project.liveUrl && { label: "Sitio", href: project.liveUrl },
    project.repositoryUrl && { label: "GitHub", href: project.repositoryUrl },
  ].filter((link): link is { label: string; href: string } => Boolean(link));
  const sections = caseStudySections.filter(({ key }) => project.caseStudy?.[key]);
  const all = project.screens ?? [];
  const desktop = all.filter((s) => s.device === "desktop");
  const mobile = all.filter((s) => s.device === "mobile");
  const next = projects[nextIndex(index)];

  return createPortal(
    <div
      ref={rootRef}
      className="case"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-title"
      style={colorVars(project)}
      data-lenis-prevent
    >
      <button ref={closeRef} type="button" className="case-close" data-cursor="Cerrar" onClick={close}>
        Cerrar ✕
      </button>
      <div className="case-inner" key={project.id}>
        <div>
          <span className="mono case-reveal">Proyecto {projectNumber(index)}</span>
          <h2 className="case-title" id="case-title">
            <SplitText text={project.name} />
          </h2>
          <p className="case-summary case-reveal">
            {project.summary ?? "Descripción por completar: qué es el proyecto, para quién y qué problema resuelve."}
          </p>
        </div>

        {project.cover ? (
          <div className="case-cover">
            <img src={project.cover.src} alt={project.cover.alt} width={project.cover.width} height={project.cover.height} />
          </div>
        ) : null}

        {sections.length > 0 ? (
          <div className="case-sections">
            {sections.map(({ key, title }) => (
              <section key={key} className="case-scroll">
                <span className="mono">{title}</span>
                <p>{project.caseStudy?.[key]}</p>
              </section>
            ))}
          </div>
        ) : null}

        {desktop.length > 0 ? (
          <Gallery screens={desktop} host={host(project.liveUrl)} onOpen={(s) => setZoom(all.indexOf(s))} />
        ) : null}

        {mobile.length > 0 ? (
          <section className="phones" aria-label="En el celular">
            <span className="mono case-scroll">En el celular</span>
            <div className="phones-row">
              {mobile.map((s) => (
                <Phone key={s.src} screen={s} onOpen={() => setZoom(all.indexOf(s))} />
              ))}
            </div>
          </section>
        ) : null}

        {project.technologies?.length ? (
          <div className="case-chips" aria-label="Tecnologías">
            {project.technologies.map((t) => (
              <span key={t} className="case-chip">
                {t}
              </span>
            ))}
          </div>
        ) : null}

        <div className="case-meta">
          <div className="case-scroll">
            <span className="mono">Tipo</span>
            <b>{project.type}</b>
          </div>
          <div className="case-scroll">
            <span className="mono">Rol</span>
            <b>{project.role ?? "Full Stack"}</b>
          </div>
          <div className="case-scroll">
            <span className="mono">Año</span>
            <b>{project.year}</b>
          </div>
          <div className="case-scroll">
            <span className="mono">Explorar</span>
            {links.length > 0 ? (
              <b>
                {links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer" data-cursor="Abrir">
                    {link.label} ↗
                  </a>
                ))}
              </b>
            ) : (
              <b>Enlaces por completar</b>
            )}
          </div>
        </div>

        {next && next !== project ? (
          <button type="button" className="case-next" style={colorVars(next)} onClick={goNext} data-cursor="Siguiente">
            <span className="mono">Siguiente proyecto</span>
            <span className="case-next-name">
              <SplitText text={next.name} />
            </span>
            {next.cover ? <img src={next.cover.src} alt="" className="case-next-peek" /> : null}
          </button>
        ) : null}
      </div>

      {zoom !== null && all[zoom] ? (
        <Zoom screens={all} index={zoom} onChange={setZoom} onClose={() => setZoom(null)} />
      ) : null}
    </div>,
    document.body,
  );
}

/** Desktop captures in browser frames, on a strip you drag sideways (or scroll on touch). */
function Gallery({ screens, host, onOpen }: { screens: Screen[]; host: string; onOpen: (s: Screen) => void }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const dragged = useRef(0);
  const [native, setNative] = useState(true);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    const bar = barRef.current;
    if (!wrap || !track || !bar) return;
    const setBar = (p: number) => gsap.set(bar, { scaleX: Math.max(0.08, Math.min(1, p)) });

    if (!hasFinePointer() || prefersReducedMotion()) {
      setNative(true);
      const onScroll = () => setBar((wrap.scrollLeft + wrap.clientWidth) / wrap.scrollWidth);
      onScroll();
      wrap.addEventListener("scroll", onScroll, { passive: true });
      return () => wrap.removeEventListener("scroll", onScroll);
    }
    setNative(false);
    const update = function (this: Draggable) {
      const min = this.minX || -1;
      setBar(0.25 + 0.75 * (this.x / min));
    };
    const d = Draggable.create(track, {
      type: "x",
      bounds: wrap,
      inertia: true,
      edgeResistance: 0.85,
      dragClickables: true,
      allowNativeTouchScrolling: true,
      onDrag: update,
      onThrowUpdate: update,
      onDragEnd: () => (dragged.current = performance.now()),
    })[0];
    if (!d) return;
    update.call(d);
    const onResize = () => d.applyBounds(wrap);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      d.kill();
    };
  }, []);

  return (
    <section className="gallery" aria-label="Pantallas">
      <div className="gallery-head case-scroll">
        <span className="mono">Pantallas</span>
        <span className="mono">{native ? "Desliza →" : "Arrastra →"}</span>
      </div>
      <div ref={wrapRef} className={`gallery-wrap ${native ? "is-native" : ""}`} data-cursor={native ? undefined : "Arrastra"}>
        <div ref={trackRef} className="gallery-track">
          {screens.map((s) => (
            <button
              key={s.src}
              type="button"
              className="gallery-item"
              aria-label={`Ver en grande: ${s.alt}`}
              onClick={() => {
                if (performance.now() - dragged.current > 200) onOpen(s);
              }}
            >
              <span className="frame-bar" aria-hidden="true">
                <i />
                <i />
                <i />
                <span>{host}</span>
              </span>
              <img src={s.src} alt="" width={s.width} height={s.height} loading="lazy" draggable={false} />
            </button>
          ))}
        </div>
      </div>
      <span className="gallery-progress" aria-hidden="true">
        <span ref={barRef} />
      </span>
    </section>
  );
}

/** A phone capture that tilts toward the cursor. */
function Phone({ screen, onOpen }: { screen: Screen; onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;
    const inner = el.firstElementChild as HTMLElement;
    const rx = gsap.quickTo(inner, "rotationX", { duration: 0.5, ease: "power3" });
    const ry = gsap.quickTo(inner, "rotationY", { duration: 0.5, ease: "power3" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 18);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 18);
    };
    const leave = () => {
      rx(0);
      ry(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);
  return (
    <button ref={ref} type="button" className="phone" onClick={onOpen} aria-label={`Ver en grande: ${screen.alt}`} data-cursor="Ver">
      <span className="phone-body">
        <img src={screen.src} alt="" width={screen.width} height={screen.height} loading="lazy" />
      </span>
    </button>
  );
}

/** Any screen at full size, with arrows and the keyboard. */
function Zoom({ screens, index, onChange, onClose }: { screens: Screen[]; index: number; onChange: (i: number) => void; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const s = screens[index];
  const go = useCallback((step: number) => onChange((index + step + screens.length) % screens.length), [index, onChange, screens.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    ref.current?.querySelector<HTMLButtonElement>(".zoom-close")?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    const tween = gsap.fromTo(ref.current.querySelector("img"), { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "expo.out" });
    return () => {
      tween.kill();
    };
  }, [index]);

  if (!s) return null;
  return (
    <div ref={ref} className="zoom" role="dialog" aria-modal="true" aria-label="Captura en grande" onClick={onClose}>
      <img
        src={s.src}
        alt={s.alt}
        width={s.width}
        height={s.height}
        className={s.device === "mobile" ? "is-mobile" : ""}
        onClick={(e) => e.stopPropagation()}
      />
      <p className="zoom-caption mono">
        {index + 1} / {screens.length} · {s.alt}
      </p>
      <button type="button" className="zoom-close" onClick={onClose} data-cursor="Cerrar">
        Cerrar ✕
      </button>
      {screens.length > 1 ? (
        <>
          <button type="button" className="zoom-nav is-prev" aria-label="Anterior" onClick={(e) => { e.stopPropagation(); go(-1); }}>
            ←
          </button>
          <button type="button" className="zoom-nav is-next" aria-label="Siguiente" onClick={(e) => { e.stopPropagation(); go(1); }}>
            →
          </button>
        </>
      ) : null}
    </div>
  );
}
