import { BRAND, CITY, EMAIL, PHONE_DISPLAY, WHATSAPP_LINK } from "../content";
import { Logo } from "../components/Logo";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { MobileCtaBar } from "../components/MobileCtaBar";
import { ConsentBanner } from "../components/ConsentBanner";

export function PrivacyPage() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className="site-header">
        <div className="header-inner">
          <a href="/" className="header-brand" aria-label={`${BRAND} - início`}><Logo className="logo logo-header" /></a>
          <nav aria-label="Navegação principal" className="header-nav"><ul><li><a href="/">Início</a></li><li><a href="/#servicos">Serviços</a></li><li><a href="/blog">Blog</a></li><li><a href="/#contato">Contato</a></li></ul></nav>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm"><WhatsAppIcon /><span>Orçamento</span></a>
        </div>
      </header>
      <div className="sheet">
        <main id="conteudo">
          <nav aria-label="Breadcrumb" className="breadcrumb"><a href="/">Início</a> / <span>Política de privacidade</span></nav>
          <section className="zone-section" aria-labelledby="privacy-title">
            <div className="section-head">
              <h1 id="privacy-title">Política de privacidade</h1>
              <p>Última atualização: 05/11/2026.</p>
            </div>
            <h2>Controlador</h2>
            <p>{BRAND} — razão social, CNPJ e endereço completo: [CONFIRMAR]. Contato: {PHONE_DISPLAY}, {EMAIL}.</p>
            <h2>Dados tratados</h2>
            <p>Métricas de uso do site coletadas pelo Google Analytics (cookies _ga e _ga_*), somente após o seu consentimento via banner. Não coletamos nome, telefone, e-mail ou texto digitado pelo site.</p>
            <h2>Finalidade</h2>
            <p>Entender como o site é usado, melhorar o conteúdo e a experiência de navegação.</p>
            <h2>Base legal</h2>
            <p>[CONFIRMAR com advogado] (LGPD art. 7, I/IX ou outra aplicável).</p>
            <h2>Operador e transferência internacional</h2>
            <p>O Google atua como operador da medição. Pode haver transferência internacional de dados. [CONFIRMAR com advogado].</p>
            <h2>Retenção</h2>
            <p>[CONFIRMAR] (período de retenção dos dados no Google Analytics).</p>
            <h2>Direitos do titular (art. 18 da LGPD)</h2>
            <p>Você pode solicitar acesso, correção, anonimização, portabilidade, eliminação e revogação do consentimento. Para retirar o consentimento, use o link "Preferências de cookies" no rodapé ou limpe os cookies do domínio.</p>
            <h2>Contato por WhatsApp, telefone ou e-mail</h2>
            <p>Quem entra em contato por esses canais fornece seus dados por conta própria, para atendimento e orçamento.</p>
            <h2>Canal de contato</h2>
            <p>WhatsApp {PHONE_DISPLAY} ou e-mail {EMAIL}.</p>
          </section>
        </main>
        <footer className="site-footer">
          <Logo className="logo logo-footer" />
          <div className="footer-text">
            <p><strong>{BRAND}</strong> · Usinagem, ferramentaria e manutenção industrial em {CITY}.</p>
            <p><a href={`tel:+5519982731890`}>{PHONE_DISPLAY}</a> · <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
            <p><a href="/politica-de-privacidade" className="text-link">Política de privacidade</a> · <button type="button" className="text-link" onClick={() => window.dispatchEvent(new Event("duhelo-open-consent"))}>Preferências de cookies</button></p>
          </div>
        </footer>
      </div>
      <MobileCtaBar />
      <ConsentBanner />
    </>
  );
}