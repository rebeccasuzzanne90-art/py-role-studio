import type { Entry, Asset, EntrySkeletonType } from "contentful";
import type { TextBlockFields, CtaFields } from "@/types/contentful";
import { SectionWrapper } from "@/components/section-wrapper";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entry: Entry<EntrySkeletonType, any, any>;
}

const ALIGN_MAP: Record<string, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function TextBlockSection({ entry }: Props) {
  const f = entry.fields as unknown as TextBlockFields;
  const align = ALIGN_MAP[f.textAlign ?? "left"] ?? "";
  const ctas = (f.ctas ?? []) as unknown as Entry<EntrySkeletonType>[];
  const image = f.image as Asset | undefined;
  const imageUrl = image?.fields?.file
    ? `https:${(image.fields.file as { url: string; details?: { image?: { width: number; height: number } } }).url}`
    : null;
  const imageDetails = image?.fields?.file
    ? (image.fields.file as { url: string; details?: { image?: { width: number; height: number } } }).details?.image
    : null;

  const isHorizontal = f.imagePosition === "left" || f.imagePosition === "right";

  return (
    <SectionWrapper
      backgroundColor={f.backgroundColor}
      textColor={f.textColor}
      paddingSize={f.paddingSize}
      containerWidth={f.containerWidth}
    >
      <div
        className={cn(
          isHorizontal && "grid gap-12 md:grid-cols-2 md:items-center",
          f.imagePosition === "right" && "md:[&>*:first-child]:order-1"
        )}
      >
        {imageUrl && isHorizontal && (
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={imageUrl}
              alt={(image?.fields?.title as string) ?? ""}
              fill
              className="object-cover"
              width={imageDetails?.width}
              height={imageDetails?.height}
            />
          </div>
        )}

        <div className={align}>
          {f.heading && (
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {f.heading}
            </h2>
          )}
          {f.subheading && (
            <p className="mt-4 text-lg text-muted-foreground">{f.subheading}</p>
          )}
          {f.body ? (
            <div className="prose prose-lg mt-6 max-w-none dark:prose-invert">
              {documentToReactComponents(f.body as Parameters<typeof documentToReactComponents>[0])}
            </div>
          ) : null}
          {ctas.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-4">
              {ctas.map((c) => {
                const cf = c.fields as unknown as CtaFields;
                return (
                  <Link key={c.sys.id} href={cf.url}>
                    <Button
                      variant={cf.variant === "primary" ? "default" : "outline"}
                      size="lg"
                    >
                      {cf.label}
                    </Button>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
