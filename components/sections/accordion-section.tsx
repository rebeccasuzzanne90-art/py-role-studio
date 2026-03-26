"use client";

import { useState } from "react";
import type { Entry, EntrySkeletonType } from "contentful";
import type { FaqItemFields } from "@/types/contentful";
import { useContentfulInspectorMode } from "@contentful/live-preview/react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { cn } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { LinkedCtaButton } from "@/components/linked-cta-button";

interface AccordionSectionFields {
  internalName: string;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  quote?: string;
  items: Entry<EntrySkeletonType>[];
  ctas?: Entry<EntrySkeletonType>[];
  layout?: "split" | "stacked";
  displayMode?: "accordion" | "numberedList";
  showWaveDivider?: boolean;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  paddingSize?: "small" | "medium" | "large";
}

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entry: Entry<EntrySkeletonType, any, any>;
}

const PADDING_MAP: Record<string, string> = {
  small: "py-12",
  medium: "py-20",
  large: "py-28",
};

export function AccordionSectionBlock({ entry }: Props) {
  const f = entry.fields as unknown as AccordionSectionFields;
  const inspectorProps = useContentfulInspectorMode({ entryId: entry.sys.id });
  const items = (f.items ?? []) as Entry<EntrySkeletonType>[];
  const ctas = (f.ctas ?? []) as unknown as Entry<EntrySkeletonType>[];
  const isSplit = f.layout !== "stacked";
  const isNumbered = f.displayMode === "numberedList";
  const padding = PADDING_MAP[f.paddingSize ?? "medium"] ?? PADDING_MAP.medium;

  const hasDarkBg =
    f.backgroundColor &&
    f.backgroundColor !== "#ffffff" &&
    f.backgroundColor !== "#fafafa" &&
    f.backgroundColor !== "#f5f1eb";

  const headingHtml = f.heading
    ? f.heading.replace(
        /\*(.*?)\*/g,
        `<em class="font-normal italic" style="color: ${f.accentColor || "inherit"}"}>$1</em>`
      )
    : "";

  return (
    <section
      className={cn("relative overflow-hidden", padding)}
      style={{
        backgroundColor: f.backgroundColor || undefined,
        color: f.textColor || undefined,
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {isSplit ? (
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left column */}
            <div className="flex flex-col justify-center">
              <Eyebrow text={f.eyebrow} color={f.accentColor} className="mb-8 flex items-center gap-3" inspectorProps={inspectorProps({ fieldId: "eyebrow" })} />

              {f.heading && (
                <h2
                  {...inspectorProps({ fieldId: "heading" })}
                  className={cn(
                    "text-4xl font-normal leading-tight tracking-tight sm:text-5xl lg:text-6xl",
                    hasDarkBg ? "text-white" : ""
                  )}
                  dangerouslySetInnerHTML={{ __html: headingHtml }}
                />
              )}

              {f.quote && (
                <blockquote
                  {...inspectorProps({ fieldId: "quote" })}
                  className="mt-10 border-l-4 py-1 pl-6 font-heading text-xl font-normal italic leading-snug sm:text-2xl"
                  style={{ borderColor: f.accentColor || "#c9963e" }}
                >
                  {f.quote}
                </blockquote>
              )}

              {f.subheading && (
                <p
                  {...inspectorProps({ fieldId: "subheading" })}
                  className={cn(
                    "mt-8 text-base leading-relaxed",
                    hasDarkBg ? "text-white/70" : "text-muted-foreground"
                  )}
                >
                  {f.subheading}
                </p>
              )}

              {ctas.length > 0 && (
                <div className="mt-10 flex flex-wrap gap-4">
                  {ctas.map((c) => (
                    <LinkedCtaButton key={c.sys.id} entry={c} darkBorder={!!hasDarkBg} />
                  ))}
                </div>
              )}
            </div>

            {/* Right column */}
            <div>
              {isNumbered ? (
                <NumberedList
                  items={items}
                  hasDarkBg={!!hasDarkBg}
                  accentColor={f.accentColor}
                />
              ) : (
                <AccordionList items={items} hasDarkBg={!!hasDarkBg} />
              )}
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl">
            <Eyebrow text={f.eyebrow} color={f.accentColor} className="mb-6 flex items-center justify-center gap-3" inspectorProps={inspectorProps({ fieldId: "eyebrow" })} />

            {f.heading && (
              <h2
                {...inspectorProps({ fieldId: "heading" })}
                className={cn(
                  "text-center text-3xl font-normal leading-tight tracking-tight sm:text-4xl lg:text-5xl",
                  hasDarkBg ? "text-white" : ""
                )}
                dangerouslySetInnerHTML={{ __html: headingHtml }}
              />
            )}
            {f.subheading && (
              <p
                {...inspectorProps({ fieldId: "subheading" })}
                className={cn(
                  "mt-4 text-center text-lg leading-relaxed",
                  hasDarkBg ? "text-white/70" : "text-muted-foreground"
                )}
              >
                {f.subheading}
              </p>
            )}
            <div className="mt-10">
              {isNumbered ? (
                <NumberedList
                  items={items}
                  hasDarkBg={!!hasDarkBg}
                  accentColor={f.accentColor}
                />
              ) : (
                <AccordionList items={items} hasDarkBg={!!hasDarkBg} />
              )}
            </div>
            {ctas.length > 0 && (
              <div className="mt-10 flex justify-center gap-4">
                {ctas.map((c) => (
                  <LinkedCtaButton key={c.sys.id} entry={c} darkBorder={!!hasDarkBg} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {f.showWaveDivider && (
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block h-16 w-full sm:h-24 lg:h-32"
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0 60C240 120 480 0 720 60C960 120 1200 0 1440 60V120H0V60Z"
              style={{ fill: f.accentColor || undefined }}
              className={!f.accentColor ? "fill-primary/30" : undefined}
            />
          </svg>
        </div>
      )}
    </section>
  );
}

function NumberedListItem({
  item,
  idx,
  hasDarkBg,
  accentColor,
}: {
  item: Entry<EntrySkeletonType>;
  idx: number;
  hasDarkBg: boolean;
  accentColor?: string;
}) {
  const fields = item.fields as unknown as FaqItemFields;
  const inspectorProps = useContentfulInspectorMode({ entryId: item.sys?.id });
  const num = String(idx + 1).padStart(2, "0");

  if (!fields.question) return null;

  return (
    <div className="flex gap-5 py-6 sm:gap-6 sm:py-8">
      <span
        className="mt-0.5 text-sm font-semibold tabular-nums"
        style={{ color: accentColor || "#c9963e" }}
      >
        {num}
      </span>
      <div className="flex-1">
        <p
          {...inspectorProps({ fieldId: "question" })}
          className={cn(
            "text-base font-semibold leading-snug sm:text-lg",
            hasDarkBg ? "text-white" : ""
          )}
        >
          {fields.question}
        </p>
        <div
          {...inspectorProps({ fieldId: "answer" })}
          className={cn(
            "mt-2 text-sm leading-relaxed sm:text-base",
            hasDarkBg ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {fields.answer
            ? documentToReactComponents(
                fields.answer as Parameters<
                  typeof documentToReactComponents
                >[0]
              )
            : null}
        </div>
      </div>
    </div>
  );
}

function NumberedList({
  items,
  hasDarkBg,
  accentColor,
}: {
  items: Entry<EntrySkeletonType>[];
  hasDarkBg: boolean;
  accentColor?: string;
}) {
  return (
    <div
      className={cn(
        "divide-y",
        hasDarkBg ? "divide-white/20" : "divide-border"
      )}
    >
      {items.map((item, idx) => (
        <NumberedListItem
          key={item.sys?.id ?? idx}
          item={item}
          idx={idx}
          hasDarkBg={hasDarkBg}
          accentColor={accentColor}
        />
      ))}
    </div>
  );
}

function AccordionItem({
  item,
  idx,
  isOpen,
  onToggle,
  hasDarkBg,
}: {
  item: Entry<EntrySkeletonType>;
  idx: number;
  isOpen: boolean;
  onToggle: () => void;
  hasDarkBg: boolean;
}) {
  const fields = item.fields as unknown as FaqItemFields;
  const inspectorProps = useContentfulInspectorMode({ entryId: item.sys?.id });

  if (!fields.question) return null;

  return (
    <div className="group">
      <button
        onClick={onToggle}
        className={cn(
          "flex w-full items-center justify-between gap-4 py-5 text-left transition-colors",
          hasDarkBg
            ? "text-white/90 hover:text-white"
            : "text-foreground hover:text-foreground/80"
        )}
      >
        <span {...inspectorProps({ fieldId: "question" })} className="text-lg font-medium sm:text-xl">
          {fields.question}
        </span>
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors",
            hasDarkBg
              ? "text-white/60 hover:text-white"
              : "text-muted-foreground"
          )}
        >
          {isOpen ? (
            <Minus className="h-5 w-5" />
          ) : (
            <Plus className="h-5 w-5" />
          )}
        </span>
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div
            {...inspectorProps({ fieldId: "answer" })}
            className={cn(
              "pb-5 text-base leading-relaxed",
              hasDarkBg
                ? "text-white/80 [&_a]:text-white [&_a]:underline"
                : "prose prose-sm max-w-none"
            )}
          >
            {fields.answer
              ? documentToReactComponents(
                  fields.answer as Parameters<
                    typeof documentToReactComponents
                  >[0]
                )
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function AccordionList({
  items,
  hasDarkBg,
}: {
  items: Entry<EntrySkeletonType>[];
  hasDarkBg: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "divide-y",
        hasDarkBg ? "divide-white/20" : "divide-border"
      )}
    >
      {items.map((item, idx) => (
        <AccordionItem
          key={item.sys?.id ?? idx}
          item={item}
          idx={idx}
          isOpen={openIndex === idx}
          onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
          hasDarkBg={hasDarkBg}
        />
      ))}
    </div>
  );
}
