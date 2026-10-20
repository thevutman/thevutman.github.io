import forestRiver from "@/assets/hero/forest-river.webp";
import mountains from "@/assets/hero/mountains.webp";
import wolf from "@/assets/hero/wolf.webp";

type Tree = { x: number; height: number; width: number };

// Deterministic tree rows: computed once at module load, never per render.
function createForest(near: boolean): Tree[] {
  return Array.from({ length: near ? 32 : 64 }, (_, i) => {
    const x = i * (near ? 62 : 31) - 30;
    const distance = Math.abs(x - 960) / 960;
    const height = (near ? 130 : 85) + distance * (near ? 190 : 130) + ((i * 47) % 90);
    return { x, height, width: height * 0.29 };
  });
}

const forests = { far: createForest(false), near: createForest(true) };

const stars = Array.from({ length: 68 }, (_, i) => ({
  cx: (i * 233 + 97) % 1600,
  cy: (i * 137 + 41) % 640,
  r: i % 9 === 0 ? 1.7 : 0.8,
  opacity: 0.2 + (i % 4) * 0.15,
}));

function treePath({ height: h, width: w }: Tree) {
  return `M0 0 L${w * 0.29} ${h * 0.29} L${w * 0.15} ${h * 0.29} L${w * 0.44} ${h * 0.52} L${w * 0.23} ${h * 0.52} L${w * 0.58} ${h * 0.78} L${w * 0.1} ${h * 0.75} L${w * 0.08} ${h} L${-w * 0.08} ${h} L${-w * 0.1} ${h * 0.75} L${-w * 0.58} ${h * 0.78} L${-w * 0.23} ${h * 0.52} L${-w * 0.44} ${h * 0.52} L${-w * 0.15} ${h * 0.29} L${-w * 0.29} ${h * 0.29} Z`;
}

function Forest({ variant }: { variant: keyof typeof forests }) {
  return (
    <svg viewBox="0 0 1920 600" preserveAspectRatio="none" className={`forest forest-${variant}`}>
      {forests[variant].map((tree) => (
        <path
          key={tree.x}
          transform={`translate(${tree.x} ${570 - tree.height})`}
          d={treePath(tree)}
        />
      ))}
      <path d="M0 530 Q350 490 680 530 Q960 550 1210 520 Q1550 475 1920 520 L1920 600 L0 600Z" />
    </svg>
  );
}

/**
 * Decorative night scene. Every layer is an independent wrapper so GSAP can move
 * it on its own: the outer `.scene-layer` belongs to the scroll transition and
 * the inner `.parallax-plane` (with its `data-depth`) to the cursor parallax.
 */
export function NightLandscape() {
  return (
    <div className="landscape" aria-hidden="true">
      <div className="scene-layer star-layer">
        <div className="parallax-plane star-plane" data-depth="3">
          <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="stars">
            {stars.map((star) => (
              <circle key={`${star.cx}-${star.cy}`} {...star} />
            ))}
            <path d="M1282 110v12m-6-6h12M638 135v8m-4-4h8M1438 369v10m-5-5h10" />
          </svg>
        </div>
      </div>
      <div className="scene-layer moon-layer">
        <div className="parallax-plane" data-depth="7">
          <div className="moon" />
        </div>
      </div>
      <div className="scene-layer mountain-layer">
        <div className="parallax-plane" data-depth="11">
          <img
            src={mountains}
            width={1920}
            height={1024}
            alt=""
            fetchPriority="high"
            className="landscape-image mountain-image"
          />
        </div>
      </div>
      <div className="scene-layer distant-forest-layer">
        <div className="parallax-plane" data-depth="16">
          <Forest variant="far" />
        </div>
      </div>
      <div className="scene-layer river-layer">
        <div className="parallax-plane" data-depth="20">
          <img
            src={forestRiver}
            width={1920}
            height={1024}
            alt=""
            className="landscape-image river-image"
          />
        </div>
      </div>
      <div className="scene-layer near-forest-layer">
        <div className="parallax-plane" data-depth="25">
          <Forest variant="near" />
        </div>
      </div>
      <div className="scene-layer wolf-layer">
        <div className="parallax-plane" data-depth="30">
          <img src={wolf} width={480} height={480} alt="" className="wolf-image" />
        </div>
      </div>
      <div className="scene-layer foreground-layer">
        <div className="parallax-plane" data-depth="34">
          <svg viewBox="0 0 1920 160" preserveAspectRatio="none">
            <path d="M0 18 Q250 0 460 70 L670 108 Q930 154 1170 86 Q1450 10 1920 45 L1920 160 L0 160Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
