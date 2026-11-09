/**
 * Personal content: hero, about, experience and contact.
 * Everything marked "por completar" / "por confirmar" is a placeholder waiting
 * for the real information.
 */

export const person = {
  firstName: "Santiago",
  lastName: "Velasco",
  fullName: "Santiago Velasco",
  role: "Desarrollador Full Stack",
  tagline: ["Construyo productos web completos,", "de la interfaz al servidor."],
};

/** Palette tones a chip, project or case study can use. */
export type Tone = "peach" | "sage" | "taupe" | "clay" | "olive" | "ink";

export type Skill = {
  name: string;
  /** Filled chip colour; omit for an outlined chip. */
  tone?: Tone;
  big?: boolean;
  /** Starting position in the hero, as a percentage of its width and height. */
  x: number;
  y: number;
};

/** Floating, draggable chips in the hero. Also feed the marquee. */
export const skills: Skill[] = [
  { name: "React", tone: "peach", big: true, x: 8, y: 16 },
  { name: "TypeScript", tone: "sage", x: 30, y: 12 },
  { name: "Node.js", tone: "ink", big: true, x: 70, y: 14 },
  { name: "PostgreSQL", tone: "taupe", x: 84, y: 34 },
  { name: "GSAP", tone: "clay", x: 6, y: 62 },
  { name: "Docker", tone: "olive", x: 74, y: 64 },
  { name: "Git", x: 24, y: 80 },
  { name: "Tailwind", tone: "sage", x: 60, y: 84 },
  { name: "APIs REST", x: 50, y: 18 },
  { name: "Figma", tone: "peach", x: 88, y: 76 },
];

export const about = {
  statement:
    "Me interesa entender cómo funciona un producto en todas sus capas, de la interfaz que tocas a la lógica que la sostiene.",
  /** Por confirmar: replace with real numbers. */
  stats: [
    { value: 3, label: "años programando" },
    { value: 12, label: "proyectos construidos" },
    { value: 10, label: "tecnologías en mi día a día" },
  ],
  stack: [
    "React",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "PostgreSQL",
    "Docker",
    "Git",
    "GSAP",
    "Tailwind",
    "Figma",
  ],
};

export type Job = {
  /** Big label in the timeline: a year, or "Hoy" for the current job. */
  year: string;
  range: string;
  role: string;
  description: string;
  place: string;
  tags: string[];
  /** The current job keeps a pulse on its timeline node. */
  current?: boolean;
};

/** Newest first. Placeholders until the real experience is filled in. */
export const experience: Job[] = [
  {
    year: "Hoy",
    range: "2025 — Actual",
    role: "Cargo por completar",
    description: "Empresa o proyecto. Qué construiste, para quién y qué cambió gracias a eso.",
    place: "Remoto",
    tags: ["React", "Node.js", "PostgreSQL"],
    current: true,
  },
  {
    year: "2024",
    range: "2024 — 2025",
    role: "Cargo por completar",
    description: "Empresa o proyecto. Un logro concreto, con números si los tienes.",
    place: "Ciudad",
    tags: ["TypeScript", "APIs REST", "Docker"],
  },
  {
    year: "2023",
    range: "2023 — 2024",
    role: "Proyectos freelance",
    description: "Sitios y aplicaciones para clientes, de la idea al despliegue.",
    place: "—",
    tags: ["JavaScript", "GSAP", "Figma"],
  },
];

export type ContactChannel = {
  label: string;
  href: string;
  /** Word shown inside the custom cursor on hover. */
  cursor: string;
};

export const socials: ContactChannel[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/santiago-velasco-mosquera/",
    cursor: "Abrir",
  },
  { label: "GitHub", href: "https://github.com/thevutman", cursor: "Abrir" },
];

export const email: ContactChannel = {
  label: "Escríbeme",
  href: "mailto:santiagovelascomosquera@hotmail.com",
  cursor: "Escribir",
};
