import type { Metadata } from "next";
import type { SeoData, SiteSettingsData, AuthorData } from "@/types/content";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vanreincompliance.com";

// ─── Metadata builder ────────────────────────────────────────────────

interface BuildMetadataOpts {
  seo?: SeoData | null;
  fallbackTitle: string;
  fallbackDescription?: string;
  path: string;
  settings?: SiteSettingsData | null;
}

export function buildMetadata(opts: BuildMetadataOpts): Metadata {
  const seo = opts.seo;
  const s = opts.settings;

  const template = s?.titleTemplate
    ? `%s | ${s.titleTemplate}`
    : "%s | The Payroll Studio";
  const title = seo?.metaTitle ?? opts.fallbackTitle;
  const description =
    seo?.metaDescription ??
    opts.fallbackDescription ??
    s?.defaultMetaDescription ??
    "";

  const ogImageUrl = seo?.ogImagePath ?? undefined;
  const canonical = seo?.canonicalUrl ?? `${BASE_URL}${opts.path}`;

  const robots: Metadata["robots"] = {};
  if (seo?.noIndex) robots.index = false;
  if (seo?.noFollow) robots.follow = false;

  return {
    title: template.replace("%s", title),
    description,
    keywords: seo?.keywords,
    alternates: { canonical },
    robots,
    openGraph: {
      title: seo?.ogTitle ?? title,
      description: seo?.ogDescription ?? description,
      url: canonical,
      siteName: s?.siteName ?? "The Payroll Studio",
      ...(ogImageUrl ? { images: [{ url: ogImageUrl }] } : {}),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.ogTitle ?? title,
      description: seo?.ogDescription ?? description,
      ...(ogImageUrl ? { images: [ogImageUrl] } : {}),
    },
  };
}

// ─── JSON-LD generators ──────────────────────────────────────────────

export function organizationJsonLd(settings?: SiteSettingsData | null) {
  if (!settings) return null;
  const logoUrl = settings.logoPath
    ? `${BASE_URL}${settings.logoPath}`
    : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.siteName,
    url: BASE_URL,
    logo: logoUrl,
    sameAs: [
      settings.socialLinkedin,
      settings.socialFacebook,
      settings.socialInstagram,
      settings.socialX,
      settings.socialYoutube,
    ].filter(Boolean),
  };
}

export function webPageJsonLd(opts: {
  title: string;
  description?: string;
  path: string;
  type?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": opts.type ?? "WebPage",
    name: opts.title,
    description: opts.description,
    url: `${BASE_URL}${opts.path}`,
  };
}

export function articleJsonLd(opts: {
  title: string;
  description?: string;
  path: string;
  publishDate?: string;
  modifiedDate?: string;
  author?: AuthorData | null;
  imageUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: `${BASE_URL}${opts.path}`,
    ...(opts.publishDate ? { datePublished: opts.publishDate } : {}),
    ...(opts.modifiedDate ? { dateModified: opts.modifiedDate } : {}),
    ...(opts.imageUrl ? { image: opts.imageUrl } : {}),
    ...(opts.author
      ? {
          author: {
            "@type": "Person",
            name: opts.author.name,
            ...(opts.author.role ? { jobTitle: opts.author.role } : {}),
            ...(opts.author.linkedIn ? { url: opts.author.linkedIn } : {}),
          },
        }
      : {}),
    publisher: {
      "@type": "Organization",
      name: "The Payroll Studio",
      url: BASE_URL,
    },
  };
}

export function serviceJsonLd(opts: {
  title: string;
  description?: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.title,
    description: opts.description,
    url: `${BASE_URL}${opts.path}`,
    provider: {
      "@type": "Organization",
      name: "The Payroll Studio",
      url: BASE_URL,
    },
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${BASE_URL}${c.path}`,
    })),
  };
}
