import type { TextBlockSectionData } from "@/types/content";
import { SectionWrapper } from "@/components/section-wrapper";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import ReactMarkdown from "react-markdown";
import { LinkedCtaButton } from "@/components/linked-cta-button";

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
  const hasDarkBg = false;
  const hasTextColor = false;

  if (data.layout === "split") {
    return (
      <SectionWrapper paddingSize={data.paddingSize} containerWidth={data.containerWidth}>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div>
            <Eyebrow text={data.eyebrow} className="mb-6" />
            <h2 className="font-heading text-4xl leading-tight tracking-tight sm:text-5xl">
              {data.heading?.split(/\*(.*?)\*/).map((part, index) => <span key={index} className={index % 2 ? "text-muted-foreground" : undefined}>{part}</span>)}
            </h2>
            {data.subheading && <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{data.subheading}</p>}
            {ctas.length > 0 && <div className="mt-8 flex flex-wrap gap-4">{ctas.map(cta => <LinkedCtaButton key={cta.href} cta={cta} />)}</div>}
          </div>
          {data.body && <div className="border-t border-border pt-6 text-base leading-relaxed text-muted-foreground [&_p+p]:mt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10"><ReactMarkdown>{data.body}</ReactMarkdown></div>}
        </div>
      </SectionWrapper>
    );
  }

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
        <div className={cn(align, !isHorizontal && "max-w-3xl")}>
          <Eyebrow text={data.eyebrow} />
          {data.heading && (
            <h2
              className={cn(
                "text-3xl font-normal leading-tight tracking-tight sm:text-4xl lg:text-5xl",
                hasDarkBg ? "text-foreground" : !hasTextColor ? "text-foreground" : ""
              )}
              style={hasTextColor && !hasDarkBg ? { color: data.textColor } : undefined}
              dangerouslySetInnerHTML={{
                __html: data.heading.replace(
                  /\*(.*?)\*/g,
                  '<em class="font-normal not-italic">$1</em>'
                ),
              }}
            />
          )}
          {data.subheading && (
            <p
              className={cn("mt-4 text-lg", hasDarkBg ? "text-muted-foreground" : !hasTextColor ? "text-muted-foreground" : "")}
              style={hasTextColor && !hasDarkBg ? { color: data.textColor, opacity: 0.75 } : undefined}
            >
              {data.subheading}
            </p>
          )}
          {data.body ? (
            <div
              className={cn(
                "mt-8 max-w-none space-y-4 text-base leading-relaxed",
                hasDarkBg ? "text-muted-foreground [&_strong]:text-foreground" : !hasTextColor ? "prose prose-lg dark:prose-invert" : ""
              )}
              style={hasTextColor && !hasDarkBg ? { color: data.textColor, opacity: 0.85 } : undefined}
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
                      hasDarkBg && c.variant !== "primary" && "border-border text-foreground hover:bg-muted"
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
