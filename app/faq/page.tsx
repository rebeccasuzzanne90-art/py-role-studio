import type { Metadata } from "next";
import { FaqAccordion } from "@/components/faq-accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about data security compliance, our services, and how we can help your organization.",
};

export default function FaqPage() {
  return (
    <>
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80">
            Find answers to common questions about compliance and our services
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <FaqAccordion />

          <div className="mt-12 rounded-xl border bg-muted/30 p-8 text-center">
            <h3 className="text-xl font-bold">
              Still Have Questions?
            </h3>
            <p className="mt-2 text-muted-foreground">
              Our team is ready to help with any compliance questions.
            </p>
            <Link href="/contact" className="mt-4 inline-block">
              <Button>Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
