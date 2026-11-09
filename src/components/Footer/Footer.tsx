import { useEffect, useRef } from "react";
import { SplitText } from "@/components/SplitText/SplitText";
import { navigation } from "@/data/navigation";
import { email, person, socials } from "@/data/profile";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";
import { goTo } from "@/lib/smoothScroll";
import "./Footer.css";

/**
 * Fixed under the page and uncovered as <main> scrolls away (main reserves
 * its height through --footer-h). The giant wordmark is sized to the exact
 * width and its letters stretch up as the footer comes into view.
 */
export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const main = document.querySelector("main");
    const wordmark = footer?.querySelector<HTMLElement>(".wordmark");
    if (!footer || !main || !wordmark) return;

    const size = () => {
      wordmark.style.fontSize = "100px";
      const gutter = parseFloat(getComputedStyle(footer).paddingLeft) * 2;
      wordmark.style.fontSize = `${(100 * (footer.clientWidth - gutter)) / wordmark.scrollWidth}px`;
      document.documentElement.style.setProperty("--footer-h", `${footer.offsetHeight}px`);
      ScrollTrigger.refresh();
    };
    const observer = new ResizeObserver(size);
    observer.observe(footer);
    void document.fonts.ready.then(size);

    if (prefersReducedMotion()) return () => observer.disconnect();
    const reveal = {
      trigger: main,
      start: "bottom bottom",
      scrub: true,
      invalidateOnRefresh: true,
    };
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".wordmark .ch",
        { scaleY: 0.1, yPercent: 40 },
        {
          scaleY: 1,
          yPercent: 0,
          ease: "none",
          stagger: 0.03,
          scrollTrigger: {
            ...reveal,
            end: () => `bottom ${window.innerHeight - footer.offsetHeight}px`,
          },
        },
      );
      gsap.from(".footer-cols a", {
        y: 60,
        opacity: 0,
        stagger: 0.06,
        ease: "none",
        scrollTrigger: {
          ...reveal,
          end: () => `bottom ${window.innerHeight - footer.offsetHeight * 0.4}px`,
        },
      });
    }, footer);
    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <footer ref={footerRef} className="footer" id="contacto">
      <div className="footer-cols">
        <div>
          <span className="mono">Navegación</span>
          {navigation.map(({ id, label }) => (
            <a key={id} className="roll" href={`#${id}`} onClick={(e) => goTo(e, id)}>
              <span>{label}</span>
              <span aria-hidden="true">{label}</span>
            </a>
          ))}
        </div>
        <div>
          <span className="mono">Redes</span>
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" data-cursor={s.cursor}>
              {s.label} ↗
            </a>
          ))}
        </div>
        <div>
          <span className="mono">Contacto</span>
          <a href={email.href} data-cursor={email.cursor}>
            {email.label} ↗
          </a>
        </div>
      </div>
      <div className="footer-legal mono">
        <span>
          ©{new Date().getFullYear()} {person.fullName}
        </span>
        <span>Hecho con React + GSAP</span>
      </div>
      <p className="wordmark">
        <SplitText text={person.fullName.toLowerCase()} dot="interactive" />
      </p>
    </footer>
  );
}
