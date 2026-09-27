"use client";

import { useRef, useState, type FormEvent } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { Button } from "@/components/ui/button";
import { createContactConversionTracker } from "@/lib/contact-conversion";

const reportConversion = createContactConversionTracker(sendGAEvent);

const inputClass = "mt-2 min-h-12 w-full rounded-lg border border-input bg-white px-3 py-2 text-base text-foreground";

export function ContactForm({ courseTitle }: { courseTitle?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const submitting = useRef(false);

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

  return (
    <form onSubmit={submit} className="rounded-xl border bg-white p-6 shadow-sm sm:p-10" aria-label="Contact Us" aria-busy={status === "sending"}>
      <h2 className="text-2xl font-semibold tracking-tight">{courseTitle ? "Request a training quote" : "Contact Us"}</h2>
      {courseTitle && <p className="mt-3 font-medium text-primary">{courseTitle}</p>}
      <p className="mt-3 text-muted-foreground">We&apos;d love to hear from you! Please fill out the form and we&apos;ll get back to you as soon as possible.</p>
      <p className="mt-3 text-sm text-muted-foreground">Fields marked * are required.</p>
      <fieldset disabled={status === "sending"} className="mt-8 grid gap-6 disabled:opacity-70 sm:grid-cols-2">
        <legend className="sr-only">Your contact details</legend>
        {[
          { name: "firstName", label: "First Name", autoComplete: "given-name", required: true },
          { name: "lastName", label: "Last Name", autoComplete: "family-name", required: true },
          { name: "email", label: "Email", autoComplete: "email", required: true },
          { name: "company", label: "Company name", autoComplete: "organization", required: false },
          { name: "role", label: "Role", autoComplete: "organization-title", required: false },
        ].map(field => (
          <label key={field.name} className="text-sm font-medium" htmlFor={field.name}>
            {field.label}{field.required ? " *" : " (optional)"}
            <input id={field.name} name={field.name} type={field.name === "email" ? "email" : "text"} autoComplete={field.autoComplete} maxLength={254} required={field.required} className={inputClass} />
          </label>
        ))}
        <label className="text-sm font-medium" htmlFor="phone">
          Phone Number (optional)
          <input id="phone" name="phone" type="tel" autoComplete="tel" defaultValue="+61 " maxLength={30} aria-describedby="phone-hint" className={inputClass} />
          <span id="phone-hint" className="mt-2 block text-xs font-normal text-muted-foreground">Enter your number after +61, or change the country code for an international number.</span>
        </label>
        <label className="text-sm font-medium sm:col-span-2" htmlFor="message">
          Message *
          <textarea id="message" name="message" rows={6} required maxLength={5000} defaultValue={courseTitle ? `I would like a quote for ${courseTitle}.\n\nNumber of participants: \nPreferred delivery (in-house or virtual): \nPreferred timing: \nWhat our team would like to focus on: ` : ""} className={`${inputClass} resize-y`} />
        </label>
        <label className="flex items-start gap-3 text-sm sm:col-span-2" htmlFor="newsSignup">
          <input id="newsSignup" name="newsSignup" type="checkbox" className="mt-0.5 size-4 accent-primary" />
          Sign up for news and updates
        </label>
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <Button type="submit" className="min-h-11 sm:col-span-2 sm:justify-self-start" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Submit"}</Button>
      </fieldset>
      <div aria-live="polite" aria-atomic="true">
        {status === "success" && <p className="mt-6 rounded-lg border bg-muted p-4" role="status">Thank you! Your message has been sent. We&apos;ll get back to you as soon as possible.</p>}
        {status === "error" && <p className="mt-6 rounded-lg border border-destructive p-4 text-destructive" role="alert">{error}</p>}
      </div>
    </form>
  );
}
