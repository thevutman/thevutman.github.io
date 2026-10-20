import { useEffect } from "react";
import { Footer } from "@/components/layout/Footer/Footer";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { useSectionSnap } from "@/hooks/useSectionSnap";
import { scrollToSection } from "@/lib/scrollToSection";
import { About } from "@/sections/About/About";
import { Contact } from "@/sections/Contact/Contact";
import { Hero } from "@/sections/Hero/Hero";
import { Introduction } from "@/sections/Introduction/Introduction";
import { Projects } from "@/sections/Projects/Projects";

export function App() {
  useSectionSnap();

  // A shared link such as /#contacto is resolved after the hero pin exists,
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
        <Hero />
        <Introduction />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
