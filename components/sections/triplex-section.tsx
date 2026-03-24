import type { Entry, Asset, EntrySkeletonType } from "contentful";
import type { TriplexFields, FeatureCardFields, CtaFields } from "@/types/contentful";
import { SectionWrapper } from "@/components/section-wrapper";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entry: Entry<EntrySkeletonType, any, any>;
}

export function TriplexSection({ entry }: Props) {
  const f = entry.fields as unknown as TriplexFields;
  const items = (f.items ?? []) as unknown as Entry<EntrySkeletonType>[];

  return (
    <SectionWrapper>
      <Eyebrow text={f.eyebrow} className="mb-6 flex items-center justify-center gap-3" />
      {f.heading && (
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          {f.heading}
        </h2>
      )}
      <div className="grid gap-8 md:grid-cols-3">
        {items.map((item) => {
          const ff = item.fields as unknown as FeatureCardFields;
          const img = ff.image as Asset | undefined;
          const imgUrl = img?.fields?.file
            ? `https:${(img.fields.file as { url: string }).url}`
            : null;
          const cta = ff.cta as unknown as Entry<EntrySkeletonType> | undefined;
          const ctaF = cta?.fields as unknown as CtaFields | undefined;

          return (
            <div key={item.sys.id} className="space-y-4">
              {imgUrl && (
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={imgUrl}
                    alt={ff.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <h3 className="text-xl font-semibold">{ff.title}</h3>
              {ff.description && (
                <p className="text-muted-foreground">{ff.description}</p>
              )}
              {ctaF && (
                <Link href={ctaF.url}>
                  <Button variant={ctaF.variant === "primary" ? "default" : "outline"}>
                    {ctaF.label}
                  </Button>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
