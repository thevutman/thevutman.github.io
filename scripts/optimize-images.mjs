// Generates the optimized WebP layers used by the hero from the lossless
// originals in design/originals/hero. Run with `npm run optimize:images`.
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const source = path.join(root, "design/originals/hero");
const output = path.join(root, "src/assets/hero");

// Each layer is exported at the width it is actually rendered at: the landscape
// planes span the viewport (and overflow it on mobile), while the wolf is never
// wider than ~230 CSS px, so 480 px covers 2x screens.
const jobs = [
  { file: "mountains.png", width: 1920 },
  { file: "forest-river.png", width: 1920 },
  { file: "wolf.png", width: 480 },
];

await mkdir(output, { recursive: true });

for (const { file, width } of jobs) {
  const target = path.join(output, `${path.parse(file).name}.webp`);
  await sharp(path.join(source, file))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82, alphaQuality: 90, effort: 6 })
    .toFile(target);
  const { size } = await stat(target);
  console.log(`${path.relative(root, target)}  ${(size / 1024).toFixed(0)} KB`);
}
