import type { Tone } from "@/data/profile";

/**
 * Portfolio projects.
 *
 * The five entries below are placeholders. Replace each one with a real
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
  { id: "proyecto-uno", name: "Proyecto Uno", type: "Aplicación web", year: "2026", tone: "peach" },
  { id: "proyecto-dos", name: "Proyecto Dos", type: "E-commerce", year: "2025", tone: "sage" },
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
