import type { Entry, Asset, EntrySkeletonType } from "contentful";
import type {
  NavigationFields,
  NavigationLinkFields,
  CtaFields,
  SiteSettingsFields,
} from "@/types/contentful";

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  children?: NavLink[];
}

export interface NavData {
  logoUrl?: string;
  logoAlt?: string;
  links: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
}

function resolveLink(entry: Entry<EntrySkeletonType>): NavLink | null {
  const f = entry.fields as unknown as NavigationLinkFields;
  if (!f?.label || !f?.url) return null;

  const children: NavLink[] = [];
  if (f.children && Array.isArray(f.children)) {
    for (const child of f.children) {
      if (!child || !("fields" in child)) continue;
      const parsed = resolveLink(child as Entry<EntrySkeletonType>);
      if (parsed) children.push(parsed);
    }
  }

  return {
    label: f.label,
    href: f.url,
    external: f.external || false,
    ...(children.length > 0 ? { children } : {}),
  };
}

export function parseNavigation(
  navEntry: Entry<EntrySkeletonType>,
  settings?: SiteSettingsFields | null
): NavData {
  const fields = navEntry.fields as unknown as NavigationFields;

  const links: NavLink[] = [];
  if (fields.links && Array.isArray(fields.links)) {
    for (const linkEntry of fields.links) {
      if (!linkEntry || !("fields" in linkEntry)) continue;
      const parsed = resolveLink(linkEntry as Entry<EntrySkeletonType>);
      if (parsed) links.push(parsed);
    }
  }

  let ctaLabel: string | undefined;
  let ctaHref: string | undefined;
  if (fields.primaryCta && "fields" in fields.primaryCta) {
    const ctaF = fields.primaryCta.fields as unknown as CtaFields;
    ctaLabel = ctaF?.label;
    ctaHref = ctaF?.url;
  }

  let logoUrl: string | undefined;
  let logoAlt: string | undefined;

  const navLogo = fields.logo as unknown as Asset | undefined;
  const settingsLogo = settings?.logo as unknown as Asset | undefined;
  const logo = navLogo || settingsLogo;
  if (logo && "fields" in logo) {
    const file = logo.fields?.file as
      | { url?: string }
      | undefined;
    if (file?.url) {
      logoUrl = file.url.startsWith("//") ? `https:${file.url}` : file.url;
    }
    logoAlt =
      (logo.fields?.title as string | undefined) ?? "VanRein Compliance";
  }

  return { logoUrl, logoAlt, links, ctaLabel, ctaHref };
}
