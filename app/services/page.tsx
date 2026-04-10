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
