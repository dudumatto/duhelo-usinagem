import { BRAND, CITY, WHATSAPP_LINK } from "../content";
import { posts } from "../blogPosts";
import { Logo } from "../components/Logo";
import { WhatsAppIcon } from "../components/WhatsAppIcon";

export function BlogIndex() {
  const categories = Array.from(new Set(posts.map((p) => p.category)));
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
          <section className="zone-section" aria-labelledby="blog-title">
            <div className="section-head">
              <h1 id="blog-title">Blog da Duhelo Usinagem</h1>
              <p>Conteúdo técnico sobre usinagem, processos e manutenção de peças industriais.</p>
            </div>
            <p className="section-lead">Categorias: {categories.join(" · ")}</p>
          </section>
          <section className="zone-section" aria-labelledby="posts-title">
            <h2 id="posts-title">Artigos recentes</h2>
            <ul>
              {posts.map((p) => (
                <li key={p.slug}>
                  <a href={`/blog/${p.slug}`} className="text-link"><strong>{p.title}</strong></a>
                  <p>{p.description}</p>
                  <small>{p.date} · {p.category}</small>
                </li>
              ))}
            </ul>
          </section>
        </main>
        <footer className="site-footer">
          <Logo className="logo logo-footer" />
          <div className="footer-text">
            <p><strong>{BRAND}</strong> · Usinagem, ferramentaria e manutenção industrial em {CITY}.</p>
          </div>
        </footer>
      </div>
    </>
  );
}