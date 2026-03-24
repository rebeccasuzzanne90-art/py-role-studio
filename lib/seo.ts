import type { Metadata } from "next";
import type { Entry, Asset } from "contentful";
import type {
  SeoFields,
  SeoSkeleton,
  SiteSettingsFields,
  AuthorFields,
  AuthorSkeleton,
} from "@/types/contentful";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vanreincompliance.com";

function assetUrl(asset?: Asset): string | undefined {
  const raw = asset?.fields?.file?.url;
  if (!raw) return undefined;
  const url = typeof raw === "string" ? raw : String(raw);
  return url.startsWith("//") ? `https:${url}` : url;
}

// ─── Metadata builder ────────────────────────────────────────────────

interface BuildMetadataOpts {
  seoEntry?: Entry<SeoSkeleton> | null;
  fallbackTitle: string;
  fallbackDescription?: string;
  path: string;
  settings?: SiteSettingsFields | null;
}

export function buildMetadata(opts: BuildMetadataOpts): Metadata {
  const seo = opts.seoEntry?.fields as SeoFields | undefined;
  const s = opts.settings;

  const template = s?.titleTemplate ?? "%s | VanRein Compliance";
  const title = seo?.metaTitle ?? opts.fallbackTitle;
  const description =
    seo?.metaDescription ?? opts.fallbackDescription ?? s?.defaultMetaDescription ?? "";

  const ogImageUrl =
    assetUrl(seo?.ogImage as Asset | undefined) ??
    assetUrl(s?.defaultOgImage as Asset | undefined);

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
      siteName: s?.siteName ?? "VanRein Compliance",
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

export function organizationJsonLd(settings?: SiteSettingsFields | null) {
  if (!settings) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.siteName,
    url: BASE_URL,
    logo: assetUrl(settings.logo as Asset | undefined),
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
  authorEntry?: Entry<AuthorSkeleton> | null;
  imageUrl?: string;
}) {
  const author = opts.authorEntry?.fields as AuthorFields | undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: `${BASE_URL}${opts.path}`,
    ...(opts.publishDate
      ? { datePublished: opts.publishDate }
      : {}),
    ...(opts.modifiedDate
      ? { dateModified: opts.modifiedDate }
      : {}),
    ...(opts.imageUrl ? { image: opts.imageUrl } : {}),
    ...(author
      ? {
          author: {
            "@type": "Person",
            name: author.name,
            ...(author.role ? { jobTitle: author.role } : {}),
            ...(author.linkedIn ? { url: author.linkedIn } : {}),
          },
        }
      : {}),
    publisher: {
      "@type": "Organization",
      name: "VanRein Compliance",
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
      name: "VanRein Compliance",
      url: BASE_URL,
    },
  };
}

export function faqJsonLd(
  items: { question: string; answer: string }[]
) {
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

export function breadcrumbJsonLd(
  crumbs: { name: string; path: string }[]
) {
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
