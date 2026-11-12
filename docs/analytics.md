# Métricas da Duhelo Usinagem

## Comparação

- **A · Plausible Cloud Business.** Medição sem cookies, eventos por página, posição e origem com propriedades personalizadas e relatório semanal nativo. Exige conta e plano Business. [Propriedades](https://plausible.io/docs/custom-props/introduction) · [Relatórios](https://plausible.io/docs/email-reports)
- **B · GA4 com Consent Mode v2 básico.** Oferece relatórios detalhados e agendamento no Data Studio, mas exige banner, aceite e gestão da revogação para carregar a tag. [Consent Mode](https://support.google.com/analytics/answer/10000067) · [Agendamento](https://docs.cloud.google.com/data-studio/schedule-automatic-report-delivery)
- **Escolha · A.** Atende aos eventos do site estático com um POST do navegador e conserva o site sem cookies de medição. A opção B permanece documentada abaixo.

## Ativação do Plausible

1. Cadastre `duhelousinagem.com.br` na conta Plausible do responsável pela Duhelo, usando o fuso `America/Sao_Paulo`. Confirme o plano Business para consultar as propriedades personalizadas. [Cadastro de site](https://plausible.io/docs/add-website)
2. No painel da Vercel, adicione `VITE_PLAUSIBLE_DOMAIN=duhelousinagem.com.br` ao ambiente **Production** e gere um novo build. Esse valor é o domínio público da propriedade. Com a variável ausente, os CTAs e a atribuição local continuam funcionando e os eventos permanecem no navegador. Com a variável configurada, os POSTs só saem em `https://www.duhelousinagem.com.br`.
3. Em **Site Settings → Goals**, crie metas de evento para `whatsapp_click`, `call_click`, `email_click`, `cta_click` e `blog_scroll_75`. `pageview` alimenta as visitas automaticamente. Em **Custom Properties**, cadastre `cta_position`, `utm_source`, `utm_medium` e `utm_campaign`. Use **Page** para a rota canônica e **Properties** para filtrar posições e campanhas. [Metas de evento](https://plausible.io/docs/custom-event-goals) · [Propriedades no painel](https://plausible.io/docs/custom-props/props-dashboard)
4. Abra uma URL de campanha do [guia UTM](utm.md), navegue a uma página de serviço e clique em um CTA. Confirme os eventos e as propriedades no painel. A integração direta pela API pode exigir conferência manual. Um HTTP `202` isolado indica que a API recebeu a chamada e ainda permite filtragem do evento pelo fornecedor. [Events API](https://plausible.io/docs/events-api) · [Conferência manual](https://plausible.io/docs/troubleshoot-integration#how-to-manually-check-your-integration)
5. Em **Site Settings → Email reports**, ative **Weekly** e adicione o destinatário autorizado. O relatório é enviado às segundas-feiras. [Relatórios por e-mail](https://plausible.io/docs/email-reports)

## O que sai do navegador

O script envia ao endpoint `https://plausible.io/api/event` o nome do evento, o domínio da propriedade, a URL canônica sem parâmetros e os rótulos cadastrados de posição e campanha quando aplicáveis. Os POSTs usam `credentials: "omit"`, `referrerPolicy: "no-referrer"` e `keepalive` para preservar a tentativa de envio ao abrir o canal de contato. O corpo exclui nome, telefone, e-mail, conteúdo de mensagens e anexos, URL de chegada, destino do botão e referrer.

A atribuição local usa `sessionStorage` por aba e aceita somente as campanhas cadastradas. A medição usa a página canônica, e a rolagem dispara uma vez ao chegar a 75% do corpo de um artigo. O site direciona orçamentos para WhatsApp, telefone e e-mail. Se um formulário for adicionado, registre `form_submit` após a confirmação de sucesso e mantenha os campos preenchidos fora do evento.

O Plausible processa IP e User-Agent recebidos na conexão para gerar um identificador com sal diário e calcular estatísticas técnicas. O fornecedor informa que não armazena os valores brutos e que processa os dados de medição na União Europeia. Confirme retenção e eventual mecanismo de transferência com o responsável pela Duhelo antes de ativar. [Política de dados](https://plausible.io/data-policy) · [Acordo de tratamento](https://plausible.io/dpa)

## Alternativa documentada · GA4

Se optar pelo GA4, configure o **Consent Mode v2 básico**. Apresente escolha de aceite e recusa e carregue a tag somente depois do aceite. Ofereça revogação acessível e desative as finalidades de publicidade. Envie eventos com `page_location` canônica e omita referrer e parâmetros livres. A Google informa que o GA4 descarta o IP na coleta. Configure **2 meses** para retenção dos dados de usuário e evento e revise os relatórios agregados separadamente. Conecte a propriedade ao **Data Studio** e agende a entrega semanal por e-mail. [Consent Mode](https://support.google.com/analytics/answer/10000067) · [Tratamento de IP](https://support.google.com/analytics/answer/11598602) · [Retenção](https://support.google.com/analytics/answer/7667196) · [Agendamento](https://docs.cloud.google.com/data-studio/schedule-automatic-report-delivery)

**[CONFIRMAR]** Conta, plano Business e destinatário do relatório. A ativação depende do responsável pela conta e da configuração no ambiente de produção.
