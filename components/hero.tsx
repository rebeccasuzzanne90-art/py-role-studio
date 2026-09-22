import type { HeroData } from "@/types/content";
import { LinkedCtaButton } from "@/components/linked-cta-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import ReactMarkdown from "react-markdown";

interface HeroProps { data?: HeroData }

export function Hero({ data }: HeroProps) {
  const eyebrow = data?.eyebrow ?? "Payroll Governance, Compliance & Strategy";
  const headline = data?.headline ?? "When payroll works nobody *notices.*";
  const subheadline = data?.subheadline ?? "When it doesn't, everyone does.";
  const body = data?.body ?? "";
  const parts = headline.split(/\*(.*?)\*/);

  return (
    <section className="studio-hero border-b bg-muted">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <Eyebrow text={eyebrow} className="mb-10 flex items-center gap-3" />
        <div className={`grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-20 ${data?.layout === "split" ? "items-start" : "items-end"}`}>
          <div>
            <h1 className="text-5xl font-semibold leading-[1.03] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              {parts.map((part, i) => i % 2 === 1
                ? <em key={i} className="font-normal not-italic text-muted-foreground">{part}</em>
                : <span key={i}>{part}</span>)}
            </h1>
            {subheadline && <p className="mt-7 max-w-xl font-heading text-2xl leading-snug text-muted-foreground sm:text-3xl">{subheadline}</p>}
          </div>
          <div className="lg:pb-1">
            {body && <div className="prose text-base leading-relaxed text-muted-foreground sm:text-lg"><ReactMarkdown>{body}</ReactMarkdown></div>}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <LinkedCtaButton cta={data?.primaryCta ?? { label: "Explore services", href: "/services", variant: "primary" }} className="w-full sm:w-auto" />
              <LinkedCtaButton cta={data?.secondaryCta ?? { label: "Book a conversation", href: "/contact", variant: "secondary" }} className="w-full sm:w-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
