"use client";

import type { Entry, EntrySkeletonType } from "contentful";
import type { NewsletterSectionFields } from "@/types/contentful";
import { useContentfulInspectorMode } from "@contentful/live-preview/react";
import { SectionWrapper } from "@/components/section-wrapper";
import { NewsletterForm } from "@/components/newsletter-form";
import { Eyebrow } from "@/components/ui/eyebrow";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entry: Entry<EntrySkeletonType, any, any>;
}

export function NewsletterSection({ entry }: Props) {
  const f = entry.fields as unknown as NewsletterSectionFields;
  const inspectorProps = useContentfulInspectorMode({ entryId: entry.sys.id });

  return (
    <SectionWrapper
      backgroundColor={f.backgroundColor}
      paddingSize={f.paddingSize}
    >
      <Eyebrow text={f.eyebrow} className="mb-6 flex items-center justify-center gap-3" inspectorProps={inspectorProps({ fieldId: "eyebrow" })} />
      <NewsletterForm
        heading={f.heading}
        description={f.description}
        buttonLabel={f.buttonLabel}
        headingProps={inspectorProps({ fieldId: "heading" })}
        descriptionProps={inspectorProps({ fieldId: "description" })}
        buttonLabelProps={inspectorProps({ fieldId: "buttonLabel" })}
      />
    </SectionWrapper>
  );
}
