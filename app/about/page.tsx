import type { Metadata } from "next";
import { getPageBySlug, getSiteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/hero";
import { ModuleRenderer } from "@/components/module-renderer";

export function generateMetadata(): Metadata {
  try {
    const [page, settings] = [getPageBySlug("about"), getSiteSettings()];
    return buildMetadata({
      seo: page?.seo ?? null,
      fallbackTitle: "About | The Payroll Studio",
      fallbackDescription: "Learn about The Payroll Studio.",
      path: "/about",
      settings,
    });
  } catch {
    return { title: "About | The Payroll Studio" };
  }
}

export default function AboutPage() {
  const page = getPageBySlug("about");

  return (
    <>
      <Hero data={page?.hero} />
      {page?.sections && page.sections.length > 0 && (
        <ModuleRenderer sections={page.sections} />
      )}
    </>
  );
}
