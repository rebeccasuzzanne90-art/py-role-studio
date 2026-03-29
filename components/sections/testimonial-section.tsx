import type { TestimonialSectionData } from "@/types/content";
import { SectionWrapper } from "@/components/section-wrapper";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { Eyebrow } from "@/components/ui/eyebrow";

interface Props {
  data: TestimonialSectionData;
}

export function TestimonialSection({ data }: Props) {
  const testimonials = (data.testimonials ?? []).map((t) => ({
    quote: t.quote,
    authorName: t.authorName,
    authorRole: t.authorRole,
    company: t.company,
    rating: t.rating,
  }));

  return (
    <SectionWrapper
      backgroundColor={data.backgroundColor}
      textColor={data.textColor}
      paddingSize={data.paddingSize}
      containerWidth={data.containerWidth}
      className={data.backgroundColor ? "" : "bg-muted/30"}
    >
      <Eyebrow text={data.eyebrow} className="mb-6 flex items-center justify-center gap-3" />
      <TestimonialCarousel
        heading={data.heading}
        subheading={data.subheading}
        testimonials={testimonials}
      />
    </SectionWrapper>
  );
}
