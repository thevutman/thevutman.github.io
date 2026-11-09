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
  /** Hero message, line by line. Text between *asterisks* gets the accent marker. */
  tagline: ["Construyo productos web *completos*,", "de la interfaz al *servidor*."],
};

/** Palette tones a project or case study can use. */
export type Tone = "peach" | "sage" | "taupe" | "clay" | "olive" | "ink";

/**
 * Chip colours: the same five accents the dot of the i cycles through (src/lib/accent.ts),
 * plus ink. So the skills belong to the site's palette instead of fighting it.
 */
export type ChipColor = "orange" | "cobalt" | "lime" | "pink" | "green" | "ink";

export type Skill = {
  name: string;
  /** Filled chip colour; omit for an outlined chip. */
  color?: ChipColor;
  big?: boolean;
  /** Starting position in the hero, as a percentage of its width and height. */
  x: number;
  y: number;
  /** Height on phones when `y` would put the chip behind the message. */
  my?: number;
};

/** Floating, draggable chips in the hero. Also feed the marquee. */
export const skills: Skill[] = [
  // The band from y 70% to 86% around the centre is kept free for the message.
  { name: "React", color: "cobalt", big: true, x: 8, y: 16 },
  { name: "TypeScript", color: "lime", x: 30, y: 12 },
  { name: "Node.js", color: "ink", big: true, x: 70, y: 14 },
  { name: "PostgreSQL", color: "pink", x: 84, y: 34 },
  { name: "GSAP", color: "green", x: 6, y: 58 },
  { name: "Docker", color: "orange", x: 80, y: 56 },
  { name: "Git", x: 12, y: 76, my: 65 },
  { name: "Tailwind", color: "cobalt", x: 72, y: 84 },
  { name: "APIs REST", x: 50, y: 18 },
  { name: "Figma", color: "lime", x: 88, y: 72, my: 65 },
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
