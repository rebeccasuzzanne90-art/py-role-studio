import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: { absolute: "Contact The Payroll Studio" },
  description: "Contact The Payroll Studio to discuss payroll consulting, governance, remediation or training. Tell us about your organisation and the support you need.",
  alternates: { canonical: "https://www.thepayrollstudio.com.au/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="py-20 text-foreground" style={{ backgroundColor: "var(--muted)" }}>
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Contact The Payroll Studio</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Ready to start your payroll governance journey? Talk to one of our experts.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
