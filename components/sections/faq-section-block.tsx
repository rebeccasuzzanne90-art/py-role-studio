import type { Entry, EntrySkeletonType } from "contentful";
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FaqSectionBlock({ entry }: { entry: Entry<EntrySkeletonType, any, any> }) {
  const f = entry.fields as unknown as FaqSectionFields;
  const items = (f.items ?? []) as Entry<EntrySkeletonType>[];

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

      {f.heading && (
        <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl">
          {f.heading}
        </h2>
      )}
      {f.subheading && (
        <p className="mt-4 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
          {f.subheading}
        </p>
      )}

      <div className="mt-10 mx-auto max-w-3xl">
        <Accordion>
          {items.map((item, idx) => {
            const fields = item.fields as unknown as FaqItemFields;
            if (!fields.question) return null;
            return (
              <AccordionItem key={item.sys?.id ?? idx} value={`faq-${idx}`}>
                <AccordionTrigger>{fields.question}</AccordionTrigger>
                <AccordionContent>
                  <div className="prose prose-sm max-w-none">
                    {fields.answer
                      ? documentToReactComponents(
                          fields.answer as Parameters<typeof documentToReactComponents>[0]
                        )
                      : null}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </SectionWrapper>
  );
}
