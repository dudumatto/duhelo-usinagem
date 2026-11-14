export function getBlogCover(slug: string, alt: string) {
  return { path: `/images/blog/${slug}.webp`, alt, width: 600, height: 360 };
}
