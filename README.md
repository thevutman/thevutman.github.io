# Santiago Velasco — Portafolio Full Stack

Portafolio personal construido con **Vite + React 19 + TypeScript**, **Tailwind CSS v4**, **GSAP**
(ScrollTrigger, Draggable e Inertia) y **Lenis** para el scroll suave. El diseño nació de las
maquetas en `design/directions/` (la elegida es `e-animado.html`).

Publicado en https://thevutman.github.io (GitHub Actions publica `main` en GitHub Pages).

## Comandos

```bash
npm install       # instala dependencias
npm run dev       # servidor de desarrollo en http://localhost:5173
npm run build     # comprobación de tipos + build de producción en dist/
npm run preview   # sirve dist/ en local
npm run lint      # ESLint
npm run format    # Prettier
```

Con `SITE_URL` definida, el build añade canonical, `og:url` y `sitemap.xml` (ver `vite.config.ts`).

## Estructura

```
src/
├── components/   Cursor, Loader, Navbar, Footer, SplitText
├── data/         profile.ts, projects.ts, navigation.ts   ← contenido editable
├── lib/          gsap.ts (plugins), smoothScroll.ts (Lenis), accent.ts (color de acento)
├── sections/     Hero, Projects (+ ProjectCase), About
├── styles/       tokens.css (colores, tipografías, capas), index.css (base)
├── App.tsx
└── main.tsx
```

Cada componente tiene su CSS al lado dentro de `@layer components`. Ojo con los nombres de clase:
no uses nombres que Tailwind genera como utilidades (`block`, `outline`, `hidden`, `static`…).

## Cómo añadir contenido

Todo vive en `src/data/` y la interfaz se adapta sola:

- **Hero y Sobre mí** — `profile.ts`: `person`, `skills` (chips del hero y la marquesina),
  `about` (frase, números y stack) y `experience` (la línea de tiempo, el más reciente primero;
  `current: true` deja el punto pulsando).
- **Proyectos** — `projects.ts`. Cada proyecto necesita `name`, `type`, `year` y `tone` (color de la
  tarjeta y del caso de estudio). Opcionales: `summary`, `role`, `technologies`, `cover`,
  `caseStudy` (contexto, proceso, resultado), `liveUrl` y `repositoryUrl`. Lo que falta no se
  muestra. Las imágenes van en `src/assets/projects/` (WebP).
- **Contacto** — `socials` y `email` en `profile.ts`.

## Interacciones

- **Loader**: el nombre entra estirado, un contador llega a 100 y la pantalla se abre en dos.
- **Hero**: las letras entran estirándose y se alargan con el scroll; los skills flotan, siguen al
  mouse en capas y se pueden lanzar (Draggable + inercia); la marquesina acelera e inclina según la
  velocidad del scroll.
- **El punto de la i** es un círculo aparte en el color de acento (`--accent`, naranja). Cae al
  cargar, salta cada pocos segundos y, al tocarlo, cambia el acento de todo el sitio
  (`lib/accent.ts`). Tiene tres capas para que el estiramiento, el salto y el toque no se pisen.
- **Proyectos**: la página pasa a oscuro (GSAP anima las variables `--bg`, `--fg`…); una tarjeta del
  color del proyecto sigue al cursor y rueda al proyecto activo; el caso de estudio se abre como
  tinta desde el punto del clic y se cierra con el botón o con Escape.
- **Sobre mí**: la frase se ilumina palabra por palabra, los números cuentan y la experiencia es una
  línea de tiempo cuya punta queda siempre al 60 % de la pantalla; cada trabajo se enciende al
  alcanzarlo.
- **Footer**: está fijo debajo y se descubre al final; el nombre gigante se estira al aparecer.
- **Movimiento reducido**: sin loader, sin scroll suave ni animaciones; todo el contenido visible.

## Pendiente

- Contenido real: experiencia, números de «Sobre mí» y proyectos (ahora son de ejemplo).
- Imagen para compartir (`og:image`, 1200 × 630).
