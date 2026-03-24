"use client";

import type { Entry, EntrySkeletonType } from "contentful";
import type {
  TestimonialSectionFields,
  TestimonialFields,
} from "@/types/contentful";
import { SectionWrapper } from "@/components/section-wrapper";
import { TestimonialCarousel } from "@/components/testimonial-carousel";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entry: Entry<EntrySkeletonType, any, any>;
}

export function TestimonialSection({ entry }: Props) {
  const f = entry.fields as unknown as TestimonialSectionFields;
  const items = (f.testimonials ?? []) as unknown as Entry<EntrySkeletonType>[];

  const testimonials = items.map((t) => {
    const tf = t.fields as unknown as TestimonialFields;
    return {
      quote: tf.quote,
      authorName: tf.authorName,
      authorRole: tf.authorRole,
      company: tf.company,
      rating: tf.rating,
    };
  });

  return (
    <SectionWrapper
      backgroundColor={f.backgroundColor}
      textColor={f.textColor}
      paddingSize={f.paddingSize}
      containerWidth={f.containerWidth}
      className={f.backgroundColor ? "" : "bg-muted/30"}
    >
      <TestimonialCarousel
        heading={f.heading}
        subheading={f.subheading}
        testimonials={testimonials}
      />
    </SectionWrapper>
  );
}
