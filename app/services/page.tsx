import type { Metadata } from "next";
import Script from "next/script";
import { getPageBySlug } from "@/lib/content";
import { ModuleRenderer } from "@/components/module-renderer";

export const metadata: Metadata = {
  title: "Services",
  description: "Payroll compliance and governance support, built around your situation.",
};

export default function ServicesPage() {
  const page = getPageBySlug("services");

  return (
    <>
      {page?.sections && page.sections.length > 0 && (
        <ModuleRenderer sections={page.sections} />
      )}

      <section id="contact" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-3">
            <div>
              <h2 className="text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
                Contact Us
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Ready to talk through your payroll governance situation? Get in touch and we'll take it from there.
              </p>
            </div>
            <div className="lg:col-span-2">
              <Script
                src="https://js-ap1.hsforms.net/forms/embed/442998450.js"
                strategy="lazyOnload"
              />
              <div
                className="hs-form-frame"
                data-region="ap1"
                data-form-id="b8475605-26c1-402b-9976-047a89532d6a"
                data-portal-id="442998450"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
