import { Marked } from "marked";
import { landings } from "./serviceLandings";

export const blogCategories = [
  { slug: "usinagem-de-precisao", label: "Usinagem de precisão" },
  { slug: "cnc-e-fresamento", label: "CNC e fresamento" },
  { slug: "manutencao-e-recuperacao", label: "Manutenção e recuperação" },
  { slug: "guias", label: "Guias" },
] as const;
export const blogDescription = "Guias sobre usinagem sob desenho ou amostra, fabricação de peças e recuperação para manutenção industrial.";

type Category = (typeof blogCategories)[number];
type MarkdownPost = { data: Record<string, unknown>; content: string };
type PostHeading = { id: string; text: string };

export type Post = {
  slug: string;
  title: string;
  seoTitle: string;
  date: string;
  updated: string;
  category: Category;
  description: string;
  keyword: string;
  service: (typeof landings)[number];
  headings: PostHeading[];
  readingMinutes: number;
  introHtml: string;
  html: string;
};

const rawPosts = import.meta.glob<MarkdownPost>("../content/blog/*.md", {
  query: "?post", import: "default", eager: true,
});
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const dateFormat = new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeZone: "UTC" });
const words = new Intl.Segmenter("pt-BR", { granularity: "word" });

export function formatPostDate(date: string) {
  return dateFormat.format(new Date(date));
}

function slugify(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function isDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function parsePost(filename: string, { data, content }: MarkdownPost): Post {
  function field(key: string, maxLength = Infinity) {
    const value = data[key];
    if (typeof value !== "string" || !value.trim() || value.trim().length > maxLength) {
      throw new Error(`${filename}: campo '${key}' inválido.`);
    }
    return value.trim();
  }

  const slug = field("slug");
  const date = field("date");
  const updated = data.updated === undefined ? date : field("updated");
  const category = blogCategories.find((item) => item.label === data.category);
  const service = landings.find((item) => item.slug === data.service && item.indexable !== false);

  if (!slugPattern.test(slug) || !isDate(date) || !isDate(updated) || updated < date || !category || !service) {
    throw new Error(`${filename}: confira slug, datas, categoria e serviço relacionado.`);
  }

  const headings: PostHeading[] = [];
  const usedIds = new Set<string>();
  const markdown = new Marked({
    renderer: {
      heading({ depth, tokens }) {
        if (depth === 1) throw new Error(`${filename}: use o campo 'title' para o H1.`);
        const text = this.parser.parseInline(tokens, this.parser.textRenderer);
        const baseId = `secao-${slugify(text) || "artigo"}`;
        let id = baseId;
        for (let suffix = 2; usedIds.has(id); suffix++) id = `${baseId}-${suffix}`;
        usedIds.add(id);
        if (depth === 2) headings.push({ id, text });
        return `<h${depth} id="${id}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
      },
    },
  });
  const tokens = markdown.lexer(content);
  markdown.walkTokens(tokens, (token) => {
    if (token.type === "html") throw new Error(`${filename}: use Markdown no corpo do artigo.`);
    if (token.type === "link" || token.type === "image") {
      const href = token.href;
      if (/[\\\u0000-\u0020]/.test(href) || !/^(?:https?:\/\/|\/(?!\/)|#)/i.test(href)) {
        throw new Error(`${filename}: destino inválido em link ou imagem.`);
      }
    }
  });
  const firstHeading = tokens.findIndex((token) => token.type === "heading");
  const heading = tokens[firstHeading];
  const intro = tokens.slice(0, firstHeading);
  if (heading?.type !== "heading" || heading.depth !== 2 || intro.filter((token) => token.type === "paragraph").length < 2) {
    throw new Error(`${filename}: abra o artigo com dois parágrafos antes do primeiro H2.`);
  }
  const introHtml = markdown.parser(intro);
  const bodyHtml = markdown.parser(tokens.slice(firstHeading));
  const html = introHtml + bodyHtml;
  const text = html.replace(/<[^>]+>/g, " ").replace(/&(?:#x27|#39|apos);/g, "'").replace(/&[#a-z\d]+;/gi, " ");
  const wordCount = [...words.segment(text)].filter((segment) => segment.isWordLike).length;

  return {
    slug, date, updated, category, service, headings, introHtml, html: bodyHtml,
    title: field("title"),
    seoTitle: field("seoTitle", 60),
    description: field("description", 155),
    keyword: field("keyword"),
    readingMinutes: Math.max(1, Math.ceil(wordCount / 200)),
  };
}

export const posts = Object.entries(rawPosts).map(([filename, post]) => parsePost(filename, post))
  .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, "pt-BR"));

if (new Set(posts.map((post) => post.slug)).size !== posts.length) {
  throw new Error("Há artigos com o mesmo slug.");
}

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getRelatedPosts(post: Post) {
  const relevance = (other: Post) => Number(other.category === post.category) * 2 + Number(other.service === post.service);
  return posts.filter((other) => other !== post && relevance(other) > 0)
    .sort((a, b) => relevance(b) - relevance(a)).slice(0, 3);
}
