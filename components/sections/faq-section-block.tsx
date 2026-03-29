import type { FaqSectionData } from "@/types/content";
import { SectionWrapper } from "@/components/section-wrapper";
import { JsonLd } from "@/components/json-ld";
import { faqJsonLd } from "@/lib/seo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Eyebrow } from "@/components/ui/eyebrow";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Props {
  data: FaqSectionData;
}

export function FaqSectionBlock({ data }: Props) {
  const items = data.items ?? [];

  const faqData = items
    .filter((item) => item.question)
    .map((item) => ({ question: item.question, answer: item.answer ?? "" }));

  return (
    <SectionWrapper
      backgroundColor={data.backgroundColor}
      textColor={data.textColor}
      paddingSize={data.paddingSize}
      containerWidth={data.containerWidth}
    >
      <JsonLd data={faqJsonLd(faqData)} />

      <Eyebrow text={data.eyebrow} className="mb-6 flex items-center justify-center gap-3" />
      {data.heading && (
        <h2 className="text-3xl font-normal leading-tight tracking-tight text-center sm:text-4xl lg:text-5xl">
          {data.heading}
        </h2>
      )}
      {data.subheading && (
        <p className="mt-4 text-center text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
          {data.subheading}
        </p>
      )}

      <div className="mt-10 mx-auto max-w-3xl">
        <Accordion>
          {items.map((item, idx) => {
            if (!item.question) return null;
            return (
              <AccordionItem key={idx} value={`faq-${idx}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>
                  <div className="prose prose-sm max-w-none">
                    {item.answer && <ReactMarkdown>{item.answer}</ReactMarkdown>}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/faq"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          View all FAQs
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </SectionWrapper>
  );
}
