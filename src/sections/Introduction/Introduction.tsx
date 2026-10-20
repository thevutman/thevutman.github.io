import { presentation } from "@/data/profile";
import "./Introduction.css";

/**
 * Shares the hero's panel: with stacked panels it sits over the scene and is
 * revealed as the landscape breaks apart (see useCinematicHero). Otherwise it
 * flows after the hero as an ordinary section.
 */
export function Introduction() {
  return (
    <section className="presentation" id="presentacion" aria-labelledby="presentation-title">
      <span className="section-number">01 / PRESENTACIÓN</span>
      <div className="presentation-body">
        <h2 id="presentation-title">
          Desarrollo Full Stack<span className="presentation-mark">.</span>
          <span className="presentation-subtitle">Diseño e interacción.</span>
        </h2>
        <p>{presentation.summary}</p>
      </div>
    </section>
  );
}
