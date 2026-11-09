import { useEffect, useRef } from "react";
import { gsap, hasFinePointer } from "@/lib/gsap";
import "./Cursor.css";

/**
 * Dot + trailing ring. Over any element with data-cursor the ring grows and
 * shows that word ("Ver", "Arrastra", "Toca"…). Uses event delegation, so
 * elements rendered later work too.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current,
      ring = ringRef.current,
      label = labelRef.current;
    if (!dot || !ring || !label || !hasFinePointer()) return;

    const dx = gsap.quickTo(dot, "x", { duration: 0.15 });
    const dy = gsap.quickTo(dot, "y", { duration: 0.15 });
    const rx = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3" });
    let active: Element | null = null;

    const onMove = (event: PointerEvent) => {
      if (!dot.classList.contains("is-visible")) {
        gsap.set([dot, ring], { x: event.clientX, y: event.clientY });
        dot.classList.add("is-visible");
        ring.classList.add("is-visible");
      }
      dx(event.clientX);
      dy(event.clientY);
      rx(event.clientX);
      ry(event.clientY);
    };
    const onOver = (event: PointerEvent) => {
      const target = (event.target as Element).closest("[data-cursor]");
      if (target === active) return;
      active = target;
      if (target) {
        label.textContent = target.getAttribute("data-cursor");
        gsap.to(ring, {
          scale: 2,
          backgroundColor: "rgba(27,26,24,1)",
          borderColor: "rgba(27,26,24,0)",
          duration: 0.4,
        });
        gsap.to(label, { opacity: 1, scale: 0.5, duration: 0.3 });
        gsap.to(dot, { scale: 0, duration: 0.3 });
      } else {
        gsap.to(ring, {
          scale: 1,
          backgroundColor: "rgba(27,26,24,0)",
          borderColor: "rgba(27,26,24,1)",
          duration: 0.4,
        });
        gsap.to(label, { opacity: 0, scale: 0.4, duration: 0.2 });
        gsap.to(dot, { scale: 1, duration: 0.3 });
      }
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span ref={labelRef} />
      </div>
    </>
  );
}
