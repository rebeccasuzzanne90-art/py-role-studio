import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
        <>
          <ModuleRenderer sections={page.sections.slice(0, 2)} />
          <section aria-labelledby="meet-rebecca-heading" className="bg-[#111111] px-4 py-14 text-white sm:px-6 sm:py-20 lg:px-8">
            <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
              <figure>
                <Image src="/images/events/payroll-summit-2026/payroll-summit-group.jpg" alt="Four attendees together at the Australian Payroll Summit in Sydney" width={2048} height={1536} sizes="(min-width: 1280px) 650px, (min-width: 1024px) 52vw, 100vw" className="h-auto w-full rounded-sm" />
                <figcaption className="mt-4 border-t border-white/20 pt-3 text-sm text-white/65">Australian Payroll Summit · Sydney, 2026</figcaption>
              </figure>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/65">Meet the founder</p>
                <h2 id="meet-rebecca-heading" className="mt-5 font-heading text-4xl leading-tight tracking-tight sm:text-5xl">Real experience.<br />A personal approach.</h2>
                <p className="mt-6 text-lg leading-relaxed text-white/80">Rebecca Wade founded The Payroll Studio to help organisations close the gap between day-to-day payroll and confident governance.</p>
                <p className="mt-4 leading-relaxed text-white/70">Her experience spans payroll operations, transformation and complex remediation. She brings that practical perspective to the people, processes and decisions behind every pay outcome.</p>
                <Link href="/about" className="mt-8 inline-flex items-center gap-5 border-b border-white/50 pb-2 text-base font-medium transition-colors hover:border-white focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-white">Meet Rebecca Wade <span aria-hidden="true">↗</span></Link>
              </div>
            </div>
          </section>
          <ModuleRenderer sections={page.sections.slice(2)} />
        </>
      )}
    </>
  );
}
