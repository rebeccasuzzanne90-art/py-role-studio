import { getAllArticles, getAllServices, getSiteSettings } from "@/lib/contentful";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vanreincompliance.com";

export async function GET() {
  let siteName = "VanRein Compliance";
  let siteDescription = "Compliance and data security consulting services.";

  try {
    const settings = await getSiteSettings();
    if (settings?.fields) {
      const f = settings.fields as Record<string, unknown>;
      if (f.siteName) siteName = f.siteName as string;
      if (f.defaultMetaDescription) siteDescription = f.defaultMetaDescription as string;
    }
  } catch {
    // use defaults
  }

  const lines: string[] = [
    `# ${siteName}`,
    `> ${siteDescription}`,
    "",
    `## About`,
    `${siteName} provides compliance consulting, data security audits, and regulatory framework implementation for businesses of all sizes.`,
    "",
    `## Links`,
    `- Homepage: ${BASE_URL}/`,
    `- Services: ${BASE_URL}/services`,
    `- Resources: ${BASE_URL}/blog`,
    `- Contact: ${BASE_URL}/contact`,
    "",
  ];

  try {
    const services = await getAllServices();
    if (services.length > 0) {
      lines.push("## Services");
      for (const svc of services) {
        const f = svc.fields as Record<string, unknown>;
        const title = f.title as string;
        const slug = f.slug as string;
        const desc = f.shortDescription as string | undefined;
        lines.push(`- [${title}](${BASE_URL}/services/${slug})${desc ? `: ${desc.slice(0, 200)}` : ""}`);
      }
      lines.push("");
    }
  } catch {
    // skip
  }

  try {
    const articles = await getAllArticles();
    if (articles.length > 0) {
      lines.push("## Articles & Resources");
      for (const art of articles.slice(0, 20)) {
        const f = art.fields as Record<string, unknown>;
        const title = f.title as string;
        const slug = f.slug as string;
        const summary = (f.summary as string | undefined) || (f.excerpt as string | undefined);
        lines.push(`- [${title}](${BASE_URL}/blog/${slug})${summary ? `: ${summary.slice(0, 200)}` : ""}`);
      }
      lines.push("");
    }
  } catch {
    // skip
  }

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
