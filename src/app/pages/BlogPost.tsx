import { BRAND } from "../content";
import { formatPostDate, getPost, getRelatedPosts } from "../blogPosts";
import { ContentLayout } from "../components/ContentLayout";
import { ContentQuote } from "../components/ContentQuote";
import { Cover, HERO_COVER_SIZES } from "../components/Cover";
import { PostCards } from "../components/PostCards";

export function BlogPost({ slug }: { slug: string }) {
  const post = getPost(slug);
  if (!post) {
    return (
      <ContentLayout activePage="blog">
        <section className="content-section catalog-intro">
          <h1>Artigo não encontrado</h1>
          <p><a href="/blog" className="text-link">Voltar ao blog</a></p>
        </section>
      </ContentLayout>
    );
  }

  const related = getRelatedPosts(post);
  const whatsappMessage = `Olá, li o artigo “${post.title}” e gostaria de um orçamento de usinagem.`;

  return (
    <ContentLayout activePage="blog" whatsappMessage={whatsappMessage}>
      <article aria-labelledby="post-title" data-measure-scroll="">
        <header className="content-section content-hero">
          <div className="content-width">
            <nav className="content-breadcrumb" aria-label="Caminho da página">
              <a href="/" className="text-link">Início</a><span aria-hidden="true">/</span>
              <a href="/blog" className="text-link">Blog</a><span aria-hidden="true">/</span>
              <a href={`/blog#${post.category.slug}`} className="text-link">{post.category.label}</a>
            </nav>
            <div className="content-hero-grid">
              <div>
                <h1 id="post-title">{post.title}</h1>
                <p className="section-lead">{post.description}</p>
                <p className="blog-meta blog-byline">
                  {BRAND} · <time dateTime={post.date}>{formatPostDate(post.date)}</time> · {post.readingMinutes} min de leitura
                  {post.date !== post.updated && <> · Atualizado em <time dateTime={post.updated}>{formatPostDate(post.updated)}</time></>}
                </p>
              </div>
              <Cover source={post.cover} sizes={HERO_COVER_SIZES} priority />
            </div>
          </div>
        </header>

        <div className="content-section">
          <div className="content-width reading-layout">
            <nav className="blog-toc" aria-labelledby="post-toc-title">
              <h2 id="post-toc-title">Neste artigo</h2>
              <ol>
                {post.headings.map(({ id, text }) => <li key={id}><a className="text-link" href={`#${id}`}>{text}</a></li>)}
              </ol>
            </nav>
            <div className="blog-prose" dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
        </div>
      </article>
      <ContentQuote title="Precisa usinar ou recuperar uma peça?" message={whatsappMessage}>
        <p>Serviço relacionado · <a href={`/${post.service.slug}`}>{post.service.cardTitle}</a></p>
      </ContentQuote>
      {related.length > 0 && (
        <section className="content-section" aria-labelledby="related-posts">
          <div className="content-width">
            <h2 id="related-posts">Artigos relacionados</h2>
            <PostCards posts={related} />
          </div>
        </section>
      )}
    </ContentLayout>
  );
}
