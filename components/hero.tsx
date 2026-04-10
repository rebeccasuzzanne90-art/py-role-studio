import type { HeroData } from "@/types/content";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LinkedCtaButton } from "@/components/linked-cta-button";
import ReactMarkdown from "react-markdown";

interface HeroProps {
  data?: HeroData;
}

function CtaButtons({ primaryCta, secondaryCta, className, swapStyles }: {
  primaryCta?: import("@/types/content").CtaData;
  secondaryCta?: import("@/types/content").CtaData;
  className?: string;
  swapStyles?: boolean;
}) {
  return (
    <div className={className}>
      {primaryCta ? (
        <LinkedCtaButton cta={primaryCta} className="w-full sm:w-auto" />
      ) : (
        <Link href="/services" className="w-full sm:w-auto">
          {swapStyles ? (
            <Button size="lg" variant="outline" className="w-full border-white/25 bg-transparent font-medium text-white hover:bg-white/10 sm:min-w-[220px]">
              Explore services
            </Button>
          ) : (
            <Button size="lg" className="w-full font-medium text-white hover:brightness-110 sm:min-w-[220px]" style={{ backgroundColor: "#c9963e" }}>
              Explore services
            </Button>
          )}
        </Link>
      )}
      {secondaryCta ? (
        <LinkedCtaButton cta={secondaryCta} className="w-full sm:w-auto" darkBorder />
      ) : (
        <Link href="/contact" className="w-full sm:w-auto">
          {swapStyles ? (
            <Button size="lg" className="w-full font-medium text-white hover:brightness-110 sm:min-w-[220px]" style={{ backgroundColor: "#c9963e" }}>
              Book a conversation
            </Button>
          ) : (
            <Button size="lg" variant="outline" className="w-full border-white/25 bg-transparent font-medium text-white hover:bg-white/10 sm:min-w-[220px]">
              Book a conversation
            </Button>
          )}
        </Link>
      )}
    </div>
  );
}

const mdxComponents = {
  p: ({ children }: { children?: React.ReactNode }) => <p className="mb-4 last:mb-0">{children}</p>,
  strong: ({ children }: { children?: React.ReactNode }) => <strong className="font-semibold text-white/80">{children}</strong>,
  ul: ({ children }: { children?: React.ReactNode }) => <ul className="mt-2 mb-6 space-y-2">{children}</ul>,
  ol: ({ children }: { children?: React.ReactNode }) => <ol className="mt-2 space-y-2 list-none">{children}</ol>,
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="flex items-start gap-2">
      <span className="mt-1 shrink-0 text-base leading-none" style={{ color: "#c9963e" }}>✓</span>
      <span>{children}</span>
    </li>
  ),
};

export function Hero({ data }: HeroProps) {
  const eyebrow = data?.eyebrow ?? "Payroll Governance, Compliance & Strategy";
  const headline =
    data?.headline ??
    "When payroll works nobody *notices.*";
  const subheadline =
    data?.subheadline ??
    "When it doesn't, everyone does.";
  const body = data?.body ?? "";
  const isSplit = data?.layout === "split";

  const primaryCta = data?.primaryCta;
  const secondaryCta = data?.secondaryCta;

  const parts = headline.split(/\*(.*?)\*/);

  const headingNode = (
    <h1 className="text-5xl font-normal leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <em key={i} className="font-normal italic" style={{ color: "#c9963e" }}>{part}</em>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </h1>
  );

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "#1e3a2a" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#3a5a20]/20" />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 sm:pb-32 sm:pt-24 lg:px-8 lg:pb-40 lg:pt-32">
        {isSplit ? (
          <div className="max-w-7xl text-left">
            {/* Eyebrow */}
            {eyebrow && (
              <div className="mb-8 flex items-center gap-3">
                <span className="block h-px w-8" style={{ backgroundColor: "#c9963e" }} />
                <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#c9963e" }}>
                  {eyebrow}
                </span>
              </div>
            )}
            {/* Top row: heading left, buttons right */}
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="lg:max-w-3xl">
                {headingNode}
                {subheadline && (
                  <p className="mt-6 font-heading text-2xl font-normal italic leading-snug text-white/80 sm:text-3xl">
                    {subheadline}
                  </p>
                )}
              </div>
              <CtaButtons
                primaryCta={primaryCta}
                secondaryCta={secondaryCta}
                className="flex shrink-0 flex-col gap-4 sm:flex-row lg:flex-col lg:items-end"
                swapStyles
              />
            </div>
            {/* Body below */}
            {body && (
              <div className="mt-10 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
                <ReactMarkdown components={mdxComponents}>{body}</ReactMarkdown>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-4xl text-left">
            {/* Eyebrow label */}
            {eyebrow && (
              <div className="mb-8 flex items-center gap-3">
                <span className="block h-px w-8" style={{ backgroundColor: "#c9963e" }} />
                <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#c9963e" }}>
                  {eyebrow}
                </span>
              </div>
            )}
            <div className="max-w-3xl">{headingNode}</div>
            {subheadline && (
              <p className="mt-6 font-heading text-2xl font-normal italic leading-snug text-white/80 sm:text-3xl">
                {subheadline}
              </p>
            )}
            {body && (
              <div className="mt-8 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
                <ReactMarkdown components={mdxComponents}>{body}</ReactMarkdown>
              </div>
            )}
            <CtaButtons
              primaryCta={primaryCta}
              secondaryCta={secondaryCta}
              className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:justify-start"
            />
          </div>
        )}
      </div>
    </section>
  );
}
