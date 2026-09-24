import type { DuplexSectionData, FeatureCardData } from "@/types/content";
import { SectionWrapper } from "@/components/section-wrapper";
import Image from "next/image";
import { LinkedCtaButton } from "@/components/linked-cta-button";
import { Eyebrow } from "@/components/ui/eyebrow";

interface Props {
  data: DuplexSectionData;
}

function DuplexItem({ item, boxed }: { item: FeatureCardData; boxed?: boolean }) {
  return (
    <div className={boxed ? "rounded-xl border border-border bg-card p-8 shadow-sm space-y-4" : "space-y-4"}>
      {item.imageUrl && (
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
        </div>
      )}
      <h3 className="text-xl font-semibold">{item.title}</h3>
      {item.description && (
        <p className="text-muted-foreground">{item.description}</p>
      )}
      {item.cta && <LinkedCtaButton cta={item.cta} />}
    </div>
  );
}

export function DuplexSection({ data }: Props) {
  const items = data.items ?? [];
  const boxed = data.variant === "boxed";

  if (data.variant === "editorial") {
    return (
      <SectionWrapper backgroundColor={data.backgroundColor} paddingSize={data.paddingSize}>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div className={data.imagePosition === "right" ? "lg:order-2" : ""}>
            {data.imageUrl && (
              <figure className="relative pb-6 pr-6">
                <div aria-hidden="true" className="absolute inset-0 left-6 top-6 rounded-sm bg-primary/10" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm sm:aspect-[6/5] lg:aspect-[4/5]">
                  <Image src={data.imageUrl} alt={data.imageAlt ?? ""} fill sizes="(min-width: 1280px) 568px, (min-width: 1024px) 45vw, 100vw" className="object-cover" />
                </div>
                {data.imageCaption && <figcaption className="absolute bottom-0 right-0 max-w-[85%] border-l-2 border-primary bg-card px-6 py-5 font-heading text-lg shadow-sm sm:px-8">{data.imageCaption}</figcaption>}
              </figure>
            )}
          </div>
          <div className="min-w-0">
            <Eyebrow text={data.eyebrow} />
            {data.heading && <h2 className="tracking-tight">{data.heading.split(/\*(.*?)\*/).map((part, i) => i % 2 ? <em key={i}>{part}</em> : <span key={i}>{part}</span>)}</h2>}
            {data.subheading && <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">{data.subheading}</p>}
            <div className="mt-8 border-t">
              {items.map((item, i) => (
                <details key={item.title} className="group border-b py-4">
                  <summary className="flex cursor-pointer list-none items-start gap-4 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
                    <span className="pt-0.5 text-xs font-medium tabular-nums text-primary">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="flex-1 text-base font-medium">{item.title}</h3>
                    <span aria-hidden="true" className="text-lg leading-6 text-primary group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 pl-8 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </details>
              ))}
            </div>
            {data.cta && <LinkedCtaButton cta={data.cta} className="mt-8 w-full sm:w-auto" />}
          </div>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper backgroundColor={data.backgroundColor} textColor={data.textColor} paddingSize={data.paddingSize}>
      <Eyebrow text={data.eyebrow} className="mb-6 flex items-center gap-3" />
      {data.heading && (
        <h2 className="mb-12 text-3xl font-normal leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          {data.heading}
        </h2>
      )}
      <div className={boxed ? "grid gap-6 md:grid-cols-2" : "grid gap-12 md:grid-cols-2"}>
        {items.map((item, idx) => (
          <DuplexItem key={idx} item={item} boxed={boxed} />
        ))}
      </div>
    </SectionWrapper>
  );
}
