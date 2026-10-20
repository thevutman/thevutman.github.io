import { useRef } from "react";
import { presentation } from "@/data/profile";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import "./Introduction.css";

export function Introduction() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef, ".presentation-body > *");

  return (
    <section
      ref={sectionRef}
      className="presentation content-band"
      id="presentacion"
      aria-labelledby="presentation-title"
    >
      <span className="section-number">01 / PRESENTACIÓN</span>
      <div className="presentation-body">
        <h2 id="presentation-title">
          Diseño UX/UI.
          <br />
          <span className="text-muted-foreground">Desarrollo e interacción.</span>
        </h2>
        <p>{presentation.summary ?? "Presentación breve pendiente."}</p>
      </div>
    </section>
  );
}
