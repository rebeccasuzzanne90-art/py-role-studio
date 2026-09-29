import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getCourse } from "@/content/courses";
import { ContactForm } from "@/components/contact-form";
import { getPageBySlug } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "Contact The Payroll Studio" },
  description: "Contact The Payroll Studio to discuss payroll consulting, governance, remediation or training. Tell us about your organisation and the support you need.",
  alternates: { canonical: "https://www.thepayrollstudio.com.au/contact" },
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ course?: string | string[]; service?: string | string[] }> }) {
  const query = await searchParams;
  const course = getCourse(query.course);
  const allowedServices = ["understand-the-risk", "build-the-foundations", "stay-ahead-of-problems", "prepare-for-change", "payroll-remediation", "payroll-training"];
  const service = typeof query.service === "string" && allowedServices.includes(query.service) ? getPageBySlug(`services/${query.service}`) : undefined;
  return (
    <>
      <section className="relative overflow-hidden bg-neutral-950 text-white">
        <Image src="/images/how-we-work/canva-document-review.webp" alt="" fill priority sizes="100vw" className="object-cover object-[center_35%] opacity-45" />
        <div className="relative mx-auto max-w-7xl px-5 py-9 sm:px-8 sm:py-12">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/80">Contact The Payroll Studio</p>
          <h1 className="mt-4 max-w-3xl font-heading text-3xl leading-tight tracking-tight sm:text-5xl">Get clarity on your payroll risks and next steps.</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90">Concerned about payroll accuracy, preparing for change or strengthening your controls? Tell us what’s happening. We’ll help you identify where to start.</p>
        </div>
      </section>
      <section id="enquiry" className="scroll-mt-24 bg-[#f7f5f2] py-7 sm:py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <aside className="order-2 lg:order-1">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-600">A conversation with a practitioner</p>
            <h2 className="mt-3 font-heading text-3xl">You’ll hear from Rebecca.</h2>
            <p className="mt-3 text-sm font-medium">Rebecca Wade · Founder, The Payroll Studio</p>
            <div className="relative mt-6 aspect-[4/3] max-w-md overflow-hidden rounded-lg">
              <Image src="/images/events/payroll-summit-2026/payroll-summit-conversation.jpg" alt="Rebecca Wade with a fellow attendee at the Australian Payroll Summit" fill sizes="(min-width: 1024px) 420px, 90vw" className="object-cover" />
            </div>
            <p className="mt-5 max-w-md leading-relaxed text-neutral-700">18 years across payroll operations, consulting and transformation. Rebecca’s experience includes Big Four consulting, complex remediation programs and three years focused on compliance at Yellow Canary.</p>
            <Link href="/about" className="mt-3 inline-block text-sm font-medium underline underline-offset-4">Meet Rebecca →</Link>
            <div className="mt-8 border-t border-neutral-300 pt-6">
              <h3 className="text-lg font-medium">What happens next</h3>
              <ol className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-700">
                <li><strong>1. Rebecca reviews your enquiry.</strong> A short summary is enough to begin.</li>
                <li><strong>2. She responds by email within 48 hours.</strong> You can discuss the issue, important timing and the support you need.</li>
                <li><strong>3. Agree a sensible next step.</strong> Any scope and fees are agreed before work begins.</li>
              </ol>
            </div>
            <p className="mt-6 text-sm">Prefer email? <a href="mailto:rebecca@thepayrollstudio.com.au" className="break-words underline underline-offset-4">rebecca@thepayrollstudio.com.au</a></p>
          </aside>
          <div className="order-1 lg:order-2">
            <div className="mb-6 rounded-lg border border-neutral-300 bg-white p-5 sm:p-6">
              <h2 className="font-heading text-2xl">Prefer to talk?</h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700">Book a 30-minute meeting with Rebecca to discuss your payroll concerns and the support you need. Choose an available time on Calendly.</p>
              <a
                href="https://calendly.com/rebeccasuzzanne90/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-neutral-950 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 sm:w-auto"
              >
                Book 30 minutes with Rebecca <span aria-hidden="true" className="ml-2">↗</span>
                <span className="sr-only"> (opens Calendly in a new tab)</span>
              </a>
              <p className="mt-3 text-xs text-neutral-600">30 minutes · Google Meet · Or send an enquiry below.</p>
            </div>
            <p className="mb-4 text-sm text-neutral-700 lg:hidden">Rebecca Wade will review your enquiry and respond by email within 48 hours.</p>
            <ContactForm key={course?.slug ?? service?.slug ?? "general"} courseTitle={course?.title} serviceTitle={service?.title} />
          </div>
        </div>
      </section>
    </>
  );
}
