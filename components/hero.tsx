"use client";

import type { Entry, EntrySkeletonType } from "contentful";
import type { HeroBannerFields, CtaFields } from "@/types/contentful";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeroProps {
  entry?: Entry<EntrySkeletonType>;
}

export function Hero({ entry }: HeroProps) {
  const fields = entry?.fields as unknown as HeroBannerFields | undefined;

  const headline =
    fields?.headline ??
    "Data Security Doesn't Have to Be Confusing & *Overwhelming.*";
  const subheadline =
    fields?.subheadline ??
    "When it isn't, everyone benefits.";

  const primaryCta = fields?.primaryCta as unknown as
    | Entry<EntrySkeletonType>
    | undefined;
  const secondaryCta = fields?.secondaryCta as unknown as
    | Entry<EntrySkeletonType>
    | undefined;
  const primaryCtaF = primaryCta?.fields as unknown as CtaFields | undefined;
  const secondaryCtaF = secondaryCta?.fields as unknown as
    | CtaFields
    | undefined;

  const parts = headline.split(/\*(.*?)\*/);

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "#1e3a2a" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#3a5a20]/20" />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 sm:pb-32 sm:pt-24 lg:px-8 lg:pb-40 lg:pt-32">
        <div className="max-w-3xl">
          {/* Eyebrow label */}
          <div className="mb-8 flex items-center gap-3">
            <span className="block h-px w-8" style={{ backgroundColor: "#c9963e" }} />
            <span
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "#c9963e" }}
            >
              Data Governance, Compliance &amp; Strategy
            </span>
          </div>

          {/* Main heading */}
          <h1 className="font-heading text-5xl font-normal leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {parts.map((part, i) =>
              i % 2 === 1 ? (
                <em
                  key={i}
                  className="font-normal italic"
                  style={{ color: "#c9963e" }}
                >
                  {part}
                </em>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </h1>

          {/* Italic subheading */}
          <p className="mt-6 font-heading text-2xl font-normal italic leading-snug text-white/80 sm:text-3xl">
            {subheadline}
          </p>

          {/* Body text */}
          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            VanRein Compliance partners with organisations to build data
            security that&apos;s genuinely compliant, properly governed, and
            built to last — whether you&apos;re managing escalating risk,
            supporting a team that&apos;s been doing more with less, or building
            a function that can actually scale.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href={primaryCtaF?.url ?? "/services"}
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="w-full font-medium text-white hover:brightness-110 sm:w-auto"
                style={{ backgroundColor: "#c9963e" }}
              >
                {primaryCtaF?.label ?? "Explore services"}
              </Button>
            </Link>
            <Link
              href={secondaryCtaF?.url ?? "/contact"}
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                variant="outline"
                className="w-full border-white/25 bg-transparent font-medium text-white hover:bg-white/10 sm:w-auto"
              >
                {secondaryCtaF?.label ?? "Book a conversation"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
