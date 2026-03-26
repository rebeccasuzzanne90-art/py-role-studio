"use client";

import type { Entry, Asset, EntrySkeletonType } from "contentful";
import type { TriplexFields, FeatureCardFields } from "@/types/contentful";
import { useContentfulInspectorMode } from "@contentful/live-preview/react";
import { SectionWrapper } from "@/components/section-wrapper";
import Image from "next/image";
import { LinkedCtaButton } from "@/components/linked-cta-button";
import { Eyebrow } from "@/components/ui/eyebrow";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entry: Entry<EntrySkeletonType, any, any>;
}

function TriplexItem({ item }: { item: Entry<EntrySkeletonType> }) {
  const ff = item.fields as unknown as FeatureCardFields;
  const img = ff.image as Asset | undefined;
  const imgUrl = img?.fields?.file
    ? `https:${(img.fields.file as { url: string }).url}`
    : null;
  const cta = ff.cta as unknown as Entry<EntrySkeletonType> | undefined;
  const inspectorProps = useContentfulInspectorMode({ entryId: item.sys.id });

  return (
    <div className="space-y-4">
      {imgUrl && (
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image src={imgUrl} alt={ff.title} fill className="object-cover" />
        </div>
      )}
      <h3 {...inspectorProps({ fieldId: "title" })} className="text-xl font-semibold">{ff.title}</h3>
      {ff.description && (
        <p {...inspectorProps({ fieldId: "description" })} className="text-muted-foreground">{ff.description}</p>
      )}
      {cta && <LinkedCtaButton entry={cta} />}
    </div>
  );
}

export function TriplexSection({ entry }: Props) {
  const f = entry.fields as unknown as TriplexFields;
  const items = (f.items ?? []) as unknown as Entry<EntrySkeletonType>[];
  const inspectorProps = useContentfulInspectorMode({ entryId: entry.sys.id });

  return (
    <SectionWrapper>
      <Eyebrow text={f.eyebrow} className="mb-6 flex items-center justify-center gap-3" inspectorProps={inspectorProps({ fieldId: "eyebrow" })} />
      {f.heading && (
        <h2 {...inspectorProps({ fieldId: "heading" })} className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          {f.heading}
        </h2>
      )}
      <div className="grid gap-8 md:grid-cols-3">
        {items.map((item) => (
          <TriplexItem key={item.sys.id} item={item} />
        ))}
      </div>
    </SectionWrapper>
  );
}
