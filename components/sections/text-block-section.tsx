import type { TextBlockSectionData } from "@/types/content";
import { SectionWrapper } from "@/components/section-wrapper";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import ReactMarkdown from "react-markdown";

interface Props {
  data: TextBlockSectionData;
}

const ALIGN_MAP: Record<string, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function TextBlockSection({ data }: Props) {
  const align = ALIGN_MAP[data.textAlign ?? "left"] ?? "";
  const ctas = data.ctas ?? [];
  const imageUrl = data.imageUrl ?? null;

  const isHorizontal = data.imagePosition === "left" || data.imagePosition === "right";
  const hasDarkBg = data.backgroundColor && data.backgroundColor !== "#ffffff" && data.backgroundColor !== "#fafafa";
  const hasTextColor = !!data.textColor;

  return (
    <SectionWrapper
      backgroundColor={data.backgroundColor}
      textColor={data.textColor}
      paddingSize={data.paddingSize}
      containerWidth={data.containerWidth}
    >
      <div
        className={cn(
          isHorizontal && "grid items-center gap-12 lg:grid-cols-2 lg:gap-16",
          data.imagePosition === "left" && "lg:[&>div:last-child]:order-first"
        )}
      >
        <div className={cn(align, "py-4")}>
          <Eyebrow text={data.eyebrow} />
          {data.heading && (
            <h2
              className={cn(
                "text-3xl font-normal leading-tight tracking-tight sm:text-4xl lg:text-5xl",
                hasDarkBg ? "text-white" : hasTextColor ? "" : "text-foreground"
              )}
              dangerouslySetInnerHTML={{
                __html: data.heading.replace(
                  /\*(.*?)\*/g,
                  '<em class="font-normal italic">$1</em>'
                ),
              }}
            />
          )}
          {data.subheading && (
            <p className={cn("mt-4 text-lg", hasDarkBg ? "text-white/70" : hasTextColor ? "opacity-70" : "text-muted-foreground")}>
              {data.subheading}
            </p>
          )}
          {data.body ? (
            <div
              className={cn(
                "mt-8 max-w-none space-y-4 text-base leading-relaxed",
                hasDarkBg ? "text-white/80 [&_strong]:text-white" : hasTextColor ? "opacity-80" : "prose prose-lg dark:prose-invert"
              )}
            >
              <ReactMarkdown>{data.body}</ReactMarkdown>
            </div>
          ) : null}
          {ctas.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-4">
              {ctas.map((c, i) => (
                <Link key={i} href={c.href}>
                  <Button
                    variant={c.variant === "primary" ? "default" : "outline"}
                    size="lg"
                    className={cn(
                      "px-8",
                      hasDarkBg && c.variant !== "primary" && "border-white/30 text-white hover:bg-white/10"
                    )}
                  >
                    {c.label}
                  </Button>
                </Link>
              ))}
            </div>
          )}
        </div>

        {imageUrl && isHorizontal && (
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[3/4] lg:aspect-auto lg:h-full lg:min-h-[500px]">
            <Image
              src={imageUrl}
              alt={data.heading ?? ""}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        )}

        {imageUrl && !isHorizontal && data.imagePosition === "top" && (
          <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl">
            <Image
              src={imageUrl}
              alt={data.heading ?? ""}
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
