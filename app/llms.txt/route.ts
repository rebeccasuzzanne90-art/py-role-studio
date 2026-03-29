import { getAllArticles, getSiteSettings } from "@/lib/content";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thepayrollstudio.com";

const SERVICES = [
  { title: "HIPAA Compliance", slug: "hipaa", description: "Expert HIPAA compliance consulting and risk assessment." },
  { title: "ISO 27001 & ISO 42001", slug: "iso-27001", description: "ISO 27001 certification guidance and ISMS design." },
  { title: "SOC2 Compliance", slug: "soc2", description: "SOC2 Type I and Type II audit preparation and support." },
  { title: "GDPR Compliance", slug: "gdpr", description: "GDPR data protection strategy and implementation." },
  { title: "HITRUST Certification", slug: "hitrust", description: "HITRUST CSF readiness assessment and certification support." },
  { title: "Data Security Audits", slug: "data-security-audits", description: "Comprehensive vulnerability assessments and security audits." },
  { title: "Fractional CISO", slug: "fractional-ciso", description: "On-demand CISO expertise for your organization." },
  { title: "Penetration Testing", slug: "pen-tests", description: "External, internal, and web application penetration testing." },
  { title: "Disaster Recovery", slug: "disaster-recovery", description: "Business continuity and disaster recovery planning." },
  { title: "Team Training", slug: "team-training", description: "Security awareness training and phishing simulations." },
];

export function GET() {
  let siteName = "The Payroll Studio";
  let siteDescription = "Payroll compliance and governance support.";

  try {
    const settings = getSiteSettings();
    if (settings.siteName) siteName = settings.siteName;
    if (settings.defaultMetaDescription) siteDescription = settings.defaultMetaDescription;
  } catch {
    // use defaults
  }

  const lines: string[] = [
    `# ${siteName}`,
    `> ${siteDescription}`,
    "",
    "## About",
    `${siteName} provides payroll compliance consulting and governance support for businesses of all sizes.`,
    "",
    "## Links",
    `- Homepage: ${BASE_URL}/`,
    `- Services: ${BASE_URL}/services`,
    `- Blog: ${BASE_URL}/blog`,
    `- Contact: ${BASE_URL}/contact`,
    "",
    "## Services",
  ];

  for (const svc of SERVICES) {
    lines.push(`- [${svc.title}](${BASE_URL}/services/${svc.slug}): ${svc.description}`);
  }
  lines.push("");

  try {
    const articles = getAllArticles();
    if (articles.length > 0) {
      lines.push("## Articles & Resources");
      for (const art of articles.slice(0, 20)) {
        lines.push(`- [${art.title}](${BASE_URL}/blog/${art.slug})${art.excerpt ? `: ${art.excerpt.slice(0, 200)}` : ""}`);
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
