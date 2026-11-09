import { useEffect, useLayoutEffect, useRef, type CSSProperties } from "react";
import { SplitText } from "@/components/SplitText/SplitText";
import { person, skills } from "@/data/profile";
import { Draggable, gsap, hasFinePointer, lettersIn, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";
import "./Hero.css";

/**
 * Giant name with the skills floating around it. The chips drift on their
 * own, follow the mouse in layers and can be thrown around (Draggable +
 * inertia). On scroll the letters stretch upwards and the chips scatter; the
 * marquee speeds up and skews with scroll velocity.
 *
 * The intro is built hidden on mount and plays once `ready` turns true (when
 * the loader opens).
 */
export function Hero({ ready }: { ready: boolean }) {
  const rootRef = useRef<HTMLElement>(null);
  const introRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    let resetSkew: (() => void) | null = null;
    const ctx = gsap.context(() => {
      // Every few seconds the dot of the i hops, like it can't sit still.
      const hop = gsap
        .timeline({ paused: true, repeat: -1, repeatDelay: 3.5 })
        .to(".hero-name .tittle", { scaleX: 1.3, scaleY: 0.7, duration: 0.12, ease: "power2.out" })
        .to(".hero-name .tittle", {
          y: "-1.1em",
          scaleX: 0.85,
          scaleY: 1.2,
          duration: 0.35,
          ease: "power2.out",
        })
        .to(".hero-name .tittle", { y: 0, scaleX: 1, scaleY: 1, duration: 0.35, ease: "power2.in" })
        .to(".hero-name .tittle", { scaleX: 1.4, scaleY: 0.6, duration: 0.1, ease: "power2.out" })
        .to(".hero-name .tittle", {
          scaleX: 1,
          scaleY: 1,
          duration: 0.7,
          ease: "elastic.out(1.2, .3)",
        });

      introRef.current = gsap
        .timeline({ paused: true, defaults: { ease: "expo.out" } })
        .from(".hero-name .ch", { ...lettersIn, duration: 1.4, stagger: 0.035 })
        .from(
          ".chip-wrap",
          {
            scale: 0,
            rotation: () => gsap.utils.random(-40, 40),
            duration: 1.2,
            ease: "elastic.out(1, .55)",
            stagger: { each: 0.06, from: "random" },
          },
          0.35,
        )
        .from(".hero-reveal", { y: 30, opacity: 0, duration: 1, stagger: 0.1 }, 0.6)
        // The accent marker draws itself under the key words once the message is in.
        .from(".hero-mark", { "--mark": 0, duration: 0.9, ease: "expo.inOut", stagger: 0.25 }, 1.2)
        .from(".marquee", { yPercent: 100, duration: 1 }, 0.6)
        // The navbar lives outside this section, so it is passed as elements, not a scoped selector.
        .from(
          document.querySelectorAll(".nav > *"),
          { y: -30, opacity: 0, duration: 1, stagger: 0.1 },
          0.4,
        )
        // The dot drops in last, squashes on landing and settles.
        .fromTo(
          ".hero-name .tittle",
          { y: "-3.2em", scale: 0 },
          { y: 0, scale: 1, duration: 0.7, ease: "power3.in" },
          1.05,
        )
        .to(".hero-name .tittle", { scaleX: 1.5, scaleY: 0.55, duration: 0.12, ease: "power2.out" })
        .to(".hero-name .tittle", {
          scaleX: 1,
          scaleY: 1,
          duration: 0.9,
          ease: "elastic.out(1.2, .3)",
        })
        .add(() => void hop.play(), "+=1.5");

      // On scroll the name stretches tall and the skills scatter outwards.
      gsap
        .timeline({
          scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
        })
        .to(
          ".hero-name .ch",
          { scaleY: 1.9, yPercent: (i: number) => -20 - (i % 3) * 18, ease: "none", stagger: 0.01 },
          0,
        )
        // The dot stays round while its letter stretches.
        .to(".hero-name .tittle-wrap", { scaleY: 1 / 1.9, ease: "none" }, 0)
        .to(".skills", { scale: 1.35, opacity: 0, ease: "none" }, 0)
        // The message leaves in the first third of the scroll, before the chips fly over it.
        .to(".hero-sub, .drag-hint", { opacity: 0, y: -40, ease: "power1.in", duration: 0.3 }, 0);

      // Marquee: speed and skew follow how fast you scroll.
      const track = root.querySelector(".marquee-track");
      const marquee = gsap.to(track, { xPercent: -50, duration: 24, ease: "none", repeat: -1 });
      const skew = gsap.quickTo(track, "skewX", { duration: 0.4 });
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate(self) {
          const velocity = self.getVelocity();
          const direction = self.direction || 1;
          gsap.to(marquee, {
            timeScale: direction * (1 + Math.min(Math.abs(velocity) / 300, 6)),
            duration: 0.3,
            overwrite: true,
          });
          gsap.to(marquee, { timeScale: direction, duration: 1.2, delay: 0.3 });
          skew(gsap.utils.clamp(-14, 14, velocity / -120));
        },
      });
      resetSkew = () => skew(0);
      ScrollTrigger.addEventListener("scrollEnd", resetSkew);
    }, root);
    return () => {
      if (resetSkew) ScrollTrigger.removeEventListener("scrollEnd", resetSkew);
      ctx.revert();
      introRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (ready) introRef.current?.play();
  }, [ready]);

  // Floating, draggable chips and mouse parallax.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !ready) return;
    const still = prefersReducedMotion();
    const ctx = gsap.context(() => {
      if (!still) {
        gsap.utils.toArray<HTMLElement>(".chip-float").forEach((float) => {
          gsap.to(float, {
            y: () => gsap.utils.random(-18, 18),
            x: () => gsap.utils.random(-10, 10),
            rotation: () => gsap.utils.random(-6, 6),
            duration: () => gsap.utils.random(2.2, 4),
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            repeatRefresh: true,
          });
        });
      }
    }, root);
    const draggables = Draggable.create(root.querySelectorAll(".chip"), {
      bounds: root,
      inertia: true,
      edgeResistance: 0.65,
      onPress() {
        gsap.to(this.target, { scale: 1.12, rotation: gsap.utils.random(-8, 8), duration: 0.3 });
      },
      onRelease() {
        gsap.to(this.target, { scale: 1, rotation: 0, duration: 0.8, ease: "elastic.out(1, .4)" });
      },
    });

    let onMove: ((event: PointerEvent) => void) | null = null;
    if (!still && hasFinePointer()) {
      const layers = gsap.utils.toArray<HTMLElement>(".chip-wrap", root).map((wrap, i) => ({
        depth: 12 + (i % 4) * 10,
        x: gsap.quickTo(wrap, "x", { duration: 1.2, ease: "power3" }),
        y: gsap.quickTo(wrap, "y", { duration: 1.2, ease: "power3" }),
      }));
      onMove = (event) => {
        const nx = event.clientX / window.innerWidth - 0.5,
          ny = event.clientY / window.innerHeight - 0.5;
        layers.forEach((layer) => {
          layer.x(nx * layer.depth);
          layer.y(ny * layer.depth);
        });
      };
      window.addEventListener("pointermove", onMove);
    }
    return () => {
      ctx.revert();
      draggables.forEach((d) => d.kill());
      if (onMove) window.removeEventListener("pointermove", onMove);
    };
  }, [ready]);

  const marquee = skills.map((s) => (
    <span key={s.name}>
      {s.name} <b>✦</b>{" "}
    </span>
  ));

  return (
    <section ref={rootRef} className="hero" id="inicio">
      <h1 className="hero-name">
        <span className="line-mask">
          <SplitText text={person.firstName} dot="interactive" />
        </span>
        <span className="line-mask">
          <SplitText text={person.lastName} />
        </span>
      </h1>
      <p className="hero-sub hero-reveal">
        {person.tagline.map((line, i) => (
          <span key={line} className="hero-sub-line">
            {line.split(/\*(.+?)\*/).map((part, j) =>
              j % 2 ? (
                <mark key={j} className="hero-mark">
                  {part}
                </mark>
              ) : (
                part
              ),
            )}
            {i < person.tagline.length - 1 ? <br /> : null}
          </span>
        ))}
      </p>
      <span className="drag-hint mono muted hero-reveal" aria-hidden="true">
        ↖ Arrastra mis skills
      </span>
      <ul className="skills" aria-label="Skills">
        {skills.map((s) => (
          <li
            key={s.name}
            className="chip-wrap"
            style={{ left: `${s.x}%`, "--y": `${s.y}%`, "--my": `${s.my ?? s.y}%`, "--x": s.x } as CSSProperties}
          >
            <div className="chip-float">
              <div
                className={["chip", s.big && "big", s.color ? `chip-${s.color}` : "is-outline"]
                  .filter(Boolean)
                  .join(" ")}
                data-cursor="Arrastra"
              >
                <i />
                {s.name}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span className="marquee-group">{marquee}</span>
          <span className="marquee-group">{marquee}</span>
        </div>
      </div>
    </section>
  );
}
