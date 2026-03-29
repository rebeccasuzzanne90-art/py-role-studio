import type { TriplexSectionData, FeatureCardData } from "@/types/content";
import { SectionWrapper } from "@/components/section-wrapper";
import Image from "next/image";
import { LinkedCtaButton } from "@/components/linked-cta-button";
import { Eyebrow } from "@/components/ui/eyebrow";

interface Props {
  data: TriplexSectionData;
}

function TriplexItem({ item }: { item: FeatureCardData }) {
  return (
    <div className="space-y-4">
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

export function TriplexSection({ data }: Props) {
  const items = data.items ?? [];

  return (
    <SectionWrapper>
      <Eyebrow text={data.eyebrow} className="mb-6 flex items-center justify-center gap-3" />
      {data.heading && (
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          {data.heading}
        </h2>
      )}
      <div className="grid gap-8 md:grid-cols-3">
        {items.map((item, idx) => (
          <TriplexItem key={idx} item={item} />
        ))}
      </div>
    </SectionWrapper>
  );
}
