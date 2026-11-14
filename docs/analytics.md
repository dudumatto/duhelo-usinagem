# Métricas da Duhelo Usinagem

O site usa GA4 com [Consent Mode v2 básico](https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic). A tag só carrega após aceite, em HTTPS no host canônico `www.duhelousinagem.com.br`. A recusa e as preferências ficam no navegador. Ao revogar, o site bloqueia a medição, remove os cookies `_ga` e `_ga_*` e recarrega a página.

## Antes de ativar

1. Crie ou selecione a propriedade GA4 e um fluxo Web. Desative a medição otimizada automática para que cliques externos, formulários e rolagem não criem eventos paralelos; revise a lista de destinos da tag, mantenha Google Signals desativado e nenhum vínculo com Google Ads.
2. Em **Eventos-chave**, marque `whatsapp_click`, `call_click`, `email_click` e `drawing_cta_click`, além de remover eventos-chave automáticos que não se aplicam. O clique em enviar desenho conta também como clique em WhatsApp; não some os dois para totalizar contatos. `cta_click` e `blog_scroll_75` ficam como eventos comuns. Cadastre as dimensões `cta_page` e `cta_position` com escopo de evento.
3. A configuração confirmada para a propriedade é de dois meses para dados de eventos e quatorze meses para dados de usuários, com renovação do prazo quando há nova atividade. A designação do responsável pelo atendimento de privacidade e a revisão jurídica estão suspensas.
4. Configure o filtro de tráfego interno, vincule o Search Console e prepare o relatório semanal de visitas, origem, páginas e contatos no Looker Studio, com os destinatários autorizados.
5. Na Vercel, inclua `VITE_GA_ID` apenas em **Production** quando for hora de publicar. O valor é o ID público do fluxo Web (`G-…`). Sem ele, a medição e o banner ficam inativos. Ao publicar, confirme em Tempo real e, no navegador, teste recusa, aceite e revogação sem bloqueadores.

O código envia a página canônica sem parâmetros, o tipo de interação, a posição do CTA e rótulos de campanha cadastrados quando presentes. Não envia dados de pagamento, contatos, mensagens ou anexos nos eventos. Políticas de publicidade permanecem negadas no consentimento.

Verificação local: `npm run analytics:check` simula a carga e os eventos, sem contato com o Google.
