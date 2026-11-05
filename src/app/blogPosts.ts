import matter from "gray-matter";
import { marked } from "marked";

import oQueE from "../content/blog/o-que-e-usinagem.md?raw";
import convVsCnc from "../content/blog/usinagem-convencional-vs-cnc.md?raw";
import recuperacao from "../content/blog/recuperacao-de-eixos-e-buchas.md?raw";

const rawPosts = [oQueE, convVsCnc, recuperacao];

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  description: string;
  html: string;
};

function slugify(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export const posts: Post[] = rawPosts.map((raw) => {
  const { data, content } = matter(raw);
  const title = String(data.title);
  return {
    slug: slugify(title),
    title,
    date: String(data.date),
    category: String(data.category),
    description: String(data.description),
    html: marked.parse(content) as string,
  };
});

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}