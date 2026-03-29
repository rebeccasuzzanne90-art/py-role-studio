import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug, getSiteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/hero";
import { ModuleRenderer } from "@/components/module-renderer";

type Params = Promise<{ slug: string[] }>;

export function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const fullSlug = slug.join("/");
    try {
      const [page, settings] = [getPageBySlug(fullSlug), getSiteSettings()];
      if (page) {
        return buildMetadata({
          seo: page.seo ?? null,
          fallbackTitle: page.title ?? "Page",
          path: `/${fullSlug}`,
          settings,
        });
      }
    } catch {
      // fall through
    }
    return { title: "Page Not Found" };
  });
}

export default async function CatchAllPage({ params }: { params: Params }) {
  const { slug } = await params;
  const fullSlug = slug.join("/");

  const page = getPageBySlug(fullSlug);

  if (!page) {
    notFound();
  }

  return (
    <>
      <Hero data={page.hero} />
      {page.sections && page.sections.length > 0 && (
        <ModuleRenderer sections={page.sections} />
      )}
    </>
  );
}
