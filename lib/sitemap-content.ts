import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type SitemapContentEntry = { path: string; lastModified?: string };

// Use file paths because the page loaders resolve MDX by filename, including nested pages.
export function getSitemapContent(contentDir: string, baseUrl: string): SitemapContentEntry[] {
  function walk(dir: string, prefix: string): SitemapContentEntry[] {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
      const file = path.join(dir, entry.name);
      const route = `${prefix}/${entry.name.replace(/\.mdx$/, "")}`;
      if (entry.isDirectory()) return walk(file, route);
      if (!entry.name.endsWith(".mdx")) return [];
      const { data } = matter(fs.readFileSync(file, "utf8"));
      const urlPath = route === "/home" ? "/" : route;
      if (/^\/(admin|portal|api)(\/|$)/.test(urlPath) || data.seo?.noIndex) return [];
      const url = new URL(urlPath, baseUrl).href;
      if (data.seo?.canonicalUrl && new URL(data.seo.canonicalUrl, baseUrl).href !== url) return [];
      const date = data.modifiedDate ?? data.publishDate;
      const lastModified = date && Number.isFinite(new Date(date).getTime())
        ? new Date(date).toISOString() : undefined;
      return [{ path: urlPath, ...(lastModified ? { lastModified } : {}) }];
    });
  }
  return [...walk(path.join(contentDir, "pages"), ""), ...walk(path.join(contentDir, "blog/posts"), "/blog")];
}
