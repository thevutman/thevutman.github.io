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
import { Introduction } from "@/sections/Introduction/Introduction";
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
        {/* The hero breaks apart to reveal the introduction in the same panel. */}
        <StackPanel steps={1}>
          <Hero />
          <Introduction />
        </StackPanel>
        {/* One resting point per project as the gallery slides sideways. */}
        <StackPanel steps={Math.max(projects.length - 1, 0)}>
          <Projects />
        </StackPanel>
        <StackPanel steps={1} mobileSteps={2}>
          <About />
        </StackPanel>
        <StackPanel>
          <Contact />
        </StackPanel>
      </main>
      <Footer />
    </>
  );
}
