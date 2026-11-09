import { useEffect, useRef } from "react";
import { navigation } from "@/data/navigation";
import { person } from "@/data/profile";
import { gsap, hasFinePointer, ScrollTrigger } from "@/lib/gsap";
import { goTo } from "@/lib/smoothScroll";
import "./Navbar.css";

/**
 * Corner navbar in difference blend mode, so it reads on light and dark
 * sections alike. It hides while scrolling down and comes back going up; the
 * "Hablemos" button is magnetic.
 */
export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const nav = navRef.current,
      cta = ctaRef.current;
    if (!nav || !cta) return;

    const trigger = ScrollTrigger.create({
      start: 120,
      end: "max",
      onUpdate: (self) =>
        gsap.to(nav, {
          yPercent: self.direction > 0 ? -120 : 0,
          duration: 0.5,
          ease: "power3",
          overwrite: "auto",
        }),
      onLeaveBack: () => gsap.to(nav, { yPercent: 0, duration: 0.5, overwrite: "auto" }),
    });

    if (!hasFinePointer()) return () => trigger.kill();
    const mx = gsap.quickTo(cta, "x", { duration: 0.6, ease: "power3" });
    const my = gsap.quickTo(cta, "y", { duration: 0.6, ease: "power3" });
    const onMove = (event: PointerEvent) => {
      const r = cta.getBoundingClientRect();
      mx((event.clientX - r.left - r.width / 2) * 0.4);
      my((event.clientY - r.top - r.height / 2) * 0.4);
    };
    const onLeave = () => gsap.to(cta, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, .4)" });
    cta.addEventListener("pointermove", onMove);
    cta.addEventListener("pointerleave", onLeave);
    return () => {
      trigger.kill();
      cta.removeEventListener("pointermove", onMove);
      cta.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <header ref={navRef} className="nav">
      <a
        className="nav-brand"
        href="#inicio"
        data-cursor="Inicio"
        onClick={(e) => goTo(e, "inicio")}
      >
        <b>{person.fullName}</b>
        <span>{person.role}</span>
      </a>
      <nav className="nav-links" aria-label="Principal">
        {navigation.map(({ id, label }) => (
          <a key={id} className="roll" href={`#${id}`} onClick={(e) => goTo(e, id)}>
            <span>{label}</span>
            <span aria-hidden="true">{label}</span>
          </a>
        ))}
        <a
          ref={ctaRef}
          className="nav-cta"
          href="#contacto"
          data-cursor="Hola"
          onClick={(e) => goTo(e, "contacto")}
        >
          Hablemos ↗
        </a>
      </nav>
    </header>
  );
}
