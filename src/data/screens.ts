/**
 * Screenshots of each live project, in src/assets/projects/screens/. A file whose name has
 * "-m-" is a phone capture (390×844 at 2x); the rest are desktop captures at 1440×900.
 */
const files = import.meta.glob<string>("/src/assets/projects/screens/*.webp", {
  eager: true,
  import: "default",
});

export type Screen = {
  src: string;
  alt: string;
  device: "desktop" | "mobile";
  width: number;
  height: number;
};

/** `[file name without extension, alt text]` → a screen ready to render. */
export function screens(list: [name: string, alt: string][]): Screen[] {
  return list.map(([name, alt]) => {
    const src = files[`/src/assets/projects/screens/${name}.webp`];
    if (!src) throw new Error(`Falta la captura ${name}.webp`);
    const mobile = name.includes("-m-");
    return mobile
      ? { src, alt, device: "mobile", width: 780, height: 1688 }
      : { src, alt, device: "desktop", width: 1440, height: 900 };
  });
}
