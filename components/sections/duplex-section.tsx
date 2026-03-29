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
    <div className={boxed ? "border border-border bg-muted/30 p-8 space-y-4" : "space-y-4"}>
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

  return (
    <SectionWrapper backgroundColor={data.backgroundColor} textColor={data.textColor}>
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
