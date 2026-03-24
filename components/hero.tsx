"use client";

import type { Entry, EntrySkeletonType } from "contentful";
import type { HeroBannerFields, CtaFields } from "@/types/contentful";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StatCounter } from "@/components/stat-counter";
import { ArrowRight } from "lucide-react";

const FALLBACK_STATS = [
  { value: 80, suffix: "%", label: "Improvement in Data Compliance in 60 Days" },
  { value: 60, suffix: "%", label: "Increase in Compliance Processes Efficiency" },
  { value: 90, suffix: "%", label: "Risk Mitigation of Non Compliant Issues" },
  { value: 12000, suffix: "+", label: "Users Trained with Our Compliance Modules" },
];

interface HeroProps {
  entry?: Entry<EntrySkeletonType>;
}

export function Hero({ entry }: HeroProps) {
  const fields = entry?.fields as unknown as HeroBannerFields | undefined;

  const headline = fields?.headline ?? "Data Security Doesn't Have to Be Confusing & Overwhelming";
  const subheadline =
    fields?.subheadline ??
    "With over 25 years of experience, we help organizations navigate HIPAA, SOC2, ISO27001, HITRUST, GDPR, and other data security regulations.";

  const primaryCta = fields?.primaryCta as unknown as Entry<EntrySkeletonType> | undefined;
  const secondaryCta = fields?.secondaryCta as unknown as Entry<EntrySkeletonType> | undefined;
  const primaryCtaF = primaryCta?.fields as unknown as CtaFields | undefined;
  const secondaryCtaF = secondaryCta?.fields as unknown as CtaFields | undefined;

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="relative mx-auto max-w-7xl px-4 pb-32 pt-20 sm:px-6 sm:pb-40 sm:pt-28 lg:px-8 lg:pb-48 lg:pt-36">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-5xl font-normal leading-[1.15] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            {headline}
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {subheadline}
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={primaryCtaF?.url ?? "/contact"} className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full gap-2 px-8 text-base font-medium sm:w-auto"
                style={{ backgroundColor: fields?.buttonColor || undefined }}
              >
                {primaryCtaF?.label ?? "Start Securing Your Data"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            {secondaryCtaF && (
              <Link href={secondaryCtaF.url ?? "/services"} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full px-8 text-base font-medium sm:w-auto"
                >
                  {secondaryCtaF.label ?? "Our Services"}
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {FALLBACK_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <StatCounter {...stat} />
            </div>
          ))}
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block h-16 w-full sm:h-24 lg:h-32"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60C240 120 480 0 720 60C960 120 1200 0 1440 60V120H0V60Z"
            className="fill-primary"
          />
        </svg>
      </div>
    </section>
  );
}
