import { createRequire } from "module";
import { mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SVG = join(ROOT, "src-tauri", "icons", "app-icon.svg");

async function png(size, dest) {
  mkdirSync(dirname(dest), { recursive: true });
  await sharp(SVG, { density: 384 }).resize(size, size).png().toFile(dest);
  console.log("✓", dest);
}

async function main() {
  await png(1024, join(ROOT, "src-tauri", "icons", "icon-source.png"));

  const res = join(ROOT, "android", "app", "src", "main", "res");
  const sizes = [
    ["mipmap-mdpi", 48],
    ["mipmap-hdpi", 72],
    ["mipmap-xhdpi", 96],
    ["mipmap-xxhdpi", 144],
    ["mipmap-xxxhdpi", 192],
  ];
  for (const [folder, size] of sizes) {
    await png(size, join(res, folder, "ic_launcher.png"));
    await png(size, join(res, folder, "ic_launcher_round.png"));
  }
  console.log("\n✅ Íconos generados correctamente.");
}

main().catch((e) => { console.error(e); process.exit(1); });
