# Santiago Velasco — Portafolio UX/UI

Portafolio personal construido con **Vite + React 19 + TypeScript**, **Tailwind CSS v4** y **GSAP**
(ScrollTrigger y Flip). Es la versión de producción del diseño creado en Lovable, que se conserva
como referencia en `referencia/layered-typography-hero/`.

## Requisitos

- Node.js 20.19 o superior (probado con Node 24)
- npm 10 o superior

## Comandos

```bash
npm install          # instala dependencias
npm run dev          # servidor de desarrollo en http://localhost:5173
npm run build        # comprobación de tipos + build de producción en dist/
npm run preview      # sirve dist/ en local para revisarlo
npm run lint         # ESLint
npm run format       # Prettier (escribe cambios)
npm run optimize:images  # regenera los WebP del hero desde design/originals/
```

`dist/` es estático: se puede publicar en Netlify, Vercel, Cloudflare Pages, GitHub Pages o
cualquier hosting de archivos.

### Dominio definitivo (SEO)

Copia `.env.example` a `.env` y define `SITE_URL` (sin barra final). Con esa variable el build:

- añade `<link rel="canonical">` y `og:url`;
- genera `dist/sitemap.xml`;
- añade la línea `Sitemap:` a `dist/robots.txt`.

Sin `SITE_URL` no se publica ninguna URL absoluta, para no inventar un dominio.

## Estructura

```
├── design/originals/hero/   PNG originales sin pérdida (no se publican)
├── public/                  favicon.svg, robots.txt
├── scripts/optimize-images.mjs
├── src/
│   ├── assets/hero/         capas del paisaje optimizadas (WebP)
│   ├── components/
│   │   ├── layout/          Navbar, Footer
│   │   └── ui/              IconLink, SectionTitle, ProjectCard, ProjectDetail
│   ├── data/                navigation.ts, projects.ts, profile.ts  ← contenido editable
│   ├── hooks/               useActiveSection, useScrollReveal
│   ├── lib/                 gsap.ts (registro de plugins), motion.ts, scrollToSection.ts
│   ├── sections/            Hero, Introduction, Projects, About, Contact
│   ├── styles/              tokens.css (design tokens), index.css (base + capas)
│   ├── App.tsx
│   └── main.tsx
├── index.html               metadatos SEO, Open Graph, Twitter Card
└── vite.config.ts           plugin que genera canonical/sitemap cuando hay SITE_URL
```

Cada componente tiene su CSS al lado (`Hero.css`, `ProjectCard.css`, …) dentro de
`@layer components`, y todos los valores compartidos (colores, tipografías, capas de profundidad,
duraciones, breakpoints) salen de `src/styles/tokens.css`. Tailwind aporta el reset, los tokens
(`text-moon`, `bg-sky`, `font-display`…) y utilidades puntuales; los estilos editoriales se
escriben como CSS propio para reproducir el diseño original al píxel.

## Cómo añadir contenido

Todo el contenido vive en `src/data/` y la interfaz se adapta sola:

- **Proyectos** — `src/data/projects.ts`. Sustituye los cuatro placeholders. Cada proyecto admite
  portada, galería de capturas, disciplinas, tecnologías, enlaces (demo y GitHub) y un caso de
  estudio (contexto, objetivos, proceso, decisiones de UX/UI y solución). Las secciones vacías no
  se muestran. Guarda las imágenes en `src/assets/projects/` (preferiblemente en WebP) e impórtalas.
- **Presentación y Sobre mí** — `src/data/profile.ts` (`presentation`, `about`). Puedes añadir más
  campos, por ejemplo «Experiencia y formación».
- **Contacto** — `contactChannels` en `src/data/profile.ts`: añade `href` (`mailto:` o `https://`)
  y opcionalmente `display` con el texto visible.

Mientras un dato no exista, la web muestra «pendiente» en lugar de inventarlo.

## Interacciones principales

### Hero cinematográfico (`src/sections/Hero/`)

El paisaje está formado por capas independientes: estrellas y luna (SVG/CSS), montañas (WebP),
bosque lejano (SVG), bosque con río (WebP), bosque cercano (SVG), lobo (WebP) y primer plano (SVG).
Cada capa tiene dos envoltorios para que dos sistemas de movimiento no se pisen:

