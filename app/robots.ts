import { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/contentful";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://vanreincompliance.com";

  let aiPolicy: string | undefined;
  try {
    const settings = await getSiteSettings();
    if (settings?.fields) {
      aiPolicy = (settings.fields as Record<string, unknown>)
        .aiCrawlerPolicy as string | undefined;
    }
  } catch {
    // defaults
  }

  const AI_BOTS = [
    "GPTBot",
    "ChatGPT-User",
    "Google-Extended",
    "ClaudeBot",
    "anthropic-ai",
    "PerplexityBot",
    "Bytespider",
    "CCBot",
  ];

  const rules: MetadataRoute.Robots["rules"] = [
    {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/portal/", "/api/"],
    },
  ];

  if (aiPolicy === "block-all") {
    for (const bot of AI_BOTS) {
      rules.push({ userAgent: bot, disallow: "/" });
    }
  } else if (aiPolicy === "selective") {
    const blocked = ["Bytespider", "CCBot"];
    for (const bot of blocked) {
      rules.push({ userAgent: bot, disallow: "/" });
    }
  }

  return {
    rules,
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
