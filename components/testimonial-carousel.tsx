"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  quote: string;
  authorName: string;
  authorRole?: string;
  company?: string;
  rating?: number;
}

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Before VanRein, audits were a constant source of stress. Since putting their recommendations in place, onboarding new clients is simple. The process is smooth, streamlined, and a huge relief.",
    authorName: "Benjamin Pure",
    authorRole: "VP Client Solutions",
    company: "Patient Connect",
    rating: 5,
  },
  {
    quote:
      "VanRein Compliance has been a lifesaver! None have even come close to providing the personal assistance and professionalism that we receive from VanRein. One of the best decisions we've made for our business!",
    authorName: "Jen Schulz",
    authorRole: "Owner",
    company: "Answer Midwest",
    rating: 5,
  },
  {
    quote:
      "We are so thankful to have partnered up with VanRein. Anyone needing help with HIPAA compliance should connect with them. I only wished we would have found them before our first audit.",
    authorName: "Lori Horton",
    authorRole: "President",
    company: "A Professional Image",
    rating: 5,
  },
  {
    quote:
      "The team at VanRein is fantastic! They've been our compliance partner for 2 years and we've been very impressed. Extremely responsive to any questions and made our experience a positive one.",
    authorName: "Jill L.",
    authorRole: "CEO",
    company: "eLivelihood",
    rating: 5,
  },
];

interface TestimonialCarouselProps {
  heading?: string;
  subheading?: string;
  testimonials?: Testimonial[];
}

export function TestimonialCarousel({
  heading = "What Our Clients Are Saying",
  subheading = "Trusted by companies that take data security seriously",
  testimonials = FALLBACK_TESTIMONIALS,
}: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;
  const prev = () => setCurrent((c) => (c === 0 ? total - 1 : c - 1));
  const next = () => setCurrent((c) => (c === total - 1 ? 0 : c + 1));
  const t = testimonials[current];

  return (
    <div>
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-normal leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          {heading}
        </h2>
        {subheading && (
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{subheading}</p>
        )}
      </div>

      <div className="mx-auto max-w-3xl">
        <Card className="border-0 bg-background shadow-md">
          <CardContent className="px-4 py-8 text-center sm:px-8 sm:py-10">
            {t.rating && (
              <div className="mb-4 flex justify-center gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            )}
            <blockquote className="text-lg leading-relaxed text-foreground sm:text-xl">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="mt-6">
              <p className="font-semibold">{t.authorName}</p>
              <p className="text-sm text-muted-foreground">
                {t.authorRole}
                {t.company && `, ${t.company}`}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex items-center justify-center gap-4">
          <Button variant="outline" size="icon" onClick={prev}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            {current + 1} / {total}
          </span>
          <Button variant="outline" size="icon" onClick={next}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
