import { ABOUT_DESCRIPTION, ABOUT_TITLE, MAPS_LINK } from "../content";
import { ContentLayout } from "../components/ContentLayout";
import { ContentQuote } from "../components/ContentQuote";
import { Cover, flangePhoto, HERO_COVER_SIZES } from "../components/Cover";

const whatsappMessage = "Olá, conheci a oficina na página Sobre a Duhelo e gostaria de um orçamento de usinagem.";

export function AboutPage() {
  return (
    <ContentLayout activePage="about" whatsappMessage={whatsappMessage}>
      <header className="content-section content-hero">
        <div className="content-width">
          <nav className="content-breadcrumb" aria-label="Caminho da página">
            <a href="/" className="text-link">Início</a><span aria-hidden="true">/</span><span>Sobre</span>
          </nav>
          <div className="content-hero-grid">
            <div>
              <h1>{ABOUT_TITLE}</h1>
              <p className="section-lead">{ABOUT_DESCRIPTION}</p>
              <a className="btn btn-ghost content-hero-action" href={MAPS_LINK} target="_blank" rel="noopener noreferrer">Localizar a oficina</a>
            </div>
            <figure className="content-figure">
              <Cover source={flangePhoto} sizes={HERO_COVER_SIZES} priority />
              <figcaption>Flange com bucha de bronze fabricado pela Duhelo.</figcaption>
            </figure>
          </div>
        </div>
      </header>
      <section className="content-section" aria-labelledby="about-work">
        <div className="content-width">
          <h2 id="about-work">Fabricação e manutenção industrial</h2>
          <div className="service-topics">
            <div className="service-topic">
              <h3>Peças únicas e lotes</h3>
              <p>Trabalhamos com torno CNC, torno convencional e fresadora para fabricar eixos, buchas, flanges e suportes de máquinas.</p>
              <a className="text-link" href="/usinagem-de-precisao">Usinagem de precisão</a>
            </div>
            <div className="service-topic">
              <h3>Recuperação de componentes</h3>
              <p>A aplicação e as medidas de encaixe de uma peça gasta ajudam a decidir entre ajustar, recuperar ou fabricar uma reposição.</p>
              <a className="text-link" href="/recuperacao-de-eixos-e-buchas">Recuperação de eixos e buchas</a>
            </div>
          </div>
        </div>
      </section>
      <ContentQuote title="Orçamento de usinagem" message={whatsappMessage}>
        <p>Envie o desenho ou fotos da peça e informe a aplicação, a quantidade e as medidas disponíveis.</p>
      </ContentQuote>
    </ContentLayout>
  );
}
