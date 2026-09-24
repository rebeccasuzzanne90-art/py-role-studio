import type { Metadata } from "next";
import Script from "next/script";
import { getPageBySlug } from "@/lib/content";
import { ModuleRenderer } from "@/components/module-renderer";

export const metadata: Metadata = {
  title: { absolute: "Payroll Advisory Services | The Payroll Studio" },
  description: "Explore payroll advisory services for Australian organisations: compliance reviews, governance frameworks, transformation oversight, remediation and training.",
  alternates: { canonical: "https://www.thepayrollstudio.com.au/services" },
};

export default function ServicesPage() {
  const page = getPageBySlug("services");

  return (
    <>
      <section className="border-b bg-muted py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">Payroll advisory services</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">Find the right support for payroll compliance, governance, transformation, remediation or team training.</p>
        </div>
      </section>
      {page?.sections && page.sections.length > 0 && (
        <ModuleRenderer sections={page.sections} />
      )}

      <section id="contact" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
      </section>
    </>
  );
}
