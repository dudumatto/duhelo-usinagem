// Gera imagens otimizadas (WebP), favicons, logo sem fundo e a imagem de compartilhamento (OG).
// Uso: node scripts/build-assets.mjs  (requer sharp como devDependency)
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "public/images";
const OUT = "public/images/opt";
await mkdir(OUT, { recursive: true });

const photos = ["card-servicos-cnc", "card-usinagem-customizada", "card-fabricacao-metal"];
for (const name of photos) {
  for (const w of [480, 800, 1200]) {
    await sharp(`${SRC}/${name}.jpg`).resize({ width: w }).webp({ quality: 74 }).toFile(`${OUT}/${name}-${w}.webp`);
  }
}

// Logo: remove o fundo branco (alpha a partir da "brancura") e despremultiplica a cor.
async function knockoutWhite(input) {
  const flat = await sharp(input).flatten({ background: "#ffffff" }).png().toBuffer();
  const { data, info } = await sharp(flat).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const min = Math.min(data[i], data[i + 1], data[i + 2]);
    const a = Math.min(1, Math.max(0, (255 - min) / 200));
    if (a <= 0.02) { data[i + 3] = 0; continue; }
    for (let c = 0; c < 3; c++) data[i + c] = Math.max(0, Math.min(255, Math.round((data[i + c] - (1 - a) * 255) / a)));
    data[i + 3] = Math.round(a * 255);
  }
  return sharp(data, { raw: info });
}

const logo = await knockoutWhite(`${SRC}/duhelo-logo.png`);
const logoBuf = await logo.png().toBuffer();
await sharp(logoBuf).trim().resize({ height: 160 }).png({ compressionLevel: 9, palette: true }).toFile(`${OUT}/duhelo-logo.png`);
await sharp(logoBuf).trim().resize({ height: 160 }).webp({ quality: 90, alphaQuality: 90 }).toFile(`${OUT}/duhelo-logo.webp`);

// Símbolo (engrenagens) para favicons: a metade superior do logo.
const symbol = await sharp(logoBuf).extract({ left: 0, top: 0, width: 500, height: 285 }).png().toBuffer();
const symbolTrim = await sharp(symbol).trim().png().toBuffer();
const square = (size, pad = 0.1, bg = { r: 0, g: 0, b: 0, alpha: 0 }) =>
  sharp(symbolTrim)
    .resize({ width: Math.round(size * (1 - pad * 2)), height: Math.round(size * (1 - pad * 2)), fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: Math.round(size * pad), bottom: Math.round(size * pad), left: Math.round(size * pad), right: Math.round(size * pad), background: bg })
    .resize(size, size)
    .png();
await square(48, 0.04).toFile("public/favicon-48.png");
await square(96, 0.04).toFile("public/favicon-96.png");
await square(192, 0.08, { r: 255, g: 255, b: 255, alpha: 1 }).flatten({ background: "#ffffff" }).toFile("public/icon-192.png");
await square(512, 0.12, { r: 255, g: 255, b: 255, alpha: 1 }).flatten({ background: "#ffffff" }).toFile("public/icon-512.png");
await square(180, 0.1, { r: 255, g: 255, b: 255, alpha: 1 }).flatten({ background: "#ffffff" }).toFile("public/apple-touch-icon.png");

// Imagem de compartilhamento 1200x630: foto real + faixa de "carimbo".
const photo = await sharp(`${SRC}/card-usinagem-customizada.jpg`).resize(660, 630, { fit: "cover", position: "centre" }).toBuffer();
const logoSmall = await sharp(logoBuf).trim().resize({ height: 110 }).png().toBuffer();
const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#f5f5f1"/>
  <rect x="18" y="18" width="1164" height="594" fill="none" stroke="#16182b" stroke-width="3"/>
  <g font-family="Arial, Helvetica, sans-serif" fill="#16182b">
    <text x="60" y="246" font-size="40" font-weight="800">Usinagem de precisão</text>
    <text x="60" y="302" font-size="40" font-weight="800">sob desenho e amostra</text>
    <text x="60" y="372" font-size="24" fill="#3d4256">Torno CNC · Torno convencional · Fresa</text>
    <line x1="60" y1="420" x2="490" y2="420" stroke="#16182b" stroke-width="2"/>
    <text x="60" y="466" font-size="26" font-weight="700">Santa Bárbara d'Oeste - SP</text>
    <text x="60" y="508" font-size="26" fill="#1565c0" font-weight="700">WhatsApp (19) 98273-1890</text>
  </g>
</svg>`;
await sharp(Buffer.from(svg))
  .composite([
    { input: photo, left: 540, top: 0 },
    { input: Buffer.from(`<svg width="1200" height="630"><rect x="540" y="0" width="3" height="630" fill="#16182b"/><rect x="18" y="18" width="1164" height="594" fill="none" stroke="#16182b" stroke-width="3"/></svg>`), left: 0, top: 0 },
    { input: logoSmall, left: 60, top: 60 },
  ])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile("public/og-image.jpg");

console.log("assets ok");
