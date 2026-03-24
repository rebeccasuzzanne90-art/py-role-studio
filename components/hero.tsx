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
    <section
      className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90"
      style={{
        color: fields?.textColor || undefined,
      }}
    >
      <div className="absolute inset-0 opacity-10">
        <svg
          className="absolute bottom-0 left-0 h-full w-full"
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 300C200 200 400 400 600 300C800 200 1000 400 1200 300C1400 200 1440 250 1440 250V600H0V300Z"
            fill="currentColor"
            className="text-primary-foreground"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
            {headline}
          </h1>
          <p className="mt-6 text-lg leading-8 text-primary-foreground/80">
            {subheadline}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={primaryCtaF?.url ?? "/contact"} className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="secondary"
                className="w-full gap-2 text-base font-semibold sm:w-auto"
                style={{ backgroundColor: fields?.buttonColor || undefined }}
              >
                {primaryCtaF?.label ?? "Start Securing Your Data"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href={secondaryCtaF?.url ?? "/services"} className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="ghost"
                className="w-full text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto"
              >
                {secondaryCtaF?.label ?? "Our Services"}
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {FALLBACK_STATS.map((stat) => (
            <StatCounter key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
