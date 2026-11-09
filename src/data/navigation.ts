export type NavigationItem = {
  id: string;
  label: string;
};

/** Links in the navbar and the footer. Contact lives in the "Hablemos" button. */
export const navigation = [
  { id: "proyectos", label: "Proyectos" },
  { id: "sobre-mi", label: "Sobre mí" },
] as const satisfies readonly NavigationItem[];
