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
  const imageFile = image?.fields?.file as
    | { url: string; details?: { image?: { width: number; height: number } } }
    | undefined;
  const imageUrl = imageFile ? `https:${imageFile.url}` : null;

  const isHorizontal = f.imagePosition === "left" || f.imagePosition === "right";
  const hasDarkBg = f.backgroundColor && f.backgroundColor !== "#ffffff" && f.backgroundColor !== "#fafafa";

  return (
    <SectionWrapper
      backgroundColor={f.backgroundColor}
      textColor={f.textColor}
      paddingSize={f.paddingSize}
      containerWidth={f.containerWidth}
    >
      <div
        className={cn(
          isHorizontal && "grid items-center gap-12 lg:grid-cols-2 lg:gap-16",
          f.imagePosition === "left" && "lg:[&>div:last-child]:order-first"
        )}
      >
        <div className={cn(align, "py-4")}>
          {f.heading && (
            <h2
              className={cn(
                "text-3xl font-normal leading-tight tracking-tight sm:text-4xl lg:text-5xl",
                hasDarkBg ? "text-white" : "text-foreground"
              )}
              dangerouslySetInnerHTML={{
                __html: f.heading.replace(
                  /\*(.*?)\*/g,
                  '<em class="font-normal italic">$1</em>'
                ),
              }}
            />
          )}
          {f.subheading && (
            <p
              className={cn(
                "mt-4 text-lg",
                hasDarkBg ? "text-white/70" : "text-muted-foreground"
              )}
            >
              {f.subheading}
            </p>
          )}
          {f.body ? (
            <div
              className={cn(
                "mt-8 max-w-none space-y-4 text-base leading-relaxed",
                hasDarkBg
                  ? "text-white/80 [&_strong]:text-white"
                  : "prose prose-lg dark:prose-invert"
              )}
            >
              {documentToReactComponents(
                f.body as Parameters<typeof documentToReactComponents>[0]
              )}
            </div>
          ) : null}
          {ctas.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-4">
              {ctas.map((c) => {
                const cf = c.fields as unknown as CtaFields;
                return (
                  <Link key={c.sys.id} href={cf.url}>
                    <Button
                      variant={cf.variant === "primary" ? "default" : "outline"}
                      size="lg"
                      className={cn(
                        "rounded-full px-8",
                        hasDarkBg &&
                          cf.variant !== "primary" &&
                          "border-white/30 text-white hover:bg-white/10"
                      )}
                    >
                      {cf.label}
                    </Button>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {imageUrl && isHorizontal && (
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[3/4] lg:aspect-auto lg:h-full lg:min-h-[500px]">
            <Image
              src={imageUrl}
              alt={(image?.fields?.title as string) ?? ""}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        )}

        {imageUrl && !isHorizontal && f.imagePosition === "top" && (
          <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl">
            <Image
              src={imageUrl}
              alt={(image?.fields?.title as string) ?? ""}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
