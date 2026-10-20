/**
 * Personal content for the presentation, about and contact sections.
 * Every field is optional: while it is empty the site shows a clear
 * "pendiente" placeholder instead of invented information.
 */

export type ProfileField = {
  title: string;
  content?: string;
};

export type ContactChannel = {
  id: "linkedin" | "github" | "email";
  label: string;
  /** Second line under the label. */
  description: string;
  /** mailto: or https:// URL. */
  href: string;
  /** Visible address or profile path. */
  display: string;
};

export const presentation = {
  summary:
    "Construyo productos web completos: interfaces cuidadas, lógica sólida y los servicios que las sostienen. Mi formación en diseño de entretenimiento digital hace que la interacción y el detalle visual siempre formen parte del código.",
};

export type AboutBlock = ProfileField & {
  /** Short opening phrase shown with more weight than the rest of the text. */
  lead?: string;
};

export const about: {
  label: string;
  highlight: string;
  description: string[];
  blocks: AboutBlock[];
} = {
  label: "PRESENTACIÓN PERSONAL",
  highlight: "Construyo experiencias digitales de principio a fin.",
  description: [
    "Soy estudiante de Ingeniería en Diseño de Entretenimiento Digital y desarrollador de software. Me interesa entender cómo funciona un producto en todas sus capas: desde la interfaz con la que interactúa una persona hasta la lógica y los servicios que hacen posible la experiencia.",
    "Combino desarrollo frontend y backend con una mirada orientada al diseño, buscando crear soluciones funcionales, intuitivas y bien construidas.",
  ],
  blocks: [
    {
      title: "Enfoque profesional",
      lead: "Full Stack Development.",
      content:
        "Desarrollo interfaces, lógica de aplicación e integraciones para construir productos digitales de forma integral.",
    },
    {
      title: "Stack tecnológico",
      lead: "React, TypeScript, JavaScript, Node.js, PostgreSQL y Git.",
      content: "Experiencia también con herramientas como Docker.",
    },
    {
      title: "Lo que me mueve",
      content:
        "Arquitectura de software, experiencias interactivas, interfaces cuidadas, animación web y nuevas formas de conectar tecnología y creatividad.",
    },
  ],
};

export const contact = {
  title: "¿Construimos algo interesante?",
  intro:
    "Estoy abierto a nuevas oportunidades, colaboraciones y proyectos donde el desarrollo y la creatividad se encuentren.",
};

export const contactChannels: ContactChannel[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    description: "Conectemos profesionalmente.",
    href: "https://www.linkedin.com/in/santiago-velasco-mosquera/",
    display: "in/santiago-velasco-mosquera",
  },
  {
    id: "github",
    label: "GitHub",
    description: "Explora mis proyectos y código.",
    href: "https://github.com/thevutman",
    display: "github.com/thevutman",
  },
  {
    id: "email",
    label: "Email",
    description: "Escríbeme directamente.",
    href: "mailto:santiagovelascomosquera@hotmail.com",
    display: "santiagovelascomosquera@hotmail.com",
  },
];

export const signature = "Santiago Velasco Mosquera · Desarrollador Full Stack";
