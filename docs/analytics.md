# Analytics (GA4) — Duhelo Usinagem

## Configuração
- ID de métricas via variável de ambiente `VITE_GA_ID` (formato `G-XXXXXXXXXX`).
- Exemplo: `.env.local` (não commitado) com `VITE_GA_ID=G-BLE168D9WE`.
- Template: `.env.example` (commitado, vazio).

## Host permitido
- GA4 só carrega em produção no host `https://www.duhelousinagem.com.br`.
- Não carrega em dev, vite preview ou domínios de preview da Vercel.

## Teste local
- Crie `.env.local` com `VITE_GA_ID=G-BLE168D9WE` e `VITE_GA_DEBUG_LOCAL=true`.
- Com o flag, o carregamento é liberado em localhost para testes.
- Sem o flag, nenhum request para Google é feito localmente.

## Consentimento
- Banner com "Aceitar"/"Recusar" de mesma importância visual.
- Aceite lembrado por 12 meses; recusa por 6 meses (localStorage).
- Ao recusar/revogar, cookies `_ga` e `_ga_*` são apagados.

## page_view
- GA4 envia page_view automaticamente a cada carregamento de página (site é MPA, sem router client-side). Não há page_view manual para evitar duplicação.