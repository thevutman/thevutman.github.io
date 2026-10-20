export type NavigationItem = {
  id: string;
  label: string;
};

export const navigation = [
  { id: "inicio", label: "Inicio" },
  { id: "proyectos", label: "Proyectos" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "contacto", label: "Contacto" },
] as const satisfies readonly NavigationItem[];

export type SectionId = (typeof navigation)[number]["id"];

export const sectionIds: readonly SectionId[] = navigation.map(({ id }) => id);
