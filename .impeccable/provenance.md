# Proveniência das imagens

- public/images/card-*.jpg, public/images/duhelo-logo.png: fotos e logo originais da Duhelo, já presentes no repositório.
- public/images/opt/*.webp|png, public/favicon-*.png, public/icon-*.png, public/apple-touch-icon.png, public/og-image.jpg:
  derivados dos arquivos acima por `scripts/build-assets.mjs` (redimensionamento, WebP, remoção do fundo branco do logo,
  composição da imagem de compartilhamento). Nenhuma imagem gerada por IA, nenhum banco de imagens.
- Desenhos técnicos: SVG em src/app/components/Drawings.tsx (ilustrativos).
