import { Fragment } from "react";
import { blogCategories, blogDescription, formatPostDate, posts } from "../blogPosts";
import { ContactActions } from "../components/ContactActions";
import { ContentLayout } from "../components/ContentLayout";

export function BlogIndex() {
  const whatsappMessage = "Olá, vi o blog da Duhelo e gostaria de solicitar um orçamento de usinagem.";
  const middleCategoryIndex = Math.ceil(blogCategories.length / 2) - 1;

  return (
    <ContentLayout activePage="blog" whatsappMessage={whatsappMessage}>
      <section className="zone-section" aria-labelledby="blog-title">
        <div className="blog-width">
          <h1 id="blog-title" className="blog-title">Blog da Duhelo Usinagem</h1>
          <p className="section-lead blog-summary">{blogDescription}</p>
          <nav className="blog-categories" aria-label="Categorias do blog">
            <ul>
              {blogCategories.map((category) => (
                <li key={category.slug}><a className="text-link" href={`#${category.slug}`}>{category.label}</a></li>
              ))}
            </ul>
          </nav>
          <a href="/blog/feed.xml" className="text-link">Acompanhar pelo RSS</a>
        </div>
      </section>
      {blogCategories.map((category, index) => (
        <Fragment key={category.slug}>
          <section id={category.slug} className="zone-section blog-category" aria-labelledby={`categoria-${category.slug}`}>
            <div className="blog-width">
              <h2 id={`categoria-${category.slug}`}>{category.label}</h2>
              <ul className="blog-cards">
                {posts.filter((post) => post.category === category).map((post) => (
                  <li key={post.slug}>
                    <article className="blog-card">
                      <h3><a className="text-link" href={`/blog/${post.slug}`}>{post.title}</a></h3>
                      <p>{post.description}</p>
                      <p className="blog-meta"><time dateTime={post.date}>{formatPostDate(post.date)}</time> · {post.readingMinutes} min de leitura</p>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          {index === middleCategoryIndex && (
            <section className="zone-section blog-cta" aria-labelledby="blog-cta-middle">
              <div className="blog-width">
                <h2 id="blog-cta-middle">Precisa fabricar uma peça sob medida?</h2>
                <ContactActions message={whatsappMessage} position="middle" />
              </div>
            </section>
          )}
        </Fragment>
      ))}
      <section className="zone-section blog-cta" aria-labelledby="blog-cta-end">
        <div className="blog-width">
          <h2 id="blog-cta-end">Orçamento de usinagem ou recuperação</h2>
          <ContactActions message={whatsappMessage} position="end" />
        </div>
      </section>
    </ContentLayout>
  );
}
