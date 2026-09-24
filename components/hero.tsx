import type { HeroData } from "@/types/content";
import { LinkedCtaButton } from "@/components/linked-cta-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

interface HeroProps { data?: HeroData }

export function Hero({ data }: HeroProps) {
  const eyebrow = data?.eyebrow ?? "Payroll Governance, Compliance & Strategy";
  const headline = data?.headline ?? "When payroll works nobody *notices.*";
  const subheadline = data?.subheadline ?? "When it doesn't, everyone does.";
  const body = data?.body ?? "";
  const parts = headline.split(/\*(.*?)\*/);

  if (data?.imageUrl) {
    return (
      <section className="studio-hero border-b bg-muted">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:px-8 lg:py-20">
          <div>
            <Eyebrow text={eyebrow} className="mb-8 flex items-center gap-3" />
            <h1 className="text-5xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-6xl lg:text-[4.25rem]">
              {parts.map((part, i) => i % 2 === 1 ? <em key={i} className="font-normal not-italic text-primary">{part}</em> : <span key={i}>{part}</span>)}
            </h1>
            {subheadline && <p className="mt-6 max-w-xl font-heading text-xl leading-snug sm:text-2xl">{subheadline}</p>}
            {body && <div className="prose mt-5 max-w-xl text-base text-muted-foreground"><ReactMarkdown>{body}</ReactMarkdown></div>}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {data.primaryCta && <LinkedCtaButton cta={data.primaryCta} />}
              {data.secondaryCta && <LinkedCtaButton cta={data.secondaryCta} />}
            </div>
          </div>
          <figure className="relative pb-6 pl-6">
            <div aria-hidden="true" className="absolute bottom-0 left-0 h-2/3 w-2/3 rounded-sm bg-primary/15" />
            <div className="relative aspect-[6/5] overflow-hidden rounded-sm lg:aspect-[4/5]">
              <Image src={data.imageUrl} alt={data.imageAlt ?? ""} fill preload sizes="(min-width: 1280px) 540px, (min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <figcaption className="absolute bottom-0 left-0 max-w-[85%] border-l-2 border-primary bg-card px-6 py-5 shadow-sm">
              <span className="block text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">The Payroll Studio</span>
              <span className="mt-1 block font-heading text-lg">People. Process. Peace of mind.</span>
            </figcaption>
          </figure>
        </div>
      </section>
    );
  }

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
