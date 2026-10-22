import { Fragment } from "react";
import "./TitleCard.css";

type TitleCardProps = {
  /** Section index shown above the title, e.g. "02 / PORTAFOLIO". */
  eyebrow: string;
  title: string;
};

/**
 * Oversized section name that opens a stacked panel before its content (see
 * titleCardScenes). Purely decorative: the section keeps its real heading.
 * Letters are separate spans so they can light up one by one.
 */
export function TitleCard({ eyebrow, title }: TitleCardProps) {
  return (
    <div className="title-card" aria-hidden="true">
      <span className="section-number">{eyebrow}</span>
      <p className="title-card-text">
        {title.split(" ").map((word, wordIndex, words) => {
          const last = wordIndex === words.length - 1;
          return (
            // Lines may only break at the spaces between words, never inside one.
            <Fragment key={`${wordIndex}-${word}`}>
              <span className="title-card-word">
                {[...word].map((char, index) => (
                  // Letters repeat, so the position is part of the key.
                  <span key={`${index}-${char}`} className="title-card-char">
                    {char}
                  </span>
                ))}
                {last && <span className="title-card-char title-card-mark">.</span>}
              </span>
              {!last && " "}
            </Fragment>
          );
        })}
      </p>
    </div>
  );
}
