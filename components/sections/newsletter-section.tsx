import type { NewsletterSectionData } from "@/types/content";
import { SectionWrapper } from "@/components/section-wrapper";
import { NewsletterForm } from "@/components/newsletter-form";
import { Eyebrow } from "@/components/ui/eyebrow";

interface Props {
  data: NewsletterSectionData;
}

export function NewsletterSection({ data }: Props) {
  return (
    <SectionWrapper
      backgroundColor={data.backgroundColor}
      paddingSize={data.paddingSize}
    >
      <Eyebrow text={data.eyebrow} className="mb-6 flex items-center justify-center gap-3" />
      <NewsletterForm
        heading={data.heading}
        description={data.description}
        buttonLabel={data.buttonLabel}
      />
    </SectionWrapper>
  );
}
