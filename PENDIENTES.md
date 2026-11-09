# Pendientes del portafolio

Los seis proyectos ya están publicados en la sección de proyectos. Esto es lo que falta arreglar
más adelante.

## 04 · Beeper

- [ ] **Subir el código a GitHub.** Está en un PC de la universidad. Cuando esté, agregar
      `repositoryUrl` en `src/data/projects.ts`.
- [ ] **Menú en el celular.** En el sitio publicado los enlaces del menú (About, Features…) se ven
      encima del contenido en pantallas pequeñas. Por eso el caso de estudio solo tiene capturas de
      escritorio: cuando se arregle, agregar un par de capturas de celular (`beeper-m-*.webp`).
- [ ] Opcional: un dominio o un nombre más claro que `stellular-banoffee-6e723b.netlify.app`.

## 05 · Memoria Viva

- [ ] **Revivir el Supabase.** El sitio llama al proyecto `zajsvkztfaprgxioftbf`, que hoy no
      existe en DNS: la Cabina y las Historias muestran "No se pudieron cargar los chismes". Si ese
      proyecto no vuelve, crear uno nuevo y cambiar `utils/supabase/info.tsx` en el repo `taller6`.
- [ ] **Probar la respuesta de la cabina.** El front lee `approved`, `story` y `rejection_reason`,
      pero la función del repo responde `aprobado`, `historia` y `motivo_rechazo`. Si la función
      publicada es la del repo, un chisme aprobado se mostraría como rechazado.
- [ ] Confirmar cómo se escribe el nombre de Felipe (o Fellipe) en los créditos.
- [ ] Opcional: cambiar el título de la pestaña ("Diseñar libro interactivo") por "Memoria Viva".

## 02 · Valeria Velasco

- [ ] **Dominio y correo.** El sitio usa `valeriavelasco.com` (en index.html, sitemap, robots y el
      enlace de correo), que es de otra persona. Definir con Valeria el dominio y el correo reales.

## Sobre mí

- [ ] **SENA, Técnico en Sistemas.** Falta la fecha para agregarlo a "Experiencia y estudios"
      (`experience` en `src/data/profile.ts`). Está en LinkedIn.
- [ ] Revisar con LinkedIn los demás estudios y certificados, y sus fechas exactas.
- [ ] Opcional: mostrar el inglés (B1) en algún lugar de la sección.

## General

- [ ] Las capturas de cada caso de estudio están en `src/assets/projects/screens/`. Si un sitio
      cambia, se pueden repetir.
