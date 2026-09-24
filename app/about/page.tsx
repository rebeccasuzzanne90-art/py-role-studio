import type { Metadata } from "next";
import Image from "next/image";
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
      <section aria-labelledby="payroll-community-heading" className="border-b px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Industry connections</p>
          <h2 id="payroll-community-heading" className="mt-3 font-heading text-3xl sm:text-4xl">Part of the payroll community.</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">Moments from the Australian Payroll Summit in Sydney.</p>
          <div className="mt-8 grid items-start gap-6 md:grid-cols-[16fr_9fr]">
            <figure>
              <Image src="/images/events/payroll-summit-2026/payroll-summit-conversation.jpg" alt="Two attendees at the Australian Payroll Summit event backdrop" width={2048} height={1536} sizes="(min-width: 1280px) 800px, (min-width: 768px) 62vw, 100vw" className="h-auto w-full rounded-sm" />
            </figure>
            <figure>
              <Image src="/images/events/payroll-summit-2026/payroll-summit-group-portrait.jpg" alt="Four attendees posing together at the Australian Payroll Summit in Sydney" width={1536} height={2048} sizes="(min-width: 1280px) 450px, (min-width: 768px) 35vw, 100vw" className="h-auto w-full rounded-sm" />
            </figure>
          </div>
        </div>
      </section>
      {page?.sections && page.sections.length > 0 && (
        <ModuleRenderer sections={page.sections} />
      )}
    </>
  );
}
