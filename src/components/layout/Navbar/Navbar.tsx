import { navigation, sectionIds } from "@/data/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { handleSectionLink } from "@/lib/scrollToSection";
import "./Navbar.css";

export function Navbar() {
  const { active, scrolled } = useActiveSection(sectionIds);

  return (
    <>
      <a
        className="skip-link"
        href="#identidad"
        onClick={(event) => handleSectionLink(event, "identidad")}
      >
        Saltar al contenido
      </a>
      <header className={`portfolio-header${scrolled ? " header-scrolled" : ""}`}>
        <a
          href="#inicio"
          className="monogram"
          aria-label="Santiago Velasco, inicio"
          onClick={(event) => handleSectionLink(event, "inicio")}
        >
          sv<span aria-hidden="true">.</span>
        </a>
        <span className="header-label">PORTAFOLIO — UX/UI</span>
        <nav aria-label="Navegación principal">
          <ul className="nav-list">
            {navigation.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`ui-control nav-link${active === id ? " active" : ""}`}
                  aria-current={active === id ? "location" : undefined}
                  onClick={(event) => handleSectionLink(event, id)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
