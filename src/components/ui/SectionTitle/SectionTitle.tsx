import type { ReactNode } from "react";
import "./SectionTitle.css";

type SectionTitleProps = {
  /** Section index shown above the title, e.g. "02 / PORTAFOLIO". */
  eyebrow: string;
  title: string;
  /** id for the heading so the section can reference it with aria-labelledby. */
  id: string;
  /** "display" is the oversized closing title used by the contact section. */
  size?: "default" | "display";
  /** Decorative element aligned to the right of the heading. */
  aside?: ReactNode;
};

export function SectionTitle({ eyebrow, title, id, size = "default", aside }: SectionTitleProps) {
  // The closing mark is the muted accent; titles without one get a period.
  const hasMark = /[.?!]$/.test(title);
  const text = hasMark ? title.slice(0, -1) : title;
  const mark = hasMark ? title.slice(-1) : ".";

  return (
    <div className={`section-heading section-heading--${size}`}>
      <div>
        <span className="section-number">{eyebrow}</span>
        <h2 id={id}>
          {text}
          <span className="text-muted-foreground">{mark}</span>
        </h2>
      </div>
      {aside}
    </div>
  );
}
