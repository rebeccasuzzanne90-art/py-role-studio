import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { getServiceBySlug, getSiteSettings } from "@/lib/contentful";
import { buildMetadata, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { LiveService } from "@/components/live-preview/live-service";
import type { SiteSettingsFields, ServiceFields, SeoSkeleton } from "@/types/contentful";
import type { Entry } from "contentful";

const SERVICE_DATA: Record<
  string,
  { title: string; description: string; features: string[] }
> = {
  hipaa: {
    title: "HIPAA Compliance",
    description:
      "Ensure your healthcare organization's compliance with the Health Insurance Portability and Accountability Act (HIPAA) through our expert guidance and tailored solutions. We help you protect patient data, avoid costly fines, and build a culture of security.",
    features: [
      "Comprehensive HIPAA risk assessment",
      "Policy and procedure development",
      "Business Associate Agreement (BAA) management",
      "Breach notification planning",
      "Annual compliance reviews",
      "Staff training and awareness programs",
    ],
  },
  "iso-27001": {
    title: "ISO 27001 & ISO 42001",
    description:
      "Elevate your organization's information security posture with ISO 27001 & ISO 42001 certification, supported by our proven methodologies and experienced team. We guide you through every step of the certification process.",
    features: [
      "Gap analysis and readiness assessment",
      "Information Security Management System (ISMS) design",
      "Risk treatment planning",
      "Internal audit preparation",
      "Certification body liaison",
      "Continual improvement framework",
    ],
  },
  soc2: {
    title: "SOC2 Compliance",
    description:
      "Build trust with your clients by demonstrating your commitment to security and privacy through SOC2 compliance, a standard we help you achieve and maintain.",
    features: [
      "Trust Service Criteria assessment",
      "Control design and implementation",
      "Type I and Type II audit preparation",
      "Evidence collection and management",
      "Remediation support",
      "Ongoing monitoring and review",
    ],
  },
  gdpr: {
    title: "GDPR Compliance",
    description:
      "Safeguard the personal data of your EU clients with GDPR compliance strategies, ensuring your global operations meet stringent data protection regulations.",
    features: [
      "Data mapping and inventory",
      "Privacy Impact Assessments (PIAs)",
      "Data Processing Agreements",
      "Subject access request procedures",
      "Breach notification framework",
      "Cross-border data transfer compliance",
    ],
  },
  hitrust: {
    title: "HITRUST Certification",
    description:
      "Achieve the gold standard in healthcare security with HITRUST certification, supported by our experts who understand the unique challenges of the healthcare industry.",
    features: [
      "HITRUST CSF readiness assessment",
      "Scope and control selection",
      "Evidence collection support",
      "Assessor coordination",
      "Corrective Action Plan guidance",
      "Certification maintenance",
    ],
  },
  "data-security-audits": {
    title: "Data Security Audits",
    description:
      "Identify vulnerabilities and enhance your security framework with our meticulous data security audits, providing you with actionable insights for improvement.",
    features: [
      "Comprehensive vulnerability assessment",
      "Network and infrastructure review",
      "Application security testing",
      "Access control evaluation",
      "Risk remediation roadmap",
      "Executive summary reporting",
    ],
  },
  "fractional-ciso": {
    title: "Fractional CISO",
    description:
      "Access the expertise of a seasoned Chief Information Security Officer (CISO) on a flexible basis, tailored to your organization's needs and budget.",
    features: [
      "Security strategy development",
      "Board-level reporting",
      "Vendor risk management",
      "Incident response planning",
      "Security team mentoring",
      "Budget and resource optimization",
    ],
  },
  "pen-tests": {
    title: "Penetration Testing",
    description:
      "Uncover weaknesses in your security infrastructure through our thorough penetration testing, enabling you to proactively strengthen your defenses.",
    features: [
      "External and internal pen testing",
      "Web application testing",
      "Social engineering assessments",
      "Wireless security testing",
      "Detailed findings report",
      "Remediation verification",
    ],
  },
  "disaster-recovery": {
    title: "Disaster Recovery",
    description:
      "Develop robust disaster recovery plans to ensure business continuity in the face of unexpected crises, minimizing downtime and data loss.",
    features: [
      "Business Impact Analysis (BIA)",
      "Recovery strategy design",
      "DR plan documentation",
      "Tabletop exercises",
      "Backup and restoration testing",
      "Ongoing plan maintenance",
    ],
  },
  "team-training": {
    title: "Team Training",
    description:
      "Empower your workforce with essential cybersecurity knowledge through our comprehensive training programs, equipping them to be your first line of defense.",
    features: [
      "Security awareness training",
      "Phishing simulation campaigns",
      "Role-based training modules",
      "Compliance-specific training",
      "Progress tracking and reporting",
      "Annual refresher programs",
    ],
  },
};

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;

  try {
    const [svc, settingsEntry] = await Promise.all([
      getServiceBySlug(slug),
      getSiteSettings(),
    ]);
    if (svc) {
      const f = svc.fields as unknown as ServiceFields;
      const settings = settingsEntry?.fields as unknown as SiteSettingsFields | undefined;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const seoEntry = (f as any).seo as Entry<SeoSkeleton> | undefined;
      return buildMetadata({
        seoEntry: seoEntry ?? null,
        fallbackTitle: f.title,
        fallbackDescription: f.shortDescription,
        path: `/services/${slug}`,
        settings: settings ?? null,
      });
    }
  } catch {
    // fall through to hardcoded
  }

  const service = SERVICE_DATA[slug];
  return {
    title: service?.title ?? "Service",
    description: service?.description,
  };
}

