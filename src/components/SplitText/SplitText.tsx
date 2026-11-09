import { cycleAccent } from "@/lib/accent";
import "./SplitText.css";

type SplitTextProps = {
  text: string;
  className?: string;
  /**
   * Draws the first "i" dotless and adds its dot as a separate accent circle
   * that can move on its own. "interactive" also makes the dot swap the
   * site's accent colour when tapped.
   */
  dot?: "static" | "interactive";
};

/**
 * Splits text into characters (.ch) so GSAP can move and stretch each one.
 * Screen readers get the plain text instead of the letters.
 */
export function SplitText({ text, className, dot }: SplitTextProps) {
  const dotAt = dot ? text.indexOf("i") : -1;
  // Words stay whole (nowrap) so long text can still wrap between them.
  const words: { word: string; start: number }[] = [];
  for (let start = 0; start <= text.length;) {
    const end = text.indexOf(" ", start);
    const stop = end === -1 ? text.length : end;
    words.push({ word: text.slice(start, stop), start });
    start = stop + 1;
  }

  return (
    <span className={className ? `split ${className}` : "split"}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map(({ word, start }, w) => (
          <span key={start}>
            {w > 0 && " "}
            <span className="word">
              {[...word].map((char, i) =>
                start + i === dotAt ? (
                  <span key={i} className="ch ch-i">
                    ı
                    <span
                      className={
                        dot === "interactive" ? "tittle-wrap is-interactive" : "tittle-wrap"
                      }
                      data-cursor={dot === "interactive" ? "Toca" : undefined}
                      onClick={
                        dot === "interactive"
                          ? (event) => cycleAccent(event.currentTarget)
                          : undefined
                      }
                    >
                      <span className="tittle-pop">
                        <span className="tittle" />
                      </span>
                    </span>
                  </span>
                ) : (
                  <span key={i} className="ch">
                    {char}
                  </span>
                ),
              )}
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}
