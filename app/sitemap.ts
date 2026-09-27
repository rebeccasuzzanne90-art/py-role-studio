import type { MetadataRoute } from "next";
import { courses } from "@/content/courses";
import path from "node:path";
import { getSitemapContent, type SitemapContentEntry } from "@/lib/sitemap-content";

const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.thepayrollstudio.com.au").replace(/\/+$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  // These routes are implemented in the app rather than MDX.
  const appPages = ["/payroll-training/courses", "/how-we-work", "/blog", "/resources", "/faq", "/contact", "/privacy"];
  const contentPages = getSitemapContent(path.join(process.cwd(), "content"), BASE_URL);
  const entries = new Map<string, MetadataRoute.Sitemap[number]>();
  const pages: SitemapContentEntry[] = [
    ...appPages.map(path => ({ path })),
    ...courses.map(course => ({ path: `/payroll-training/${course.slug}` })),
    ...contentPages,
  ];
  for (const page of pages) {
    const url = new URL(page.path, `${BASE_URL}/`).href;
    entries.set(url, {
      url,
      ...(page.lastModified ? { lastModified: page.lastModified } : {}),
    });
  }
  return [...entries.values()];
}
