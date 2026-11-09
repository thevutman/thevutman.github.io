import cabanasCover from "@/assets/projects/cabanas-la-marquesa.webp";
import notflixCover from "@/assets/projects/notflix.webp";
import steamBurgerCover from "@/assets/projects/steam-burger.webp";
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
  {
    id: "steam-burger",
    name: "Steam Burger",
    type: "Tienda full stack",
    year: "2023 · 2026",
    tone: "taupe",
    role: "Diseño y Full Stack",
    summary:
      "Una hamburguesería donde pides en línea y ves tu pedido avanzar en vivo, mientras la cocina lo mueve desde su propio panel. Fue mi primera página y en 2026 la convertí en una tienda de verdad.",
    technologies: ["Node.js", "Express", "TypeScript", "MongoDB Atlas", "Server-Sent Events", "Zod", "React", "Tailwind", "Vitest"],
    cover: {
      src: steamBurgerCover,
      alt: "Inicio de Steam Burger: la barra roja con el logo en cursiva, el banner de la Premium Burger y el menú",
      width: 1600,
      height: 1100,
    },
    caseStudy: {
      context:
        "Steam Burger fue lo primero que diseñé y programé, en 2023: una landing en HTML, CSS y JavaScript con un carrito que no hacía nada, un carrusel que quedó comentado y un botón de \"menú completo\" que no llevaba a ningún lado.",
      process:
        "La reconstruí sin tocar su cara: el mismo rojo, el logo en Dancing Script, la letra Comfortaa, mi dibujo de la salsa bajo cada título y el footer de contacto. Por dentro le hice una API en Express con TypeScript que calcula los totales en el servidor, valida cada pedido con Zod, limita abusos y avisa los cambios en tiempo real con Server-Sent Events.",
      solution:
        "Hoy tiene menú completo, carrito, pedido a domicilio o para recoger y una página de seguimiento que avanza sola. La cocina tiene su panel con contraseña y un modo demo para que cualquiera pruebe los dos lados: pide en una pestaña y mueve el pedido en la otra.",
    },
    liveUrl: "https://steam-burger.vercel.app",
    repositoryUrl: "https://github.com/thevutman/SteamBurger",
  },
  { id: "proyecto-cuatro", name: "Proyecto Cuatro", type: "Juego web", year: "2024", tone: "clay" },
  {
    id: "proyecto-cinco",
    name: "Proyecto Cinco",
    type: "Herramienta",
    year: "2024",
    tone: "olive",
  },
  {
    id: "cabanas-la-marquesa",
    name: "Cabañas La Marquesa",
    type: "Sitio para cliente",
    year: "2022 · 2026",
    tone: "sage",
    role: "Diseño y desarrollo",
    summary:
      "El sitio de un hospedaje con bar en Coconuco, Cauca: sus cabañas con precios y fotos reales, y una reserva que valida las fechas y abre WhatsApp con la solicitud ya escrita.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind", "React Router", "SEO local"],
    cover: {
      src: cabanasCover,
      alt: "Inicio de Cabañas La Marquesa: el logo, el menú y una cabaña de ladrillo con balcón frente a la montaña",
      width: 1600,
      height: 1100,
    },
    caseStudy: {
      context:
        "Fue uno de mis primeros clientes: lo hice en 2022 en HTML y en 2023 lo pasé a React con webpack, pero quedó en beta. Tenía Lorem ipsum, precios que no cuadraban, fotos de villas sacadas de internet, un botón de reserva que no hacía nada y un enlace a una página de contacto que no existía. El sitio publicado se veía en blanco.",
      process:
        "Lo terminé sin cambiarle la cara: el mismo logo, el verde lima, Raleway, las fotos con sombra, el slider, el mosaico de cada cabaña y el footer negro, con las mismas rutas. Lo pasé a Vite, React 19 y TypeScript, dejé solo las fotos reales del lugar en WebP, ordené los datos de las cinco cabañas y quité las librerías que se cargaban desde CDN.",
      solution:
        "Ahora el huésped elige cabaña, fechas y personas; el sitio no deja fechas pasadas ni más personas de las que caben, calcula las noches y el valor, y abre WhatsApp con la reserva escrita, que es como el hospedaje trabaja de verdad. Tiene página de contacto, visor de fotos, título por página y datos estructurados para Google.",
    },
    liveUrl: "https://cabanaslamarquesa.vercel.app",
    repositoryUrl: "https://github.com/thevutman/cabanaslamarquesa",
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
