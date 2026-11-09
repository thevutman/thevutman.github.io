import memoriaVivaCover from "@/assets/projects/memoria-viva.webp";
import beeperCover from "@/assets/projects/beeper.webp";
import cabanasCover from "@/assets/projects/cabanas-la-marquesa.webp";
import notflixCover from "@/assets/projects/notflix.webp";
import steamBurgerCover from "@/assets/projects/steam-burger.webp";
import valeriaCover from "@/assets/projects/valeria-velasco.webp";
import type { Tone } from "@/data/profile";
import { screens, type Screen } from "@/data/screens";

/**
 * Portfolio projects.
 *
 * The six selected projects, in order. Anything left out of an entry (a link, a case-study
 * section, the screens) is simply not rendered. What is still pending is in PENDIENTES.md.
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
  /** Fallback background while the project has no colors of its own. */
  tone: Exclude<Tone, "ink">;
  /** The project's own colors, taken from its site: background and text of its preview and case study. */
  colors?: { bg: string; fg: string };
  role?: string;
  summary?: string;
  technologies?: string[];
  cover?: ProjectImage;
  /** More captures of the live site for the case study: desktop ones go in the gallery, phone ones in the phones. */
  screens?: Screen[];
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
    colors: { bg: "#81161c", fg: "#ffffff" },
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
    screens: screens([
      ["notflix-login", "Inicio de sesión de Notflix con el botón para entrar como invitado"],
      ["notflix-home", "Inicio de Notflix con las filas de películas y series"],
      ["notflix-detail", "Detalle de Viaje a la Luna con el botón Play y el corazón de Mi lista"],
      ["notflix-m-home", "Inicio de Notflix en el celular"],
      ["notflix-m-detail", "Detalle de una película en el celular"],
    ]),
    liveUrl: "https://notflix-v2.vercel.app",
    repositoryUrl: "https://github.com/thevutman/NotflixV2",
  },
  {
    id: "valeria-velasco-photography",
    name: "Valeria Velasco",
    type: "Sitio para cliente",
    year: "2026",
    tone: "peach",
    colors: { bg: "#f8f6f1", fg: "#292725" },
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
    screens: screens([
      ["valeria-home", "Portada del sitio de Valeria Velasco con una pareja en Zúrich"],
      ["valeria-portfolio", "Sección de historias en la página de inicio"],
      ["valeria-stories", "Página de historias con cada boda"],
      ["valeria-story", "Galería de fotos dentro de una historia"],
      ["valeria-m-home", "Portada del sitio en el celular"],
      ["valeria-m-story", "Una historia de boda en el celular"],
    ]),
    liveUrl: "https://weddingportfolio-pi.vercel.app",
    repositoryUrl: "https://github.com/valevelasco/weddingportfolio",
  },
  {
    id: "steam-burger",
    name: "Steam Burger",
    type: "Tienda full stack",
    year: "2023 · 2026",
    tone: "taupe",
    colors: { bg: "#edd1aa", fg: "#880d0d" },
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
    screens: screens([
      ["steam-menu", "Menú completo de Steam Burger con los precios en botones rojos"],
      ["steam-cart", "Carrito abierto con una Premium Burger y unas papas"],
      ["steam-tracking", "Seguimiento en vivo de un pedido, en el paso En la plancha"],
      ["steam-kitchen", "Panel de la cocina con las columnas de pedidos en vivo"],
      ["steam-m-home", "Inicio de Steam Burger en el celular"],
      ["steam-m-menu", "Menú en el celular"],
    ]),
    liveUrl: "https://steam-burger.vercel.app",
    repositoryUrl: "https://github.com/thevutman/SteamBurger",
  },
  {
    id: "beeper",
    name: "Beeper",
    type: "Concepto de producto · UI/UX",
    year: "2026",
    tone: "clay",
    colors: { bg: "#0c0b0a", fg: "#ece8e1" },
    role: "Diseño UI/UX y front-end",
    summary:
      "Un dispositivo de comunicación con IA para quienes trabajan en movimiento: hablas, la IA entiende y resume lo que dijiste, y lo envías con un botón. La landing cuenta el producto en 13 capítulos.",
    technologies: ["UI/UX", "Diseño de producto", "Prototipado", "HTML", "CSS", "JavaScript", "Netlify"],
    cover: {
      src: beeperCover,
      alt: "Portada de Beeper: el dispositivo negro con su pantalla OLED y el lema Say more. Send less.",
      width: 1600,
      height: 1100,
    },
    caseStudy: {
      context:
        "Proyecto de UI/UX: diseñar un producto y contar su historia. Partí de un problema real: en una obra, en el campo o con guantes, el celular pide siete pasos (desbloquear, abrir, buscar, escribir, corregir, cerrar alertas, enviar) justo cuando no le puedes dar atención.",
      process:
        "Diseñé el concepto completo: un aparato con tres botones físicos que se usan con guantes, una pantalla OLED mínima, un interruptor físico para el micrófono y una conexión que salta sola entre red celular, Wi-Fi y satélite. Definí cuatro niveles de mensaje (normal, importante, prioridad y emergencia), los modos de uso y la app del celular que lo configura.",
      solution:
        "Una landing de 13 capítulos que se recorre con el scroll: del problema a la idea, la voz que se vuelve mensaje (25 palabras quedan en 9), el diseño para el campo, la privacidad, el dispositivo pieza por pieza y la lista de espera. Todo el recorrido pasa de siete pasos a cuatro: presionar, hablar, confirmar y enviar.",
    },
    screens: screens([
      ["beeper-problem", "Capítulo del problema: los lugares donde comunicarse se complica"],
      ["beeper-voice", "Capítulo de voz a mensaje con la frase original y la versión resumida"],
      ["beeper-field", "Beeper en la mesa de obra y en el chaleco de un trabajador"],
      ["beeper-priority", "Los cuatro niveles de mensaje: normal, importante, prioridad y emergencia"],
      ["beeper-device", "El dispositivo con sus partes señaladas: OLED, navegación, botón de voz y privacidad"],
      ["beeper-app", "La app compañera del celular con contactos, prioridades y modos"],
    ]),
    liveUrl: "https://stellular-banoffee-6e723b.netlify.app",
  },
  {
    id: "memoria-viva",
    name: "Memoria Viva",
    type: "Libro interactivo con IA",
    year: "2026",
    tone: "olive",
    colors: { bg: "#31452c", fg: "#f2e8dc" },
    role: "Desarrollador",
    summary:
      "Un libro digital sobre los saberes de las matronas de Santa Fe de Antioquia que se hojea con la mano frente a la cámara, y una cabina donde la gente graba sus chismes y memorias para que una IA los transcriba, los modere y los publique. Ganó mención de honor.",
    technologies: ["React", "TypeScript", "MediaPipe", "Visión artificial", "GSAP", "Supabase", "Gemini", "Tailwind"],
    cover: {
      src: memoriaVivaCover,
      alt: "Portada del libro Memoria Viva: una casa colonial con raíces y el título sobre papel crema",
      width: 1600,
      height: 1100,
    },
    caseStudy: {
      context:
        "Proyecto del taller con el equipo Memoria Viva: Simón lideró el grupo, Sofía y Felipe hicieron el diseño, Luis Parra y Sebastián González la investigación, y yo lo desarrollé. La idea era guardar los saberes de las matronas de Santa Fe de Antioquia (cocina, plantas, partería) y las memorias cotidianas del pueblo.",
      process:
        "Llevé el diseño a un libro que pasa sus hojas en 3D con GSAP. Con MediaPipe la cámara sigue la mano: al pellizcar y arrastrar, la página se voltea, sin tocar nada. El Chismógrafo graba la voz en el navegador y la manda a una función de Supabase, donde Gemini transcribe, filtra lo ofensivo, le pone título y un resumen en tono de chisme.",
      solution:
        "Lo expusimos con el libro y la cabina funcionando y el proyecto ganó mención de honor. Los chismes aprobados quedan en las Historias, con su audio, para que cualquiera los escuche.",
    },
    screens: screens([
      ["memoria-index", "Índice del libro con sus capítulos de colores"],
      ["memoria-chapter1", "Capítulo de las matronas con flores ilustradas"],
      ["memoria-recipe", "Receta del tamal de naranja agria en la cocina de relatos"],
      ["memoria-herbs", "Capítulo de las herbarias con la ilustración de una matrona"],
      ["memoria-cabina", "Cabina de grabación del Chismógrafo"],
    ]),
    liveUrl: "https://taller6-nine.vercel.app",
    repositoryUrl: "https://github.com/thevutman/taller6",
  },
  {
    id: "cabanas-la-marquesa",
    name: "Cabañas La Marquesa",
    type: "Sitio para cliente",
    year: "2022 · 2026",
    tone: "sage",
    colors: { bg: "#d2d92e", fg: "#141414" },
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
    screens: screens([
      ["cabanas-detail", "Mosaico de fotos de la Cabaña Duquesa"],
      ["cabanas-chalets", "Lista de cabañas con capacidad, servicios y precio por noche"],
      ["cabanas-contact", "Formulario de reserva que abre WhatsApp"],
      ["cabanas-m-home", "Inicio de Cabañas La Marquesa en el celular"],
      ["cabanas-m-booking", "Precio y formulario de reserva en el celular"],
    ]),
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

/** Background and text color of a project's preview and case study. */
export function projectColors(project: Project) {
  return project.colors ?? { bg: `var(--${project.tone})`, fg: "var(--ink)" };
}

/** Two-digit position, e.g. "01". */
export function projectNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}
