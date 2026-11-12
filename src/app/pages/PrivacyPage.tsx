import { BRAND, CITY, EMAIL, PHONE_DISPLAY, PHONE_E164, whatsappUrl } from "../content";
import { Logo } from "../components/Logo";
import { ContactActions } from "../components/ContactActions";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { MobileCtaBar } from "../components/MobileCtaBar";

export function PrivacyPage() {
  const whatsappMessage = "Olá, encontrei o contato na página de política de privacidade da Duhelo e gostaria de solicitar um orçamento de usinagem.";

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className="site-header">
        <div className="header-inner">
          <a href="/" className="header-brand" aria-label={`${BRAND} - início`}><Logo className="logo logo-header" /></a>
          <nav aria-label="Navegação principal" className="header-nav"><ul><li><a href="/">Início</a></li><li><a href="/#servicos">Serviços</a></li><li><a href="/blog">Blog</a></li><li><a href="/#contato">Contato</a></li></ul></nav>
          <a href={whatsappUrl(whatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" data-cta-event="whatsapp_click" data-cta-position="header"><WhatsAppIcon /><span>Orçamento</span></a>
        </div>
      </header>
      <div className="sheet">
        <main id="conteudo">
          <nav aria-label="Caminho da página" className="breadcrumb"><a href="/">Início</a> / <span>Política de privacidade</span></nav>
          <section className="zone-section" aria-labelledby="privacy-title">
            <div className="section-head">
              <h1 id="privacy-title">Política de privacidade</h1>
              <p>Atualizada em <time dateTime="2026-11-11">11/11/2026</time>.</p>
            </div>
            <div className="blog-prose">
              <h2>Quem é o controlador</h2>
              <p>{BRAND}, em {CITY}. [CONFIRMAR: razão social, CNPJ e endereço completo do controlador.]</p>
              <h2>Dados que recebemos e para que os usamos</h2>
              <p>O contato acontece por WhatsApp, telefone ou e-mail. Podemos receber seu nome, seus dados de contato, a mensagem e os arquivos que você escolher enviar, como desenhos ou fotos de peças. Usamos essas informações para responder pelo canal escolhido, avaliar a solicitação e preparar o orçamento.</p>
              <p>Quando a medição está habilitada, contamos visitas às páginas, cliques de contato e rolagem até 75% dos artigos para melhorar o conteúdo e os canais de orçamento. Cada evento inclui o tipo de interação e a página canônica. Quando se aplicam, também inclui a posição do botão e os rótulos de uma campanha cadastrada. Dados de contato, mensagens e anexos ficam restritos ao atendimento.</p>
              <h2>Cookies e atribuição de campanhas</h2>
              <p>A medição funciona sem cookies. O site guarda somente os rótulos da campanha reconhecida no armazenamento de sessão da aba, inclusive com a medição desligada. Quando a medição está habilitada, esses rótulos associam a origem da visita aos cliques durante a navegação na mesma aba.</p>
              <h2>Base legal</h2>
              <p>[CONFIRMAR: com assessoria jurídica, as bases legais aplicáveis ao atendimento, aos orçamentos e a eventuais dados técnicos tratados para a medição.]</p>
              <h2>Serviços externos</h2>
              <p>Ao usar WhatsApp ou e-mail, o serviço de comunicação escolhido trata os dados necessários para entregar a mensagem, conforme as regras da plataforma.</p>
              <p>Quando habilitada, a medição envia os eventos ao Plausible Cloud. Segundo o fornecedor, o serviço usa o IP e informações técnicas do navegador de forma transitória para gerar um identificador diário e calcular estatísticas como tipo de dispositivo e localização aproximada. O Plausible informa que processa e armazena os dados de medição na União Europeia. Consulte a <a href="https://plausible.io/data-policy">política de dados do Plausible</a>.</p>
              <p>[CONFIRMAR: com assessoria jurídica, as condições e o mecanismo aplicável à transferência internacional de dados pessoais, quando houver.]</p>
              <aside className="cta-inline" aria-label="Orçamento de usinagem">
                <ContactActions message={whatsappMessage} position="middle" />
              </aside>
              <h2>Por quanto tempo guardamos os dados</h2>
              <p>Os rótulos de campanha ficam no armazenamento de sessão da aba. [CONFIRMAR: prazos de retenção para contatos, mensagens, anexos, orçamentos e dados de medição.]</p>
              <h2>Seus direitos e como solicitar</h2>
              <p>Nos termos do art. 18 da LGPD, você pode pedir confirmação e acesso aos dados, correção, portabilidade, informação sobre compartilhamento, anonimização, bloqueio ou eliminação, conforme o caso. Se houver tratamento com base no consentimento, você pode pedir informações sobre a recusa, revogar o consentimento e solicitar a eliminação nos casos previstos em lei.</p>
              <p>Envie a solicitação para <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. [CONFIRMAR: canal oficial de privacidade e responsável pelo atendimento.] Se precisar encaminhar uma petição após procurar a Duhelo, consulte a <a href="https://www.gov.br/anpd/pt-br/canais_atendimento/cidadao-titular-de-dados/denuncia-peticao-de-titular-referente-lgpd">orientação da ANPD</a>.</p>
            </div>
          </section>
          <section className="zone-section blog-cta" aria-labelledby="privacy-cta">
            <h2 id="privacy-cta">Orçamento de usinagem</h2>
            <ContactActions message={whatsappMessage} position="end" />
          </section>
        </main>
        <footer className="site-footer">
          <Logo className="logo logo-footer" />
          <div className="footer-text">
            <p><strong>{BRAND}</strong> · Usinagem, ferramentaria e manutenção industrial em {CITY}.</p>
            <p><a href={`tel:${PHONE_E164}`} data-cta-event="call_click" data-cta-position="footer">{PHONE_DISPLAY}</a> · <a href={`mailto:${EMAIL}`} data-cta-event="email_click" data-cta-position="footer">{EMAIL}</a></p>
          </div>
        </footer>
      </div>
      <MobileCtaBar whatsappMessage={whatsappMessage} />
    </>
  );
}
