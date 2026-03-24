import { createClient, type EntrySkeletonType } from "contentful";

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!;
const previewToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;

function getClient(preview = false) {
  return createClient({
    space,
    accessToken: preview && previewToken ? previewToken : accessToken,
    host: preview ? "preview.contentful.com" : "cdn.contentful.com",
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Q = Record<string, any>;

async function getEntries<T extends EntrySkeletonType>(
  preview: boolean,
  query: Q
) {
  const client = getClient(preview);
  return client.getEntries<T>(query);
}

export async function getPageBySlug(slug: string, preview = false) {
  const res = await getEntries(preview, {
    content_type: "page",
    "fields.slug": slug,
    include: 10,
    limit: 1,
  });
  return res.items[0] ?? null;
}

export async function getSiteSettings(preview = false) {
  const res = await getEntries(preview, {
    content_type: "siteSettings",
    limit: 1,
    include: 2,
  });
  return res.items[0] ?? null;
}

export async function getNavigation(preview = false) {
  const res = await getEntries(preview, {
    content_type: "navigation",
    include: 3,
    limit: 1,
  });
  return res.items[0] ?? null;
}

export async function getAllServices(preview = false) {
  const res = await getEntries(preview, {
    content_type: "service",
    order: ["fields.title"],
    include: 2,
  });
  return res.items;
}

export async function getServiceBySlug(slug: string, preview = false) {
  const res = await getEntries(preview, {
    content_type: "service",
    "fields.slug": slug,
    include: 2,
    limit: 1,
  });
  return res.items[0] ?? null;
}

export async function getAllArticles(preview = false) {
  const res = await getEntries(preview, {
    content_type: "article",
    order: ["-fields.publishDate"],
    include: 2,
  });
  return res.items;
}

export async function getArticleBySlug(slug: string, preview = false) {
  const res = await getEntries(preview, {
    content_type: "article",
    "fields.slug": slug,
    include: 2,
    limit: 1,
  });
  return res.items[0] ?? null;
}

export async function getAllTestimonials(preview = false) {
  const res = await getEntries(preview, {
    content_type: "testimonial",
    include: 2,
  });
  return res.items;
}
