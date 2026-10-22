import { useEffect } from "react";
import { Footer } from "@/components/layout/Footer/Footer";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { StackPanel } from "@/components/layout/StackPanel/StackPanel";
import { projects } from "@/data/projects";
import { useStackPanels } from "@/hooks/useStackPanels";
import { scrollToSection } from "@/lib/scrollToSection";
import { About } from "@/sections/About/About";
import { Contact } from "@/sections/Contact/Contact";
import { Hero } from "@/sections/Hero/Hero";
import { Projects } from "@/sections/Projects/Projects";

export function App() {
  useStackPanels();

  // A shared link such as /#contacto is resolved once the panels are laid out,
  // otherwise the browser's early jump lands at the wrong offset.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const frame = requestAnimationFrame(() => scrollToSection(id));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {/* The hero breaks apart while the projects panel slides over it. */}
        <StackPanel>
          <Hero />
        </StackPanel>
        {/* Sections open with a title card (one step), then their content.
            Projects add one step per extra project in the showcase. */}
        <StackPanel steps={Math.max(projects.length, 1)}>
          <Projects />
        </StackPanel>
        <StackPanel steps={1} mobileSteps={2}>
          <About />
        </StackPanel>
        {/* The footer closes the last screen inside its panel. */}
        <StackPanel steps={1}>
          <Contact />
          <Footer />
        </StackPanel>
      </main>
    </>
  );
}
