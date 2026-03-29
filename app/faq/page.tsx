import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getPageBySlug } from "@/lib/content";
import type { FaqSectionData } from "@/types/content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ReactMarkdown from "react-markdown";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about payroll compliance and governance.",
};

export default function FaqPage() {
  const home = getPageBySlug("home");
  const faqSection = home?.sections?.find(
    (s): s is FaqSectionData => s._type === "faqSection"
  );
  const items = faqSection?.items ?? [];

  return (
    <>
      <section className="py-20 text-white" style={{ backgroundColor: "#1e3a2a" }}>
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Common questions about payroll compliance and governance
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Accordion className="w-full">
            {items.map((item, i) => {
              if (!item.question) return null;
              return (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-base font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="prose prose-sm max-w-none text-muted-foreground">
                      {item.answer && <ReactMarkdown>{item.answer}</ReactMarkdown>}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          <div className="mt-12 rounded-xl border bg-muted/30 p-8 text-center">
            <h3 className="text-xl font-bold">Still Have Questions?</h3>
            <p className="mt-2 text-muted-foreground">
              Get in touch and we'll be happy to help.
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
