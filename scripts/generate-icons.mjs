/**
 * Genera los íconos requeridos por Tauri y Capacitor a partir de app-icon.svg.
 * Requiere: sharp  →  npm install --save-dev sharp
 * Uso: node scripts/generate-icons.mjs
 */
import { createRequire } from "module";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SVG = join(ROOT, "src-tauri", "icons", "app-icon.svg");

async function png(size, dest) {
  mkdirSync(dirname(dest), { recursive: true });
  await sharp(SVG).resize(size, size).png().toFile(dest);
  console.log("✓", dest);
}

async function main() {
  // --- Tauri desktop icons ---
  const tauriIcons = join(ROOT, "src-tauri", "icons");
  await png(32,  join(tauriIcons, "32x32.png"));
  await png(128, join(tauriIcons, "128x128.png"));
  await png(256, join(tauriIcons, "128x128@2x.png"));
  await png(512, join(tauriIcons, "512x512.png"));

  // ICO (Windows): sharp no genera ICO nativo, usamos el PNG de 256 px
  // y lo copiamos; tauri-action lo convierte internamente.
  const buf256 = await sharp(SVG).resize(256, 256).png().toBuffer();
  writeFileSync(join(tauriIcons, "icon.ico.png"), buf256);
  console.log("✓ icon.ico.png (placeholder — tauri-action lo convierte)");

  // --- Capacitor Android icons ---
  const androidRes = join(ROOT, "android", "app", "src", "main", "res");
  const androidSizes = [
    ["mipmap-mdpi",    48],
    ["mipmap-hdpi",    72],
    ["mipmap-xhdpi",   96],
    ["mipmap-xxhdpi", 144],
    ["mipmap-xxxhdpi",192],
  ];
  for (const [folder, size] of androidSizes) {
    await png(size, join(androidRes, folder, "ic_launcher.png"));
    await png(size, join(androidRes, folder, "ic_launcher_round.png"));
  }

  console.log("\n✅ Íconos generados correctamente.");
}

main().catch((e) => { console.error(e); process.exit(1); });
