import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug, getSiteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/hero";
import { TrainingPage } from "@/components/training-page";
import { ModuleRenderer } from "@/components/module-renderer";

type Params = Promise<{ slug: string }>;

export function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  return params.then(({ slug }) => {
    try {
      const [page, settings] = [getPageBySlug(`services/${slug}`), getSiteSettings()];
      if (page) {
        return buildMetadata({
          seo: page.seo ?? null,
          fallbackTitle: page.title ?? "Service",
          path: `/services/${slug}`,
          settings,
        });
      }
    } catch {
      // fall through
    }
    return { title: "Service Not Found" };
  });
}

export function generateStaticParams() {
  return [
    { slug: "understand-the-risk" },
    { slug: "build-the-foundations" },
    { slug: "stay-ahead-of-problems" },
    { slug: "prepare-for-change" },
    { slug: "payroll-training" },
    { slug: "payroll-remediation" },
  ];
}

export default async function ServiceDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const page = getPageBySlug(`services/${slug}`);

  if (!page) {
    notFound();
  }

  if (slug === "payroll-training") return <TrainingPage page={page} />;

  return (
    <>
      <Hero data={page.hero} />
      {page.sections && page.sections.length > 0 && (
        <ModuleRenderer sections={page.sections} />
      )}
    </>
  );
}
