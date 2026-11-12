# Convenção de UTM — Duhelo Usinagem

Host canônico da Duhelo: https://www.duhelousinagem.com.br/

Use `utm_source` para o canal, `utm_medium` para o meio e `utm_campaign` para identificar a campanha. Escreva os valores em minúsculas, sem acentos ou espaços, com `_` entre palavras. Use UTMs apenas em links externos que levam ao site. Mantenha links internos, `canonical`, `og:url` e sitemap com URLs limpas. Use os valores da tabela e evite nomes, telefones ou e-mails nos parâmetros.

Links prontos:

| Canal | URL |
|---|---|
| Perfil da Empresa no Google | https://www.duhelousinagem.com.br/?utm_source=google_business_profile&utm_medium=organic&utm_campaign=perfil_empresa |
| Bio do Instagram | https://www.duhelousinagem.com.br/?utm_source=instagram&utm_medium=social&utm_campaign=bio |
| Status do WhatsApp | https://www.duhelousinagem.com.br/?utm_source=whatsapp&utm_medium=social&utm_campaign=status |
| Assinatura de e-mail | https://www.duhelousinagem.com.br/?utm_source=email&utm_medium=email&utm_campaign=assinatura |
| QR code do cartão | https://www.duhelousinagem.com.br/?utm_source=cartao&utm_medium=offline&utm_campaign=qr_code |

## Como a origem chega ao clique

Na abertura da página, `public/cta.js` lê a URL. A última origem cadastrada fica no `sessionStorage` da aba e acompanha a navegação interna sem acrescentar parâmetros aos links. Uma nova chegada com origem cadastrada substitui a anterior. Entradas sem origem cadastrada preservam a atribuição da aba. O script aceita `utm_source` cadastrado isoladamente e inclui meio e campanha quando correspondem ao canal da tabela. Para adicionar um canal, atualize a tabela e o mapa `campaigns` em `public/cta.js`.

O clique emite `duhelo:cta` no navegador, com `event`, `cta_page` (caminho canônico), `cta_position` e os valores UTM reconhecidos, quando presentes. Com a medição ativa em produção, os rótulos reconhecidos também seguem nas propriedades do evento do Plausible. Veja a [configuração de métricas](analytics.md).

## Teste no preview

Após `npm run build` e `npm run preview`, abra `http://localhost:4173/?utm_source=instagram&utm_medium=social&utm_campaign=bio`. Navegue por um link interno e confirme que a URL de destino está limpa. No console da página de destino, registre o ouvinte abaixo e clique no WhatsApp.

```js
window.addEventListener("duhelo:cta", ({ detail }) => console.log(detail));
```

O console deve mostrar `whatsapp_click`, a página de destino, a posição do botão e `utm_source: "instagram"`, `utm_medium: "social"` e `utm_campaign: "bio"`.
