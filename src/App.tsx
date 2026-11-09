import { useCallback, useEffect, useRef, useState } from "react";
import { Cursor } from "@/components/Cursor/Cursor";
import { Footer } from "@/components/Footer/Footer";
import { Loader } from "@/components/Loader/Loader";
import { Navbar } from "@/components/Navbar/Navbar";
import { lockScroll, scrollToSection, startSmoothScroll } from "@/lib/smoothScroll";
import { About } from "@/sections/About/About";
import { Hero } from "@/sections/Hero/Hero";
import { Projects } from "@/sections/Projects/Projects";

export function App() {
  const [ready, setReady] = useState(false);
  // With reduced motion the loader finishes before this effect runs.
  const loaded = useRef(false);

  useEffect(() => {
    const stop = startSmoothScroll();
    lockScroll(!loaded.current);
    return () => {
      stop();
      lockScroll(false);
    };
  }, []);

  // The loader is done: scrolling unlocks and a shared link such as
  // /#contacto is honoured now that the page is laid out.
  const onLoaded = useCallback(() => {
    loaded.current = true;
    lockScroll(false);
    setReady(true);
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) requestAnimationFrame(() => scrollToSection(id));
  }, []);

  return (
    <>
      <Cursor />
      <Loader onDone={onLoaded} />
      <Navbar />
      <main>
        <Hero ready={ready} />
        <Projects />
        <About />
      </main>
      <Footer />
    </>
  );
}
