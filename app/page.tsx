import type { Metadata } from "next";
import { getPageBySlug, getSiteSettings } from "@/lib/content";
import { buildMetadata, webPageJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { ModuleRenderer } from "@/components/module-renderer";
import { Hero } from "@/components/hero";

export function generateMetadata(): Metadata {
  try {
    const [page, settings] = [getPageBySlug("home"), getSiteSettings()];
    return buildMetadata({
      seo: page?.seo ?? null,
      fallbackTitle: "The Payroll Studio",
      fallbackDescription: settings.defaultMetaDescription,
      path: "/",
      settings,
    });
  } catch {
    return { title: "The Payroll Studio" };
  }
}

export default function HomePage() {
  const page = getPageBySlug("home");

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          title: page?.title ?? "Home",
          description: page?.seo?.metaDescription,
          path: "/",
        })}
      />
      <Hero data={page?.hero} />
      {page?.sections && page.sections.length > 0 && (
        <ModuleRenderer sections={page.sections} />
      )}
    </>
  );
}
