import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { getPageBySlug, getSiteSettings } from "@/lib/contentful";
import { buildMetadata, webPageJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { ModuleRenderer } from "@/components/module-renderer";
import { LiveModuleRenderer } from "@/components/live-preview/live-module-renderer";
import { Hero } from "@/components/hero";
import { LiveHero } from "@/components/live-preview/live-hero";
import { TrustLogos } from "@/components/trust-logos";
import { ServicesGrid } from "@/components/services-grid";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { ShockingNumbers } from "@/components/shocking-numbers";
import { FrameworkSteps } from "@/components/framework-steps";
import { NewsletterForm } from "@/components/newsletter-form";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Entry, EntrySkeletonType } from "contentful";
import type { SiteSettingsFields, SeoSkeleton } from "@/types/contentful";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const [page, settingsEntry] = await Promise.all([
      getPageBySlug("home"),
      getSiteSettings(),
    ]);
    const settings = settingsEntry?.fields as unknown as SiteSettingsFields | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const seoEntry = (page?.fields as any)?.seo as Entry<SeoSkeleton> | undefined;
    return buildMetadata({
      seoEntry: seoEntry ?? null,
      fallbackTitle: "VanRein Compliance | Data Security",
      fallbackDescription:
        "With over 25 years of experience, we help organizations navigate HIPAA, SOC2, ISO27001, HITRUST, GDPR, and other data security regulations.",
      path: "/",
      settings: settings ?? null,
    });
  } catch {
    return { title: "VanRein Compliance | Data Security" };
  }
}

export default async function HomePage() {
  const { isEnabled: isDraft } = await draftMode();

  let page: Awaited<ReturnType<typeof getPageBySlug>> | null = null;

  try {
    page = await getPageBySlug("home", isDraft);
  } catch {
    // Contentful not configured yet — render fallback
  }

  const sections = page?.fields?.sections as unknown as Entry<EntrySkeletonType>[] | undefined;

  if (sections && sections.length > 0) {
    const heroEntry = page?.fields?.hero as unknown as Entry<EntrySkeletonType> | undefined;
    return (
      <>
        <JsonLd
          data={webPageJsonLd({
            title: (page?.fields?.title as string) ?? "Home",
            description: "Compliance and data security consulting services.",
            path: "/",
          })}
        />
        {heroEntry &&
          (isDraft ? (
            <LiveHero entry={heroEntry} />
          ) : (
            <Hero entry={heroEntry} />
          ))}
        {isDraft ? (
          <LiveModuleRenderer sections={sections} />
        ) : (
          <ModuleRenderer sections={sections} />
        )}
      </>
    );
  }

  return (
    <>
      <Hero />
      <section className="overflow-hidden border-y bg-background py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TrustLogos />
        </div>
      </section>
      <ServicesGrid />
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TestimonialCarousel />
        </div>
      </section>
      <ShockingNumbers />
      <FrameworkSteps />

      <section className="border-t bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Take the Next Step?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Let&apos;s start with a conversation. Our experts are ready to help
            you navigate compliance and secure your data.
          </p>
          <div className="mt-8">
            <Link href="/contact">
              <Button size="lg" className="gap-2 text-base font-semibold">
                Get a Risk Review
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