- `.scene-layer` (exterior) — lo mueve la **transición de scroll**;
- `.parallax-plane` (interior, con `data-depth`) — lo mueve el **parallax del cursor**.

`useCinematicHero` agrupa tres bloques de `gsap.matchMedia()`:

1. **Entrada** — las capas y el nombre aparecen al cargar.
2. **Parallax** — solo con ratón (`hover: hover` y `pointer: fine`). Cada plano se desplaza tantos
   píxeles como indica su `data-depth` (de 3 a 34), con `quickTo` para suavizarlo.
3. **Transición** — una única timeline con ScrollTrigger (`pin` + `scrub: 0.65`): el texto sube y
   desaparece, la luna se aparta, las estrellas se dispersan, las montañas y los bosques se separan,
   el lobo sale y aparece el título «Proyectos». Dura el 85 % del alto de la ventana (60 % en móvil)
   y después el scroll vuelve a ser normal. Al subir, la escena se recompone sola.

La navegación usa `scrollToSection`, que salta directamente a cada sección sin reproducir la
transición. Los enlaces compartidos con ancla (`/#contacto`) se resuelven después de crear el pin.

### Snap entre secciones (`src/hooks/useSectionSnap.ts`)

Un único ScrollTrigger sobre toda la página decide dónde asentar el scroll cuando el usuario se
detiene. Los puntos de reposo son el inicio, el final de la transición del hero y la posición de
cada sección (la misma que usa el menú, calculada en `sectionScrollTarget`): las secciones que
caben bajo el menú se centran y las más altas se alinean arriba.

- Entre dos puntos cercanos (menos de 1,2 pantallas, como la transición del hero o la
  presentación), el scroll se completa en la dirección en la que se movía el usuario.
- En tramos largos (la galería, un caso de estudio abierto) solo se ajusta si el usuario se detiene
  cerca de la siguiente sección en su dirección; leyendo a mitad de sección no se mueve nada.
- Se desactiva con movimiento reducido. Por eso `html` no usa `scroll-behavior: smooth`, que
  interfiere con el snap de GSAP.

### Galería expansible (`src/sections/Projects/ProjectGallery.tsx`)

- El estado de React (`selectedId`) es la única fuente de verdad. GSAP **Flip** solo anima entre los
  layouts que produce React.
- La tarjeta abierta se coloca primero en el DOM y ocupa toda la fila, de modo que el orden visual,
  el del DOM y el del tabulador coinciden.
- El botón es un disclosure accesible (`aria-expanded`, `aria-controls`); `Escape` cierra el
  detalle, el foco se queda en el botón y la tarjeta se mantiene a la vista al abrir y al cerrar.

### Movimiento reducido

Con `prefers-reduced-motion: reduce` no se crea ningún ScrollTrigger: no hay pin, parallax ni
animaciones de entrada, y la galería abre y cierra sin transición. Todo el contenido y la
navegación siguen disponibles. El contenido nunca depende de GSAP para ser visible.

## Accesibilidad y SEO

- `lang="es"`, un único `h1`, jerarquía h1 → h2 → h3 → h4, enlace «Saltar al contenido».
- Foco visible en todos los controles; el paisaje es decorativo (`aria-hidden`, `alt=""`).
- Enlaces externos con `rel="noopener noreferrer"` y aviso para lectores de pantalla.
- Título, descripción, Open Graph y Twitter Card en `index.html`.

## Pendiente

- Contenido real: proyectos, presentación, «Sobre mí» y enlaces de contacto.
- Imagen para compartir en redes (`og:image`): necesita una imagen de 1200 × 630 y el dominio
  definitivo, porque debe ser una URL absoluta.
- Datos estructurados `Person`: se pueden añadir cuando haya perfiles públicos reales (`sameAs`).
- Las fuentes (Manrope y Space Grotesk) se cargan desde Google Fonts, igual que en el diseño
  original. Si prefieres no depender de un servicio externo, se pueden alojar en el propio sitio.
