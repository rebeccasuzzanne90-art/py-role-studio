"use client";

import type { Entry, EntrySkeletonType } from "contentful";
import { SectionWrapper } from "@/components/section-wrapper";
import { StatsSection } from "@/components/sections/stats-section";
import { TestimonialSection } from "@/components/sections/testimonial-section";
import { TrustLogoStripSection } from "@/components/sections/trust-logo-strip-section";
import { ServicesSectionBlock } from "@/components/sections/services-section";
import { TextBlockSection } from "@/components/sections/text-block-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { DuplexSection } from "@/components/sections/duplex-section";
import { TriplexSection } from "@/components/sections/triplex-section";
import { ArticleSliderSection } from "@/components/sections/article-slider-section";
import { CtaSection } from "@/components/sections/cta-section";
import { FaqSectionBlock } from "@/components/sections/faq-section-block";
import { LiveEntry } from "./live-entry";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyEntry = Entry<EntrySkeletonType, any, any>;

const MODULE_MAP: Record<string, React.ComponentType<{ entry: AnyEntry }>> = {
  statsSection: StatsSection,
  testimonialSection: TestimonialSection,
  trustLogoStrip: TrustLogoStripSection,
  servicesSection: ServicesSectionBlock,
  textBlock: TextBlockSection,
  newsletterSection: NewsletterSection,
  duplex: DuplexSection,
  triplex: TriplexSection,
  articleSlider: ArticleSliderSection,
  cta: CtaSection,
  faqSection: FaqSectionBlock,
};

interface Props {
  sections: AnyEntry[];
}

export function LiveModuleRenderer({ sections }: Props) {
  return (
    <>
      {sections.map((entry) => {
        const contentTypeId = entry.sys.contentType?.sys?.id;
        const Component = contentTypeId ? MODULE_MAP[contentTypeId] : null;

        if (!Component) {
          return (
            <SectionWrapper key={entry.sys.id} paddingSize="small">
              <p className="text-sm text-muted-foreground">
                Unknown module: <code>{contentTypeId ?? "unknown"}</code>
              </p>
            </SectionWrapper>
          );
        }

        return (
          <LiveEntry
            key={entry.sys.id}
            entry={entry}
            Component={Component}
          />
        );
      })}
    </>
  );
}
