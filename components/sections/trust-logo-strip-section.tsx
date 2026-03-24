"use client";

import type { Entry, Asset, EntrySkeletonType } from "contentful";
import type { TrustLogoStripFields } from "@/types/contentful";
import { SectionWrapper } from "@/components/section-wrapper";
import { TrustLogos } from "@/components/trust-logos";
import { Eyebrow } from "@/components/ui/eyebrow";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entry: Entry<EntrySkeletonType, any, any>;
}

export function TrustLogoStripSection({ entry }: Props) {
  const f = entry.fields as unknown as TrustLogoStripFields;
  const logos = (f.logos ?? []) as Asset[];

  const logoData = logos.map((asset) => ({
    name: asset.fields?.title as string ?? "Logo",
    url: asset.fields?.file?.url
      ? `https:${(asset.fields.file as { url: string }).url}`
      : undefined,
  }));

  return (
    <SectionWrapper
      backgroundColor={f.backgroundColor}
      paddingSize={f.paddingSize ?? "small"}
      containerWidth="wide"
      className={f.backgroundColor ? "" : "border-y bg-background"}
    >
      <Eyebrow text={f.eyebrow} className="mb-6 flex items-center justify-center gap-3" />
      <TrustLogos heading={f.heading} logos={logoData} />
    </SectionWrapper>
  );
}
