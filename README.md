# Duhelo Usinagem — landing page

Site: https://www.duhelousinagem.com.br/

Vite e React geram HTML estático no build (`scripts/prerender.mjs`). O conteúdo e os links de contato funcionam diretamente no HTML. Um script local pequeno registra a origem de campanha e os cliques dos CTAs no navegador. Veja a [convenção de UTM](docs/utm.md).

A [medição com GA4](docs/analytics.md) pode ser habilitada no build de produção pela variável `VITE_GA_ID`. A tag só carrega após aceite. Confira a política de privacidade em `/politica-de-privacidade` antes da ativação.

## Comandos

```bash
npm install
npm run dev          # HTML renderizado no servidor em http://localhost:5173; recarregue após editar
npm run build        # gera dist/ (HTML pré-renderizado + CSS embutido)
npm run preview      # serve dist/ em http://localhost:4173
npm run analytics:check # testa o contrato dos eventos sem tráfego externo
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
| Artigos e metadados do blog | `src/content/blog/*.md` |
| robots / llms / manifest / 404 | `public/` |
| Texto da página Sobre | `src/app/pages/AboutPage.tsx` |

O build gera `dist/sitemap.xml` com as rotas canônicas indexáveis, incluindo Santa Bárbara d'Oeste e Americana. O build também gera `dist/404.html` com o layout do site. O `lastmod` dos artigos vem do Markdown. O índice do blog usa a data mais recente entre a sua própria revisão e as dos artigos. Para mudanças significativas na home, no índice do blog, na página Sobre ou na política de privacidade, atualize `pageDates` em `src/entry-server.tsx`. Nas páginas de serviço, atualize `lastModified` no registro correspondente em `src/app/serviceLandings.ts` ou `src/app/localLandings.ts`. Use a data real da mudança em `AAAA-MM-DD`.

Os artigos do blog usam `slug`, `title`, `seoTitle`, `description`, `date`, `category`, `keyword` e `service` no cabeçalho YAML. Use datas entre aspas em `AAAA-MM-DD`, preencha `updated` ao revisar um artigo e mantenha o `slug` ao mudar o título. O corpo começa com dois parágrafos e usa `##` para as entradas do índice. A listagem fica em `/blog` e o build gera o RSS em `/blog/feed.xml`.

## SEO incluído

- HTML pré-renderizado (conteúdo visível sem JS), `lang="pt-BR"`, um único `<h1>`, hierarquia de títulos.
- Título e meta description com serviço + cidade; canonical; `robots` meta.
- Open Graph / Twitter com imagem 1200×630 (`public/og-image.jpg`) para links no WhatsApp e redes.
- JSON-LD: `LocalBusiness` (serviços, telefone, e-mail, cidade, mapa), `WebSite` e `FAQPage`.
- Perguntas frequentes visíveis e correspondentes ao JSON-LD `FAQPage`.
- `robots.txt`, sitemap XML gerado no build, `llms.txt`, `site.webmanifest`, favicons 48/96/192/512 e apple-touch-icon.
- Página 404 com `noindex`; cache longo para fontes e assets; cabeçalhos de segurança (`vercel.json`).
- Imagens WebP responsivas com largura/altura, `lazy` abaixo da dobra, foto do topo pré-carregada.
- Fontes auto-hospedadas (sem Google Fonts externo).

Lighthouse local (out/2026): celular 99 desempenho · 100 acessibilidade · 100 boas práticas · 100 SEO;
desktop 100 em tudo.

## Depois de publicar

Siga o [checklist de presença local](docs/checklist-geo.md) para configurar Google, Bing, diretórios e avaliações. No painel da Vercel, confira se `www.duhelousinagem.com.br` é o domínio principal e se o domínio sem `www` redireciona para ele.
