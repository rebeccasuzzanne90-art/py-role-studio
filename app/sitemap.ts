import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vanreincompliance.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/about",
    "/services",
    "/blog",
    "/resources",
    "/faq",
    "/contact",
    "/shop",
  ];

  const servicePages = [
    "hipaa",
    "iso-27001",
    "soc2",
    "gdpr",
    "hitrust",
    "data-security-audits",
    "fractional-ciso",
    "pen-tests",
    "disaster-recovery",
    "team-training",
  ];

  return [
    ...staticPages.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...servicePages.map((slug) => ({
      url: `${BASE_URL}/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
