import { blogCategories, blogDescription, posts } from "../blogPosts";
import { ContentLayout } from "../components/ContentLayout";
import { ContentQuote } from "../components/ContentQuote";
import { PostCards } from "../components/PostCards";
import { ServiceCards } from "../components/ServiceCards";
import { landings } from "../serviceLandings";
import { Rss } from "lucide-react";

export function BlogIndex() {
  const whatsappMessage = "Olá, vi o blog da Duhelo e gostaria de solicitar um orçamento de usinagem.";

  return (
    <ContentLayout activePage="blog" whatsappMessage={whatsappMessage}>
      <header className="content-section content-hero catalog-intro">
        <div className="content-width">
          <h1>Serviços e blog de usinagem</h1>
          <p className="section-lead">{blogDescription}</p>
          <div className="catalog-actions">
            <a className="btn btn-primary" href="#servicos">Conheça nossos serviços</a>
            <a className="btn btn-ghost" href="#artigos">Ver artigos</a>
            <a className="btn btn-ghost" href="/blog/feed.xml">
              <Rss className="icon" aria-hidden="true" /> Acompanhar pelo RSS
            </a>
          </div>
        </div>
      </header>
      <section id="servicos" className="content-section" aria-labelledby="catalog-services">
        <div className="content-width">
          <h2 id="catalog-services">Serviços da Duhelo</h2>
          <ServiceCards items={landings} />
        </div>
      </section>
      <section id="artigos" className="content-section content-panel catalog-intro" aria-labelledby="catalog-articles">
        <div className="content-width">
          <h2 id="catalog-articles">Artigos de usinagem</h2>
          <nav className="blog-categories" aria-label="Assuntos do blog">
            <ul>
              {blogCategories.map((category) => (
                <li key={category.slug}><a className="btn btn-ghost" href={`#${category.slug}`}>{category.label}</a></li>
              ))}
            </ul>
          </nav>
          <p className="catalog-image-note">O blog usa imagens ilustrativas de processos e componentes.</p>
        </div>
      </section>
      {blogCategories.map((category) => (
        <section key={category.slug} id={category.slug} className="content-section" aria-labelledby={`categoria-${category.slug}`}>
          <div className="content-width">
            <h2 id={`categoria-${category.slug}`}>{category.label}</h2>
            <PostCards posts={posts.filter((post) => post.category === category)} showCover />
          </div>
        </section>
      ))}
      <ContentQuote title="Orçamento de usinagem ou recuperação" message={whatsappMessage} />
    </ContentLayout>
  );
}
