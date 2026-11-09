import notflixCover from "@/assets/projects/notflix.webp";
import valeriaCover from "@/assets/projects/valeria-velasco.webp";
import type { Tone } from "@/data/profile";

/**
 * Portfolio projects.
 *
 * Notflix is real; the entries after it are still placeholders. Replace each one with a real
 * project: fill in what you have and leave the rest out — empty case-study
 * sections and links are simply not rendered.
 */

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type CaseStudy = {
  context?: string;
  process?: string;
  solution?: string;
};

export type Project = {
  id: string;
  name: string;
  /** Kind of project, e.g. "Aplicación web". */
  type: string;
  year: string;
  /** Background of the hover preview and the case study. */
  tone: Exclude<Tone, "ink">;
  role?: string;
  summary?: string;
  technologies?: string[];
  cover?: ProjectImage;
  caseStudy?: CaseStudy;
  liveUrl?: string;
  repositoryUrl?: string;
};

export const caseStudySections: { key: keyof CaseStudy; title: string }[] = [
  { key: "context", title: "Contexto" },
  { key: "process", title: "Proceso" },
  { key: "solution", title: "Resultado" },
];

export const projects: Project[] = [
  {
    id: "notflix",
    name: "Notflix",
    type: "Streaming full stack",
    year: "2022 · 2026",
    tone: "clay",
    role: "Líder y Full Stack",
    summary:
      "Una plataforma de streaming de clásicos del cine de dominio público: gratis y 0 % piratas. Nació como proyecto final de Misión TIC y en 2026 la reviví de punta a punta.",
    technologies: ["Java", "Spring Boot 3", "Spring Security", "MongoDB Atlas", "React", "TypeScript", "Tailwind", "Docker"],
    cover: {
      src: notflixCover,
      alt: "Pantalla de inicio de Notflix: el logo con parche y las filas de películas y series",
      width: 1600,
      height: 1100,
    },
    caseStudy: {
      context:
        "En 2022 lideré el proyecto final del ciclo 4 de Misión TIC: un Netflix propio, con API en Spring Boot y front en React, hecho junto a Marcela Ríos, savendanog y dannyshernandezg. Funcionó hasta que cerraron la cuenta institucional de MongoDB: la base de datos desapareció y el sitio quedó en blanco.",
      process:
        "Lo rehice conservando su identidad: el logo con parche, la paleta, las cajitas y las mismas rutas de la API. Por dentro cambió todo: login con JWT y BCrypt en lugar de mandar la contraseña en cada petición, permisos de administrador, validaciones, un catálogo que se carga solo al arrancar y pruebas de integración contra MongoDB.",
      solution:
        "Hoy está publicado con la API en Render y la base en MongoDB Atlas. Tiene 13 películas y 3 series de cortos de dominio público, Mi lista, búsqueda, conteo real de reproducciones y un botón de invitado para recorrerlo sin registrarse.",
    },
    liveUrl: "https://notflix-v2.vercel.app",
    repositoryUrl: "https://github.com/thevutman/NotflixV2",
  },
  {
    id: "valeria-velasco-photography",
    name: "Valeria Velasco",
    type: "Sitio para cliente",
    year: "2026",
    tone: "peach",
    role: "Diseño y desarrollo",
    summary:
      "El portafolio de una fotógrafa de bodas en Suiza: editorial, en tres idiomas y con un CMS para que ella misma publique cada boda sin tocar código.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind", "Sanity CMS", "GSAP", "i18n EN · FR · DE"],
    cover: {
      src: valeriaCover,
      alt: "Portada del sitio de Valeria Velasco Photography con una novia en una escalera de Zúrich",
      width: 1600,
      height: 1100,
    },
    caseStudy: {
      context:
        "Valeria, mi hermana, es fotógrafa de bodas en Suiza y necesitaba un sitio que vendiera su trabajo a parejas que hablan inglés, francés o alemán, y que pudiera actualizar sola cada vez que entrega una boda.",
      process:
        "Diseñé las cinco páginas (inicio, sobre mí, enfoque, historias y cada historia) y las construí con Atomic Design, rutas del lado del cliente y una capa de traducción propia para los tres idiomas. Cada boda vive en Sanity: ella sube las fotos y el texto, y la página se arma sola. Le dejé una guía en español para el día a día.",
      solution:
        "Un sitio editorial y rápido, con SEO por página y sitemap, que Valeria administra sin ayuda. Cada historia nueva aparece en el sitio con solo publicarla en el CMS.",
    },
    liveUrl: "https://weddingportfolio-pi.vercel.app",
    repositoryUrl: "https://github.com/valevelasco/weddingportfolio",
  },
  { id: "proyecto-tres", name: "Proyecto Tres", type: "API y panel", year: "2025", tone: "taupe" },
  { id: "proyecto-cuatro", name: "Proyecto Cuatro", type: "Juego web", year: "2024", tone: "clay" },
  {
    id: "proyecto-cinco",
    name: "Proyecto Cinco",
    type: "Herramienta",
    year: "2024",
    tone: "olive",
  },
];

/*
 * Example of a real entry (put the images in src/assets/projects/):
 *
 * import cover from "@/assets/projects/mi-proyecto.webp";
 *
 * {
 *   id: "mi-proyecto",
 *   name: "Mi proyecto",
 *   type: "Aplicación web",
 *   year: "2025",
 *   tone: "peach",
 *   role: "Full Stack",
 *   summary: "Una frase que explique el proyecto.",
 *   technologies: ["React", "Node.js", "PostgreSQL"],
 *   cover: { src: cover, alt: "Pantalla principal de Mi proyecto", width: 1600, height: 1100 },
 *   caseStudy: { context: "…", process: "…", solution: "…" },
 *   liveUrl: "https://…",
 *   repositoryUrl: "https://github.com/…",
 * }
 */

/** Two-digit position, e.g. "01". */
export function projectNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}
