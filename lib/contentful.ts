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

const CATEGORY_TAGS = [
  "whitepaper",
  "guide",
  "template",
  "video",
  "podcast",
  "checklist",
] as const;

export type ResourceCategory = (typeof CATEGORY_TAGS)[number];

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory | "other";
  fileUrl: string | null;
  fileName: string | null;
  contentType: string | null;
  createdAt: string;
}

export async function getResourceAssets(
  preview = false
): Promise<ResourceItem[]> {
  const client = getClient(preview);
  const res = await client.getAssets({
    "metadata.tags.sys.id[all]": ["resource"],
    order: ["-sys.createdAt"],
    limit: 100,
  });

  return res.items.map((asset) => {
    const tags =
      asset.metadata?.tags?.map((t) => t.sys.id) ?? [];
    const category =
      (CATEGORY_TAGS.find((c) => tags.includes(c)) as ResourceCategory) ??
      "other";

    const file = asset.fields?.file as
      | { url?: string; fileName?: string; contentType?: string }
      | undefined;

    return {
      id: asset.sys.id,
      title: (asset.fields?.title as string) ?? "Untitled",
      description: (asset.fields?.description as string) ?? "",
      category,
      fileUrl: file?.url ? `https:${file.url}` : null,
      fileName: file?.fileName ?? null,
      contentType: file?.contentType ?? null,
      createdAt: asset.sys.createdAt,
    };
  });
}
