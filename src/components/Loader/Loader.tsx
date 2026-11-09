import { useLayoutEffect, useRef, useState } from "react";
import { SplitText } from "@/components/SplitText/SplitText";
import { person } from "@/data/profile";
import { gsap, lettersIn, prefersReducedMotion } from "@/lib/gsap";
import "./Loader.css";

const messages = ["Compilando ideas…", "Revisando cada detalle…", "Listo."];

/**
 * Opening screen: the name rises in, a counter runs to 100 and the screen
 * splits open in two halves. Calls onDone as the halves start to part, so the
 * hero intro plays underneath them.
 */
export function Loader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  // With reduced motion there is no loader at all.
  const [gone, setGone] = useState(prefersReducedMotion);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      onDone();
      return;
    }
    const count = root.querySelector<HTMLElement>(".loader-count");
    const line = root.querySelector<HTMLElement>(".loader-line");
    const counter = { value: 0 };
    const ctx = gsap.context(() => {
      gsap
        .timeline({ onComplete: () => setGone(true) })
        .from(".loader-name .ch", { ...lettersIn, duration: 0.9, stagger: 0.04 })
        .to(
          counter,
          {
            value: 100,
            duration: 2,
            ease: "power2.inOut",
            onUpdate: () => {
              if (count) count.textContent = String(Math.round(counter.value));
              if (line)
                line.textContent =
                  messages[counter.value < 40 ? 0 : counter.value < 85 ? 1 : 2] ?? "";
            },
          },
          0.2,
        )
        .to(".loader-inner", { opacity: 0, y: -40, duration: 0.5, ease: "power2.in" })
        .add(onDone, "-=0.1")
        .to(
          ".loader-half.top",
          { yPercent: -100, scaleY: 1.3, duration: 1.1, ease: "expo.inOut" },
          "<",
        )
        .to(
          ".loader-half.bottom",
          { yPercent: 100, scaleY: 1.3, duration: 1.1, ease: "expo.inOut" },
          "<",
        );
    }, root);
    return () => ctx.revert();
    // onDone is stable (a state setter wrapper from App); the loader runs once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  return (
    <div ref={rootRef} className="loader" aria-hidden="true">
      <div className="loader-half top" />
      <div className="loader-half bottom" />
      <div className="loader-inner">
        <p className="loader-name">
          <span className="line-mask">
            <SplitText text={person.fullName.toLowerCase()} dot="static" />
          </span>
        </p>
        <span className="loader-line mono">{messages[0]}</span>
        <span className="loader-count">0</span>
      </div>
    </div>
  );
}
