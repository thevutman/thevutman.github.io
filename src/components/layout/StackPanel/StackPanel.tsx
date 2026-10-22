import type { CSSProperties, ReactNode } from "react";
import "./StackPanel.css";

type StackPanelProps = {
  children: ReactNode;
  /** Extra viewports the panel stays in place to play its own scenes. */
  steps?: number;
  /** Same as `steps` for phones, where content is shown in more stages. */
  mobileSteps?: number;
};

/**
 * One full-screen chapter of the page. The panel sticks to the viewport for
 * `steps` extra screens, then the next panel slides up and covers it. Every
 * resting point gets an invisible marker that the step scrolling reads.
 *
 * Layout lives in StackPanel.css; motion in useStackPanels and each section.
 * Outside stack mode (reduced motion, short screens) it is a plain wrapper.
 */
export function StackPanel({ children, steps = 0, mobileSteps = steps }: StackPanelProps) {
  const style = { "--steps-desktop": steps, "--steps-mobile": mobileSteps } as CSSProperties;
  const markers = Math.max(steps, mobileSteps) + 1;

  return (
    <div className="stack-track" style={style}>
      {Array.from({ length: markers }, (_, i) => (
        <span
          key={i}
          className="stack-snap"
          style={{ "--i": i } as CSSProperties}
          data-only={i > steps ? "mobile" : i > mobileSteps ? "desktop" : undefined}
          aria-hidden="true"
        />
      ))}
      <div className="stack-panel">
        <div className="stack-content">{children}</div>
      </div>
    </div>
  );
}
