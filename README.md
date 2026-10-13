# Duhelo Usinagem — landing page

Site: https://www.duhelousinagem.com.br/

Vite + React usados só para **gerar** a página: no build, o React é renderizado em HTML estático
(`scripts/prerender.mjs`). O site publicado é HTML + CSS puro, sem JavaScript — carrega rápido e o
Google lê todo o conteúdo direto do HTML.

## Comandos

```bash
npm install
npm run dev          # desenvolvimento em http://localhost:5173
npm run build        # gera dist/ (HTML pré-renderizado + CSS embutido)
npm run preview      # serve dist/ em http://localhost:4173
npm run build:assets # regenera WebP, favicons, logo sem fundo e og-image.jpg (requer sharp)
```

## Onde editar

| O quê | Arquivo |
|---|---|
| Textos, serviços, FAQ, telefone, e-mail, link do WhatsApp | `src/app/content.ts` |
| Estrutura da página | `src/app/App.tsx` |
| Desenhos técnicos (SVG) | `src/app/components/Drawings.tsx` |
| Visual (cores, fontes, layout) | `src/styles/theme.css` |
| Título, descrição, Open Graph | `index.html` |
| Dados estruturados (JSON-LD) | `src/app/structuredData.ts` — gerado a partir de `content.ts` |
| robots / sitemap / manifest / 404 | `public/` |

Ao mudar o conteúdo, atualize `<lastmod>` em `public/sitemap.xml`.

## SEO incluído

- HTML pré-renderizado (conteúdo visível sem JS), `lang="pt-BR"`, um único `<h1>`, hierarquia de títulos.
- Título e meta description com serviço + cidade; canonical; `robots` meta.
- Open Graph / Twitter com imagem 1200×630 (`public/og-image.jpg`) para links no WhatsApp e redes.
- JSON-LD: `LocalBusiness` (serviços, telefone, e-mail, cidade, mapa), `WebSite` e `FAQPage`.
- Seção de perguntas frequentes com conteúdo real (pode gerar resultado expandido no Google).
- `robots.txt`, `sitemap.xml` (com imagens), `site.webmanifest`, favicons 48/96/192/512 e apple-touch-icon.
- Página 404 com `noindex`; cache longo para fontes e assets; cabeçalhos de segurança (`vercel.json`).
- Imagens WebP responsivas com largura/altura, `lazy` abaixo da dobra, foto do topo pré-carregada.
- Fontes auto-hospedadas (sem Google Fonts externo).

Lighthouse local (out/2026): celular 99 desempenho · 100 acessibilidade · 100 boas práticas · 100 SEO;
desktop 100 em tudo.

## Depois de publicar — passos para aparecer no Google

Estas etapas precisam ser feitas pelo dono da empresa (exigem login e verificação):

1. **Google Search Console** — https://search.google.com/search-console
   - Adicione a propriedade de **Domínio** `duhelousinagem.com.br` e verifique pelo registro TXT no DNS
     (onde o domínio foi comprado, ex.: Registro.br).
   - Em *Sitemaps*, envie `https://www.duhelousinagem.com.br/sitemap.xml`.
   - Em *Inspeção de URL*, cole `https://www.duhelousinagem.com.br/` e clique em *Solicitar indexação*.
2. **Perfil da Empresa no Google (Google Maps)** — https://business.google.com
   - É o fator nº 1 para buscas como "usinagem perto de mim" / "usinagem Santa Bárbara d'Oeste".
   - Categoria principal sugerida: *Serviço de usinagem* (ou *Oficina mecânica industrial*).
   - Se não quiser mostrar o endereço, escolha **empresa de área de serviço** e informe as cidades atendidas.
   - Use exatamente o mesmo nome, telefone e site deste site: `Duhelo Usinagem`, `(19) 98273-1890`,
     `https://www.duhelousinagem.com.br/`.
   - Adicione fotos reais (peças, máquinas, oficina) e peça avaliações a clientes satisfeitos.
3. **Domínio único** — no painel da Vercel, deixe `www.duhelousinagem.com.br` como domínio principal e
   o domínio sem `www` redirecionando para ele (o canonical já aponta para o `www`).
4. Opcional: cadastrar a empresa no Bing Places / Bing Webmaster Tools (importa o Search Console).

Se o endereço completo e o horário passarem a ser públicos, adicione `streetAddress`, `postalCode` e
`openingHoursSpecification` em `src/app/structuredData.ts` — melhora o resultado local.
