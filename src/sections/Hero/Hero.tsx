import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { handleSectionLink } from "@/lib/scrollToSection";
import { NightLandscape } from "./NightLandscape";
import { useCinematicHero } from "./useCinematicHero";
import "./Hero.css";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  useCinematicHero(heroRef);

  return (
    <section
      ref={heroRef}
      className="night-hero"
      id="inicio"
      tabIndex={-1}
      aria-labelledby="nombre"
    >
      <NightLandscape />

      <div className="hero-identity" id="identidad" tabIndex={-1} data-focus-target>
        <p className="hero-eyebrow hero-detail">
          <span className="small-line" aria-hidden="true" /> DISEÑO CON IDENTIDAD PROPIA
        </p>
        <h1 id="nombre" className="hero-name">
          <span className="name-line">Santiago</span>
          <span className="name-line last-name">
            Velasco<span className="name-period">.</span>
          </span>
        </h1>
        <div className="specialty hero-detail">
          <span className="specialty-mark" aria-hidden="true">
            ✳
          </span>
          <p>
            Diseñador UX/UI<span>Experiencias digitales.</span>
          </p>
        </div>
      </div>

      <div className="hero-bottom">
        <a
          href="#proyectos"
          className="ui-control explore-link hero-detail"
          onClick={(event) => handleSectionLink(event, "proyectos")}
        >
          <span className="explore-circle">
            <ArrowDown aria-hidden="true" />
          </span>
          <span>EXPLORAR</span>
        </a>
        <p className="bottom-caption hero-detail">Entre diseño e interacción.</p>
        <span className="scene-index hero-detail">
          01 <span aria-hidden="true">/</span> INICIO
        </span>
      </div>

      {/* Decorative title revealed by the scroll transition; the real heading
          lives in the projects section. */}
      <div className="cinematic-reveal" aria-hidden="true">
        <span className="section-number">02 / PORTAFOLIO</span>
        <p className="cinematic-title">
          Proyectos<span>.</span>
        </p>
        <p>Diseño e interacción.</p>
        <ArrowDown />
      </div>
    </section>
  );
}
