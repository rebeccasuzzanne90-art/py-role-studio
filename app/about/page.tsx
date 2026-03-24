import type { Metadata } from "next";
import { draftMode } from "next/headers";
import type { Entry, EntrySkeletonType } from "contentful";
import { Shield, Target, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getPageBySlug, getSiteSettings } from "@/lib/contentful";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/hero";
import { LiveHero } from "@/components/live-preview/live-hero";
import { ModuleRenderer } from "@/components/module-renderer";
import { LiveModuleRenderer } from "@/components/live-preview/live-module-renderer";
import type { SiteSettingsFields, SeoSkeleton } from "@/types/contentful";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const [page, settingsEntry] = await Promise.all([
      getPageBySlug("about"),
      getSiteSettings(),
    ]);
    const settings = settingsEntry?.fields as unknown as SiteSettingsFields | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const seoEntry = (page?.fields as any)?.seo as Entry<SeoSkeleton> | undefined;
    return buildMetadata({
      seoEntry: seoEntry ?? null,
      fallbackTitle: "About | VanRein Compliance",
      fallbackDescription:
        "Learn about VanRein Compliance — over 25 years of experience helping organizations navigate data security regulations.",
      path: "/about",
      settings: settings ?? null,
    });
  } catch {
    return {
      title: "About | VanRein Compliance",
      description:
        "Learn about VanRein Compliance — over 25 years of experience helping organizations navigate data security regulations.",
    };
  }
}

// ─── Hardcoded fallback (shown when Contentful is not configured) ────────────

const VALUES = [
  {
    icon: Shield,
    title: "Security First",
    description:
      "We believe data security is not optional. Every recommendation we make is grounded in real-world risk assessment.",
  },
  {
    icon: Target,
    title: "Results Driven",
    description:
      "We measure success by the tangible improvements we deliver — reduced risk, streamlined processes, and audit readiness.",
  },
  {
    icon: Award,
    title: "Expert Guidance",
    description:
      "Our team holds certifications across HIPAA, SOC2, ISO 27001, HITRUST, and GDPR with decades of combined experience.",
  },
  {
    icon: Users,
    title: "Partner Approach",
    description:
      "We don't just audit and leave. We embed with your team, train your staff, and provide ongoing support.",
  },
];

function AboutFallback() {
  return (
    <>
      <section className="py-20 text-white" style={{ backgroundColor: "#1e3a2a" }}>
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            About VanRein Compliance
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            With over 25 years of experience, we help organizations navigate
            HIPAA, SOC2, ISO27001, HITRUST, GDPR, and other data security
            regulations.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Data security doesn&apos;t have to be confusing and overwhelming.
              Our mission is to make compliance accessible, understandable, and
              achievable for organizations of every size. We provide one-on-one
              support and help with the entire data security suite — from audits
              and execution to team training and ongoing support.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">
            Our Values
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => (
              <div key={value.title} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">{value.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Our Team</h2>
            <p className="mt-4 text-muted-foreground">
              Led by Rob and Dawn Van Buskirk, our team of compliance experts
              brings decades of experience across healthcare, fintech, SaaS, and
              telecommunications.
            </p>
            <div className="mt-8">
              <Link href="/contact">
                <Button size="lg">Work With Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function AboutPage() {
  const { isEnabled: isDraft } = await draftMode();

  let page: Awaited<ReturnType<typeof getPageBySlug>> | null = null;

  try {
    page = await getPageBySlug("about", isDraft);
  } catch {
    // Contentful not configured — render fallback
  }

  const sections = page?.fields?.sections as
    | Entry<EntrySkeletonType>[]
    | undefined;

  if (sections && sections.length > 0) {
    const heroEntry = page?.fields?.hero as
      | Entry<EntrySkeletonType>
      | undefined;

    return (
      <>
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

  return <AboutFallback />;
}
