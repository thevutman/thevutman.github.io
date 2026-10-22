/**
 * Portfolio projects.
 *
 * The four entries below are placeholders that mirror the original design.
 * Replace each one with a real project: fill in the fields you have and leave
 * the rest out — empty case-study sections are simply not rendered.
 */

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type CaseStudy = {
  context?: string;
  goals?: string;
  process?: string;
  decisions?: string;
  solution?: string;
};

export type Project = {
  id: string;
  name: string;
  summary: string;
  /** Kind of project shown in the meta line, e.g. "Aplicación web". */
  type?: string;
  /** When it was finished, e.g. "Abril 2025". */
  date?: string;
  /** What you did, e.g. "Full Stack". */
  role?: string;
  disciplines: string[];
  technologies: string[];
  cover?: ProjectImage;
  gallery?: ProjectImage[];
  caseStudy?: CaseStudy;
  liveUrl?: string;
  repositoryUrl?: string;
  /** Marks example content so the UI labels it as pending. */
  isPlaceholder?: boolean;
};

export const caseStudySections: { key: keyof CaseStudy; title: string }[] = [
  { key: "context", title: "Contexto y problema" },
  { key: "goals", title: "Objetivos" },
  { key: "process", title: "Proceso" },
  { key: "decisions", title: "Decisiones técnicas y de diseño" },
  { key: "solution", title: "Solución final" },
];

const placeholder = (index: number): Project => ({
  id: `proyecto-${index}`,
  name: "Nombre del proyecto",
  summary: "Descripción pendiente",
  role: "Full Stack",
  disciplines: [],
  technologies: [],
  isPlaceholder: true,
});

export const projects: Project[] = [placeholder(1), placeholder(2), placeholder(3), placeholder(4)];

/*
 * Example of a real entry (put the images in src/assets/projects/):
 *
 * import cover from "@/assets/projects/mi-proyecto.webp";
 *
 * {
 *   id: "mi-proyecto",
 *   name: "Mi proyecto",
 *   summary: "Una frase que explique el proyecto.",
 *   type: "Aplicación web",
 *   date: "Abril 2025",
 *   role: "Full Stack",
 *   disciplines: ["Frontend", "Backend"],
 *   technologies: ["React", "Node.js", "PostgreSQL"],
 *   cover: { src: cover, alt: "Pantalla principal de Mi proyecto", width: 1600, height: 1100 },
 *   caseStudy: { context: "…", solution: "…" },
 *   liveUrl: "https://…",
 *   repositoryUrl: "https://github.com/…",
 * }
 */

/** Two-digit position shown in the showcase and the case study, e.g. "01". */
export function projectNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

/** Type, date and role for the meta line; missing values show as pending. */
export function projectMeta(project: Project) {
  return [
    project.type ?? "Tipo por definir",
    project.date ?? "Fecha por definir",
    project.role ?? "Rol por definir",
  ];
}
