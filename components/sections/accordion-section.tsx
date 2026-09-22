"use client";

import { useState } from "react";
import type { AccordionSectionData, FaqItemData } from "@/types/content";
import { cn } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { LinkedCtaButton } from "@/components/linked-cta-button";
import ReactMarkdown from "react-markdown";

interface Props {
  data: AccordionSectionData;
}

const PADDING_MAP: Record<string, string> = {
  small: "py-12",
  medium: "py-20",
  large: "py-28",
};

export function AccordionSectionBlock({ data }: Props) {
  const items = data.items ?? [];
  const ctas = data.ctas ?? [];
  const isSplit = data.layout !== "stacked";
  const isNumbered = data.displayMode === "numberedList";
  const padding = PADDING_MAP[data.paddingSize ?? "medium"] ?? PADDING_MAP.medium;

  const hasDarkBg = false;

  const headingHtml = data.heading
    ? data.heading
        .replace(/\*\*\*(.*?)\*\*\*/g, `<strong><em>$1</em></strong>`)
        .replace(
          /\*(.*?)\*/g,
          `<em class="font-normal not-italic" style="color: var(--muted-foreground)"}>$1</em>`
        )
    : "";

  return (
    <section
      className={cn("studio-section relative overflow-hidden border-b", padding)}
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {isSplit ? (
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left column */}
            <div className="flex flex-col justify-center">
              <Eyebrow text={data.eyebrow} color={data.accentColor} className="mb-8 flex items-center gap-3" />

              {data.heading && (
                <h2
                  className={cn(
                    "text-4xl font-normal leading-tight tracking-tight sm:text-5xl lg:text-6xl",
                    hasDarkBg ? "text-foreground" : ""
                  )}
                  dangerouslySetInnerHTML={{ __html: headingHtml }}
                />
              )}

              {data.quote && (
                <blockquote
                  className="mt-10 border-l-4 py-1 pl-6 font-heading text-xl font-normal not-italic leading-snug sm:text-2xl"
                  style={{ borderColor: "var(--border)" }}
                >
                  {data.quote}
                </blockquote>
              )}

              {data.subheading && (
                <p
                  className={cn(
                    "mt-8 text-base leading-relaxed",
                    hasDarkBg ? "text-muted-foreground" : "text-muted-foreground"
                  )}
                >
                  {data.subheading}
                </p>
              )}

              {ctas.length > 0 && (
                <div className="mt-10 flex flex-wrap gap-4">
                  {ctas.map((c, i) => (
                    <LinkedCtaButton key={i} cta={c} darkBorder={!!hasDarkBg} />
                  ))}
                </div>
              )}
            </div>

            {/* Right column */}
            <div>
              {isNumbered ? (
                <NumberedList items={items} hasDarkBg={!!hasDarkBg} accentColor={data.accentColor} />
              ) : (
                <AccordionList items={items} hasDarkBg={!!hasDarkBg} />
              )}
              {(data.rightCtas ?? []).length > 0 && (
                <div className="mt-10 flex flex-wrap gap-4">
                  {(data.rightCtas ?? []).map((c, i) => (
                    <LinkedCtaButton key={i} cta={c} darkBorder={!!hasDarkBg} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl">
            <Eyebrow text={data.eyebrow} color={data.accentColor} className="mb-6 flex items-center justify-center gap-3" />

            {data.heading && (
              <h2
                className={cn(
                  "text-center text-3xl font-normal leading-tight tracking-tight sm:text-4xl lg:text-5xl",
                  hasDarkBg ? "text-foreground" : ""
                )}
                dangerouslySetInnerHTML={{ __html: headingHtml }}
              />
            )}
            {data.subheading && (
              <p
                className={cn(
                  "mt-4 text-center text-lg leading-relaxed",
                  hasDarkBg ? "text-muted-foreground" : "text-muted-foreground"
                )}
              >
                {data.subheading}
              </p>
            )}
            <div className="mt-10">
              {isNumbered ? (
                <NumberedList items={items} hasDarkBg={!!hasDarkBg} accentColor={data.accentColor} />
              ) : (
                <AccordionList items={items} hasDarkBg={!!hasDarkBg} />
              )}
            </div>
            {ctas.length > 0 && (
              <div className="mt-10 flex justify-center gap-4">
                {ctas.map((c, i) => (
                  <LinkedCtaButton key={i} cta={c} darkBorder={!!hasDarkBg} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>


    </section>
  );
}

function NumberedListItem({
  item,
  idx,
  hasDarkBg,
}: {
  item: FaqItemData;
  idx: number;
  hasDarkBg: boolean;
  accentColor?: string;
}) {
  const num = String(idx + 1).padStart(2, "0");
  if (!item.question) return null;

  return (
    <div className="flex gap-5 py-6 sm:gap-6 sm:py-8">
      <span
        className="mt-0.5 text-sm font-semibold tabular-nums"
        style={{ color: "var(--muted-foreground)" }}
      >
        {num}
      </span>
      <div className="flex-1">
        <p className={cn("text-base font-semibold leading-snug sm:text-lg", hasDarkBg ? "text-foreground" : "")}>
          {item.question}
        </p>
        {item.answer && (
          <div className={cn("mt-2 text-sm leading-relaxed sm:text-base", hasDarkBg ? "text-muted-foreground" : "text-muted-foreground")}>
            <ReactMarkdown>{item.answer}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

function NumberedList({ items, hasDarkBg, accentColor }: { items: FaqItemData[]; hasDarkBg: boolean; accentColor?: string }) {
  return (
    <div className={cn("divide-y", hasDarkBg ? "divide-white/20" : "divide-border")}>
      {items.map((item, idx) => (
        <NumberedListItem key={idx} item={item} idx={idx} hasDarkBg={hasDarkBg} accentColor={accentColor} />
      ))}
    </div>
  );
}

function AccordionItem({
  item,
  isOpen,
  onToggle,
  hasDarkBg,
}: {
  item: FaqItemData;
  isOpen: boolean;
  onToggle: () => void;
  hasDarkBg: boolean;
}) {
  if (!item.question) return null;

  return (
    <div className="group">
      <button
        onClick={onToggle}
        className={cn(
          "flex w-full items-center justify-between gap-4 py-5 text-left transition-colors",
          hasDarkBg ? "text-muted-foreground hover:text-foreground" : "text-foreground hover:text-foreground/80"
        )}
      >
        <span className="text-lg font-medium sm:text-xl">{item.question}</span>
        <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors", hasDarkBg ? "text-muted-foreground hover:text-foreground" : "text-muted-foreground")}>
          {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
        </span>
      </button>
      <div className={cn("grid transition-all duration-300 ease-in-out", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
        <div className="overflow-hidden">
          <div className={cn("pb-5 text-base leading-relaxed", hasDarkBg ? "text-muted-foreground [&_a]:text-foreground [&_a]:underline [&_p]:mb-4 [&_p:last-child]:mb-0" : "prose prose-sm max-w-none")}>
            {item.answer && <ReactMarkdown>{item.answer}</ReactMarkdown>}
          </div>
        </div>
      </div>
    </div>
  );
}

function AccordionList({ items, hasDarkBg }: { items: FaqItemData[]; hasDarkBg: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("divide-y", hasDarkBg ? "divide-white/20" : "divide-border")}>
      {items.map((item, idx) => (
        <AccordionItem
          key={idx}
          item={item}
          isOpen={openIndex === idx}
          onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
          hasDarkBg={hasDarkBg}
        />
      ))}
    </div>
  );
}
