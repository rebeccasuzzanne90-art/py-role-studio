import type { Entry, EntrySkeletonType } from "contentful";
import type { NewsletterSectionFields } from "@/types/contentful";
import { SectionWrapper } from "@/components/section-wrapper";
import { NewsletterForm } from "@/components/newsletter-form";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entry: Entry<EntrySkeletonType, any, any>;
}

export function NewsletterSection({ entry }: Props) {
  const f = entry.fields as unknown as NewsletterSectionFields;

  return (
    <SectionWrapper
      backgroundColor={f.backgroundColor}
      paddingSize={f.paddingSize}
    >
      <NewsletterForm
        heading={f.heading}
        description={f.description}
        buttonLabel={f.buttonLabel}
      />
    </SectionWrapper>
  );
}
