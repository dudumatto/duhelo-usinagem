import { ABOUT_DESCRIPTION, ABOUT_TITLE, EMAIL, MAPS_LINK, PHONE_DISPLAY, PHONE_E164, WHATSAPP_LINK } from "../content";
import { ContentLayout } from "../components/ContentLayout";
import { WhatsAppIcon } from "../components/WhatsAppIcon";

export function AboutPage() {
  return (
    <ContentLayout activePage="about">
      <article className="about-page" aria-labelledby="about-title">
        <section className="zone-section">
          <div className="section-head section-head-stack">
            <h1 id="about-title">{ABOUT_TITLE}</h1>
            <p>{ABOUT_DESCRIPTION}</p>
          </div>
          <div className="about-overview">
            <div className="about-experience">
              <h2>Peças sob medida e manutenção industrial</h2>
              {/* [CONFIRMAR: ano de início, histórico da oficina e exemplos de trabalhos autorizados para publicação.] */}
              <p>Trabalhamos com torno CNC, torno convencional e fresadora na fabricação de peças únicas e lotes. Entre os componentes estão eixos, buchas, flanges e suportes de máquinas.</p>
              <p>Quando a referência é uma peça gasta, a aplicação e as medidas de encaixe ajudam a decidir entre ajustar, recuperar ou fabricar uma reposição.</p>
              <p><a className="text-link" href="/usinagem-de-precisao">Usinagem de precisão sob desenho ou amostra</a><br />
                <a className="text-link" href="/recuperacao-de-eixos-e-buchas">Recuperação de eixos e buchas</a></p>
            </div>
            <figure className="about-photo">
              <img
                src="/images/opt/card-usinagem-customizada-800.webp"
                srcSet="/images/opt/card-usinagem-customizada-480.webp 480w, /images/opt/card-usinagem-customizada-800.webp 800w"
                sizes="(min-width: 850px) 400px, 90vw"
                width={800}
                height={533}
                alt="Flange de aço usinado com bucha de bronze"
                decoding="async"
              />
              <figcaption>Flange com bucha de bronze fabricado pela Duhelo.</figcaption>
            </figure>
          </div>
        </section>
        <section className="zone-section about-contact" aria-labelledby="about-contact-title">
          <div className="about-contact-content">
            <h2 id="about-contact-title">Orçamento e localização</h2>
            <p className="section-lead">Envie o desenho ou fotos da amostra ou da peça gasta. Informe a aplicação, a quantidade e as medidas disponíveis.</p>
            <div className="hero-actions">
              <a className="btn btn-primary btn-lg" href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"><WhatsAppIcon />Pedir orçamento pelo WhatsApp</a>
            </div>
            <address className="about-details">
              <a className="text-link" href={`tel:${PHONE_E164}`}>{PHONE_DISPLAY}</a>
              <a className="text-link" href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <a className="text-link" href={MAPS_LINK} target="_blank" rel="noopener noreferrer">Localização da oficina no mapa</a>
            </address>
          </div>
        </section>
      </article>
    </ContentLayout>
  );
}
