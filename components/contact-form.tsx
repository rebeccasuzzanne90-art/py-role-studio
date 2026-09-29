"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";
import { Button } from "@/components/ui/button";
import { createContactConversionTracker } from "@/lib/contact-conversion";

const reportConversion = createContactConversionTracker(sendGAEvent);

const inputClass = "mt-2 min-h-12 w-full rounded-lg border border-input bg-white px-3 py-2 text-base text-foreground";

export function ContactForm({ courseTitle, serviceTitle }: { courseTitle?: string; serviceTitle?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const submitting = useRef(false);
  const confirmation = useRef<HTMLHeadingElement>(null);
  useEffect(() => { if (status === "success") confirmation.current?.focus(); }, [status]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    const form = event.currentTarget;
    const fields = new FormData(form);
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(fields), newsSignup: fields.get("newsSignup") === "on" }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || "Unable to send your message. Please try again.");
      setStatus("success");
      if (process.env.NODE_ENV === "production") {
        reportConversion(response.ok, result);
      }
      form.reset();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to send your message. Please try again.");
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  }

  if (status === "success") return (
    <section className="rounded-xl border bg-white p-6 sm:p-10" aria-label="Enquiry confirmation">
      <h2 ref={confirmation} tabIndex={-1} className="text-2xl font-semibold">Thank you. Your enquiry is with Rebecca.</h2>
      <p className="mt-4 leading-relaxed text-muted-foreground">Rebecca will review your message and respond by email within 48 hours to discuss your situation and the next steps. If you supplied a phone number, she may use it to follow up.</p>
      <div className="mt-8 border-t pt-8"><NewsletterForm heading="Keep in touch" description="Optional: receive payroll governance and compliance updates." /></div>
    </section>
  );

  return (
    <form onSubmit={submit} className="rounded-xl border bg-white p-6 shadow-sm sm:p-10" aria-label="Contact Us" aria-busy={status === "sending"}>
      <h2 className="text-2xl font-semibold tracking-tight">{courseTitle ? "Request a training quote" : "Tell us what’s happening"}</h2>
      {courseTitle && <p className="mt-3 font-medium text-primary">{courseTitle}</p>}
      {!courseTitle && serviceTitle && <p className="mt-3 font-medium text-primary">{serviceTitle}</p>}
      <p className="mt-3 text-muted-foreground">A sentence or two is enough. We’ll use your enquiry to understand what you need and discuss where to start.</p>
      <p className="mt-3 text-sm text-muted-foreground">Fields marked * are required.</p>
      <fieldset disabled={status === "sending"} className="mt-8 grid gap-6 disabled:opacity-70 sm:grid-cols-2">
        <legend className="sr-only">Your contact details</legend>
        {[
          { name: "name", label: "Name", autoComplete: "name", required: true },
          { name: "email", label: "Email", autoComplete: "email", required: true },
          { name: "company", label: "Company name", autoComplete: "organization", required: false },
        ].map(field => (
          <label key={field.name} className="text-sm font-medium" htmlFor={field.name}>
            {field.label}{field.required ? " *" : " (optional)"}
            <input id={field.name} name={field.name} type={field.name === "email" ? "email" : "text"} autoComplete={field.autoComplete} maxLength={254} required={field.required} className={inputClass} />
          </label>
        ))}
        <label className="text-sm font-medium" htmlFor="phone">
          Phone Number (optional)
          <input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={30} aria-describedby="phone-hint" className={inputClass} />
          <span id="phone-hint" className="mt-2 block text-xs font-normal text-muted-foreground">Only if you would like a phone follow-up. Include the country code for numbers outside Australia.</span>
        </label>
        <label className="text-sm font-medium sm:col-span-2" htmlFor="message">
          What would you like help with? *
          <textarea id="message" name="message" rows={4} aria-describedby="message-hint" required maxLength={5000} defaultValue={courseTitle ? `I would like a quote for ${courseTitle}.\n\nNumber of participants: \nPreferred delivery (in-house or virtual): \nPreferred timing: \nWhat our team would like to focus on: ` : serviceTitle ? `I would like to discuss ${serviceTitle}.\n\nWhat our team needs help with: \nTiming: ` : ""} className={`${inputClass} resize-y`} />
        </label>
        <p id="message-hint" className="-mt-3 text-xs leading-relaxed text-muted-foreground sm:col-span-2">A sentence or two is enough. Please don’t include employee payroll records or sensitive employee information.</p>
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <Button type="submit" className="min-h-12 w-full bg-black text-white hover:bg-neutral-800 sm:col-span-2" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send my enquiry"}</Button>
      </fieldset>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">We use your details to respond to your enquiry. Sending this form does not subscribe you to marketing. Read our <Link href="/privacy" className="underline underline-offset-2">privacy policy</Link>.</p>
      <div aria-live="polite" aria-atomic="true">
        {status === "error" && <p className="mt-6 rounded-lg border border-destructive p-4 text-destructive" role="alert">{error}</p>}
      </div>
    </form>
  );
}
