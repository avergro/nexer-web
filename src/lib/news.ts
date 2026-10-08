import fs from "fs";
import path from "path";
import matter from "gray-matter";

const NEWS_DIR = path.join(process.cwd(), "content/news");

export interface NewsPost {
  slug: string;
  title: string;
  dateISO: string;
  category?: string;
  zone?: string;
  excerpt?: string;
  image?: string;
  author?: string;
}

export interface NewsPostFull extends NewsPost {
  content: string;
}

function getMarkdownPosts(): NewsPost[] {
  if (!fs.existsSync(NEWS_DIR)) return [];

  const files = fs
    .readdirSync(NEWS_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  return files.map((filename) => {
    const raw = fs.readFileSync(path.join(NEWS_DIR, filename), "utf8");
    const { data } = matter(raw);
    const rawDate = data.date
      ? new Date(data.date as string).toISOString()
      : new Date().toISOString();
    return {
      slug: filename.replace(/\.(md|mdx)$/, ""),
      title: (data.title as string) ?? "Sin título",
      dateISO: rawDate,
      category: data.category as string | undefined,
      zone: data.zone as string | undefined,
      excerpt: data.excerpt as string | undefined,
      image: data.image as string | undefined,
      author: data.author as string | undefined,
    };
  });
}

function getDbPosts(): NewsPost[] {
  try {
    // Dynamic require to avoid edge-runtime issues
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { getPublishedNews } = require("./db-news") as typeof import("./db-news");
    return getPublishedNews().map((n) => ({
      slug: n.slug,
      title: n.title,
      dateISO: new Date(n.date).toISOString(),
      category: n.category ?? undefined,
      zone: n.zone,
      excerpt: n.excerpt ?? undefined,
      image: n.image ?? undefined,
      author: n.author ?? undefined,
    }));
  } catch {
    return [];
  }
}

export async function getNewsPosts(): Promise<NewsPost[]> {
  const mdPosts = getMarkdownPosts();
  const dbPosts = getDbPosts();

  // DB posts take precedence; markdown fills the rest
  const slugs = new Set(dbPosts.map((p) => p.slug));
  const merged = [...dbPosts, ...mdPosts.filter((p) => !slugs.has(p.slug))];

  return merged.sort(
    (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
  );
}

function getMarkdownFileForSlug(slug: string): string | undefined {
  const candidates = [".md", ".mdx"].map((ext) => path.join(NEWS_DIR, `${slug}${ext}`));
  return candidates.find((p) => fs.existsSync(p));
}

export function getAllNewsSlugs(): string[] {
  if (!fs.existsSync(NEWS_DIR)) return [];
  return fs
    .readdirSync(NEWS_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => f.replace(/\.(md|mdx)$/, ""));
}

export function getNewsPostBySlug(slug: string): NewsPostFull | undefined {
  const file = getMarkdownFileForSlug(slug);
  if (!file) return undefined;

  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);

  const rawDate = data.date
    ? new Date(data.date as string).toISOString()
    : new Date().toISOString();

  return {
    slug,
    title: (data.title as string) ?? "Sin título",
    dateISO: rawDate,
    category: data.category as string | undefined,
    zone: data.zone as string | undefined,
    excerpt: data.excerpt as string | undefined,
    image: data.image as string | undefined,
    author: data.author as string | undefined,
    content: content ?? "",
  };
}
