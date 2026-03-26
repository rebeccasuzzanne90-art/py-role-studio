"use client";

import type { Entry, EntrySkeletonType } from "contentful";
import { useContentfulInspectorMode } from "@contentful/live-preview/react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { SectionWrapper } from "@/components/section-wrapper";
import { JsonLd } from "@/components/json-ld";
import { faqJsonLd } from "@/lib/seo";
import type { FaqSectionFields, FaqItemFields } from "@/types/contentful";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Eyebrow } from "@/components/ui/eyebrow";

function FaqItemRow({ item, idx }: { item: Entry<EntrySkeletonType>; idx: number }) {
  const fields = item.fields as unknown as FaqItemFields;
  const inspectorProps = useContentfulInspectorMode({ entryId: item.sys?.id });
  if (!fields.question) return null;
  return (
    <AccordionItem value={`faq-${idx}`}>
      <AccordionTrigger {...inspectorProps({ fieldId: "question" })}>{fields.question}</AccordionTrigger>
      <AccordionContent>
        <div {...inspectorProps({ fieldId: "answer" })} className="prose prose-sm max-w-none">
          {fields.answer
            ? documentToReactComponents(
                fields.answer as Parameters<typeof documentToReactComponents>[0]
              )
            : null}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FaqSectionBlock({ entry }: { entry: Entry<EntrySkeletonType, any, any> }) {
  const f = entry.fields as unknown as FaqSectionFields;
  const items = (f.items ?? []) as Entry<EntrySkeletonType>[];
  const inspectorProps = useContentfulInspectorMode({ entryId: entry.sys.id });

  const faqData = items
    .map((item) => {
      const fields = item.fields as unknown as FaqItemFields;
      if (!fields.question) return null;
      return {
        question: fields.question,
        answer: fields.answer
          ? documentToPlainTextString(fields.answer as Parameters<typeof documentToPlainTextString>[0])
          : "",
      };
    })
    .filter(Boolean) as { question: string; answer: string }[];

  return (
    <SectionWrapper
      backgroundColor={f.backgroundColor}
      textColor={f.textColor}
      paddingSize={f.paddingSize}
      containerWidth={f.containerWidth}
    >
      <JsonLd data={faqJsonLd(faqData)} />

      <Eyebrow text={f.eyebrow} className="mb-6 flex items-center justify-center gap-3" inspectorProps={inspectorProps({ fieldId: "eyebrow" })} />
      {f.heading && (
        <h2 {...inspectorProps({ fieldId: "heading" })} className="text-3xl font-normal leading-tight tracking-tight text-center sm:text-4xl lg:text-5xl">
          {f.heading}
        </h2>
      )}
      {f.subheading && (
        <p {...inspectorProps({ fieldId: "subheading" })} className="mt-4 text-center text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
          {f.subheading}
        </p>
      )}

      <div className="mt-10 mx-auto max-w-3xl">
        <Accordion>
          {items.map((item, idx) => (
            <FaqItemRow key={item.sys?.id ?? idx} item={item} idx={idx} />
          ))}
        </Accordion>
      </div>
    </SectionWrapper>
  );
}
