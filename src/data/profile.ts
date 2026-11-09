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
    "Trabajo como desarrollador backend en Volga y estudio Ingeniería en Diseño de Entretenimiento Digital en la UPB. Me interesa entender un producto en todas sus capas, de la interfaz que tocas a la lógica que la sostiene.",
  stack: [
    "React",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Python",
    "Java · Spring Boot",
    "Angular",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "Git",
    "Tailwind",
    "GSAP",
    "Figma",
    "Unity",
  ],
};

/**
 * Counters under the statement. Programming since the SENA course of 2021, taken while still in
 * school; repositories are the public ones on GitHub.
 */
export const stats = [
  { value: new Date().getFullYear() - 2021, label: "años programando" },
  { value: 46, label: "repositorios en GitHub" },
  { value: about.stack.length, label: "tecnologías con las que trabajo" },
];

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

/**
 * Work and studies, newest first. Dates from LinkedIn; details from the UPB CV and the repos.
 * Volga is Bitiot's product, so it is described without client or internal details.
 */
export const experience: Job[] = [
  {
    year: "Hoy",
    range: "Marzo 2025 — Actual",
    role: "Desarrollador Backend · Volga",
    description:
      "Volga es la plataforma de analítica de Bitiot para sus clientes. Construyo servicios en Python que reciben eventos por MQTT y generan alertas, un sistema que vigila la conexión y la hora de las cámaras de cada sede y lo expone por una API REST, y módulos del panel web en Angular.",
    place: "Medellín",
    tags: ["Python", "PostgreSQL", "MQTT", "Docker", "Angular"],
    current: true,
  },
  {
    year: "2023",
    range: "Julio 2023 — Junio 2027",
    role: "Ingeniería en Diseño de Entretenimiento Digital",
    description:
      "Universidad Pontificia Bolivariana, énfasis en desarrollo de software. Desarrollo web, experiencias interactivas y videojuegos. Con Memoria Viva, un libro que se hojea con la mano frente a la cámara, recibimos mención de honor en el Taller 6 de Experiencias Interactivas.",
    place: "UPB · Medellín",
    tags: ["React", "Unity", "Visión artificial", "Figma"],
  },
  {
    year: "2022",
    range: "Nov 2022 — Feb 2023",
    role: "Desarrollo web front-end · Platzi",
    description:
      "HTML y CSS a profundidad y desarrollo front-end. De ahí salió la primera versión de Steam Burger, mi primera página.",
    place: "Virtual",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    year: "2022",
    range: "2022",
    role: "Técnico laboral en desarrollo de aplicaciones web",
    description:
      "Universidad Autónoma de Bucaramanga, con Misión TIC 2022: de los fundamentos de programación al desarrollo full stack. En el último ciclo lideré el proyecto final, Notflix, una plataforma de streaming con Spring Boot, MongoDB y React.",
    place: "UNAB · Virtual",
    tags: ["Java", "Spring Boot", "MongoDB", "React"],
  },
  {
    year: "2021",
    range: "2021",
    role: "Técnico en Sistemas · SENA",
    description: "Lo hice mientras terminaba el colegio. Fue mi primer contacto con la programación y el trabajo con computadores.",
    place: "SENA",
    tags: ["Sistemas", "Programación"],
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
