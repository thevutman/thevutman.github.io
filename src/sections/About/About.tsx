import { useLayoutEffect, useRef } from "react";
import { SplitText } from "@/components/SplitText/SplitText";
import { about, experience, stats } from "@/data/profile";
import { gsap, lettersIn, prefersReducedMotion } from "@/lib/gsap";
import "./About.css";

/**
 * Statement that lights up word by word, counting stats, the experience
 * timeline and the stack.
 */
export function About() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".statement .w",
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: ".statement",
            start: "top 80%",
            end: "bottom 45%",
            scrub: true,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const counter = { value: 0 };
        el.textContent = "0+";
        gsap.to(counter, {
          value: Number(el.dataset.count),
          duration: 2,
          ease: "power3.out",
          onUpdate: () => {
            el.textContent = `${Math.round(counter.value)}+`;
          },
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
        });
      });
      gsap.from(".stat", {
        y: 120,
        rotation: (i: number) => [-4, 3, -2][i % 3] ?? 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".stats", start: "top 85%" },
      });

      // Timeline: the accent line draws as you scroll. Its head always sits at
      // 60% of the screen and each job lights up the moment the head reaches it.
      const track = root.querySelector<HTMLElement>(".tl-track");
      if (track) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: track,
              start: "top 60%",
              end: "bottom 60%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          })
          .to(".tl-fill", { scaleY: 1, ease: "none" }, 0)
          .to(".tl-head", { y: () => track.offsetHeight, ease: "none" }, 0);
        gsap.from(".tl-head", {
          scale: 0,
          duration: 0.8,
          ease: "back.out(3)",
          scrollTrigger: {
            trigger: track,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      }
      gsap.utils.toArray<HTMLElement>(".tl-item").forEach((item) => {
        const node = item.querySelector(".tl-node");
        gsap
          .timeline({
            scrollTrigger: {
              trigger: node,
              start: "center 60%",
              toggleActions: "play none none reverse",
              toggleClass: { targets: node ?? [], className: "is-on" },
            },
          })
          .fromTo(
            node,
            { scale: 0.5 },
            { scale: 1.25, duration: 1, ease: "elastic.out(1, .35)" },
            0,
          )
          .from(
            item.querySelectorAll(".tl-year .ch"),
            { ...lettersIn, duration: 1, stagger: 0.05 },
            0,
          )
          .from(
            item.querySelector(".tl-range"),
            { yPercent: 100, opacity: 0, duration: 0.8, ease: "expo.out" },
            0.15,
          )
          .from(
            item.querySelectorAll(".tl-role .ch"),
            { ...lettersIn, duration: 1, stagger: 0.012 },
            0.05,
          )
          .from(
            item.querySelector(".tl-body p"),
            { y: 24, opacity: 0, duration: 0.9, ease: "expo.out" },
            0.25,
          )
          .from(
            item.querySelectorAll(".tl-tags li"),
            {
              scale: 0,
              rotation: () => gsap.utils.random(-20, 20),
              duration: 0.9,
              ease: "elastic.out(1, .5)",
              stagger: 0.06,
            },
            0.35,
          )
          .from(
            item.querySelector(".tl-place"),
            { x: 30, opacity: 0, duration: 0.8, ease: "expo.out" },
            0.3,
          );
      });

      gsap.from(".stack li", {
        scale: 0,
        duration: 0.9,
        ease: "elastic.out(1, .5)",
        stagger: { each: 0.05, from: "random" },
        scrollTrigger: { trigger: ".stack", start: "top 85%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="about" id="sobre-mi" aria-labelledby="about-label">
      <span className="mono muted" id="about-label">
        (02) Sobre mí
      </span>
      <p className="statement">
        {about.statement.split(" ").map((word, i) => (
          <span key={i} className="w">
            {word}{" "}
          </span>
        ))}
      </p>

      <div className="stats">
        {stats.map((stat) => (
          <div key={stat.label} className="stat">
            <strong data-count={stat.value}>{stat.value}+</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="about-block">
        <h3 className="mono muted block-label">Experiencia y estudios</h3>
        <ol className="timeline">
          <li className="tl-track" aria-hidden="true">
            <span className="tl-fill" />
            <span className="tl-head" />
          </li>
          {experience.map((job) => (
            <li key={job.range} className={job.current ? "tl-item is-current" : "tl-item"}>
              <span className="tl-node" aria-hidden="true" />
              <div className="tl-year">
                <span className="line-mask">
                  <SplitText text={job.year} className="tl-yr" />
                </span>
                <span className="line-mask">
                  <span className="tl-range mono muted">{job.range}</span>
                </span>
              </div>
              <div className="tl-body">
                <h4 className="tl-role">
                  <span className="line-mask">
                    <SplitText text={job.role} />
                  </span>
                </h4>
                <p>{job.description}</p>
                <ul className="tl-tags">
                  {job.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
              <span className="tl-place mono muted">{job.place}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="about-block">
        <h3 className="mono muted block-label">Stack</h3>
        <ul className="stack">
          {about.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