export async function generateStaticParams() {
  return Object.keys(SERVICE_DATA).map((slug) => ({ slug }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const { isEnabled: isDraft } = await draftMode();

  let svc: Awaited<ReturnType<typeof getServiceBySlug>> | null = null;
  try {
    svc = await getServiceBySlug(slug, isDraft);
  } catch {
    // Contentful not configured
  }

  if (svc) {
    if (isDraft) {
      return <LiveService entry={svc} slug={slug} />;
    }

    const f = svc.fields as unknown as ServiceFields;
    return (
      <>
        <JsonLd
          data={serviceJsonLd({
            title: f.title,
            description: f.shortDescription ?? f.title,
            path: `/services/${slug}`,
          })}
        />
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: f.title, path: `/services/${slug}` },
          ])}
        />
        <section className="py-20 text-white" style={{ backgroundColor: "#1e3a2a" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/services"
              className="mb-6 inline-flex items-center gap-1 text-sm text-white/70 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> All Services
            </Link>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {f.title}
            </h1>
            {f.shortDescription && (
              <p className="mt-4 max-w-2xl text-lg text-white/80">
                {f.shortDescription}
              </p>
            )}
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="prose prose-neutral max-w-none dark:prose-invert lg:col-span-2">
                {f.body && typeof f.body === "object" && "nodeType" in f.body
                  ? (await import("@contentful/rich-text-react-renderer")).documentToReactComponents(
                      f.body as import("@contentful/rich-text-types").Document,
                    )
                  : null}
              </div>

              <div className="rounded-xl border bg-muted/30 p-8">
                <h3 className="text-xl font-bold">Get Started</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Ready to strengthen your {f.title?.toLowerCase()}? Start with a
                  free risk review.
                </p>
                <Link href="/contact" className="mt-6 block">
                  <Button className="w-full gap-2">
                    Request a Consultation
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  const service = SERVICE_DATA[slug];

  if (!service) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Service Not Found</h1>
        <Link href="/services" className="mt-4 inline-block text-primary">
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          title: service.title,
          description: service.description,
          path: `/services/${slug}`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${slug}` },
        ])}
      />
      <section className="py-20 text-white" style={{ backgroundColor: "#1e3a2a" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="mb-6 inline-flex items-center gap-1 text-sm text-white/70 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All Services
          </Link>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {service.title}
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {service.description}
              </p>

              <h2 className="mb-6 mt-10 text-2xl font-bold">What We Deliver</h2>
              <ul className="space-y-4">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border bg-muted/30 p-8">
              <h3 className="text-xl font-bold">Get Started</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Ready to strengthen your {service.title.toLowerCase()}? Start
                with a free risk review.
              </p>
              <Link href="/contact" className="mt-6 block">
                <Button className="w-full gap-2">
                  Request a Consultation
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
