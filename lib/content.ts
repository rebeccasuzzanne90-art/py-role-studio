import fs from "fs";
import path from "path";
import matter from "gray-matter";
import yaml from "js-yaml";
import type {
  PageData,
  ArticleData,
  ArticleCardData,
  AuthorData,
  NavData,
  SiteSettingsData,
} from "@/types/content";

const CONTENT_DIR = path.join(process.cwd(), "content");

// ─── Helpers ────────────────────────────────────────────────────────

function readYaml<T>(relativePath: string): T {
  const fullPath = path.join(CONTENT_DIR, relativePath);
  const raw = fs.readFileSync(fullPath, "utf8");
  return yaml.load(raw) as T;
}

function readMdx<T>(relativePath: string): { data: T; content: string } {
  const fullPath = path.join(CONTENT_DIR, relativePath);
  const raw = fs.readFileSync(fullPath, "utf8");
  const parsed = matter(raw);
  return { data: parsed.data as T, content: parsed.content };
}

function fileExists(relativePath: string): boolean {
  return fs.existsSync(path.join(CONTENT_DIR, relativePath));
}

// ─── Site Settings ───────────────────────────────────────────────────

export function getSiteSettings(): SiteSettingsData {
  return readYaml<SiteSettingsData>("settings.yaml");
}

// ─── Navigation ──────────────────────────────────────────────────────

export function getNavigation(): NavData {
  const raw = readYaml<{
    logoPath?: string;
    links: NavData["links"];
    primaryCta?: { label: string; href: string };
  }>("navigation.yaml");

  return {
    logoPath: raw.logoPath,
    links: raw.links ?? [],
    ctaLabel: raw.primaryCta?.label,
    ctaHref: raw.primaryCta?.href,
  };
}

// ─── Pages ───────────────────────────────────────────────────────────

export function getPageBySlug(slug: string): PageData | null {
  const filePath = `pages/${slug}.mdx`;
  if (!fileExists(filePath)) return null;
  const { data } = readMdx<PageData>(filePath);
  return data;
}

// ─── Articles ────────────────────────────────────────────────────────

function resolveAuthor(slugOrObj: string | AuthorData | undefined): AuthorData | undefined {
  if (!slugOrObj) return undefined;
  // If it's already an object (e.g. from inline frontmatter), return as-is
  if (typeof slugOrObj === "object") return slugOrObj;
  const filePath = `blog/authors/${slugOrObj}.yaml`;
  if (!fileExists(filePath)) return undefined;
  return readYaml<AuthorData>(filePath);
}

export function getAllArticles(): ArticleCardData[] {
  const dir = path.join(CONTENT_DIR, "blog", "posts");
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const { data } = readMdx<ArticleData>(`blog/posts/${file}`);
      return {
        slug: data.slug ?? file.replace(/\.mdx$/, ""),
        title: data.title ?? "",
        excerpt: data.excerpt,
        category: data.category,
        imagePath: data.imagePath,
        publishDate: data.publishDate,
      } satisfies ArticleCardData & { publishDate?: string };
    })
    .sort((a, b) => {
      const da = (a as { publishDate?: string }).publishDate
        ? new Date((a as { publishDate?: string }).publishDate!).getTime()
        : 0;
      const db = (b as { publishDate?: string }).publishDate
        ? new Date((b as { publishDate?: string }).publishDate!).getTime()
        : 0;
      return db - da;
    })
    .map(({ publishDate: _pd, ...rest }) => rest) as ArticleCardData[];
}

export function getArticleBySlug(slug: string): ArticleData | null {
  const filePath = `blog/posts/${slug}.mdx`;
  if (!fileExists(filePath)) return null;
  const { data, content } = readMdx<ArticleData>(filePath);
  const author = resolveAuthor(data.author as unknown as string | AuthorData | undefined);
  return { ...data, author, body: content };
}
