import { ArrowUpRight } from "lucide-react";
import { IconLink } from "@/components/ui/IconLink/IconLink";
import { signature } from "@/data/profile";
import { handleSectionLink } from "@/lib/scrollToSection";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="portfolio-footer">
      <p className="footer-signature">{signature}</p>
      <IconLink
        href="#inicio"
        icon={ArrowUpRight}
        className="footer-top-link"
        onClick={(event) => handleSectionLink(event, "inicio")}
      >
        Volver al inicio
      </IconLink>
    </footer>
  );
}
