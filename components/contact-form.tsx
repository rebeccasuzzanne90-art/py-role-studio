"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { phoneCountries } from "@/lib/contact";

const inputClass = "mt-2 min-h-12 w-full rounded-lg border border-input bg-white px-3 py-2 text-base text-foreground";

export function ContactForm() {
  const [country, setCountry] = useState("AU");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
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
      form.reset();
      setCountry("AU");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to send your message. Please try again.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={submit} className="rounded-xl border bg-white p-6 shadow-sm sm:p-10" aria-label="Contact Us" aria-busy={status === "sending"}>
      <h2 className="text-2xl font-semibold tracking-tight">Contact Us</h2>
      <p className="mt-3 text-muted-foreground">We&apos;d love to hear from you! Please fill out the form and we&apos;ll get back to you as soon as possible.</p>
      <p className="mt-3 text-sm text-muted-foreground">Fields marked * are required.</p>
      <fieldset disabled={status === "sending"} className="mt-8 grid gap-6 disabled:opacity-70 sm:grid-cols-2">
        <legend className="sr-only">Your contact details</legend>
        {[
          { name: "firstName", label: "First Name", autoComplete: "given-name" },
          { name: "lastName", label: "Last Name", autoComplete: "family-name" },
          { name: "email", label: "Email", autoComplete: "email" },
          { name: "company", label: "Company name", autoComplete: "organization" },
        ].map(field => (
          <label key={field.name} className="text-sm font-medium" htmlFor={field.name}>
            {field.label} *
            <input id={field.name} name={field.name} type={field.name === "email" ? "email" : "text"} autoComplete={field.autoComplete} maxLength={254} required className={inputClass} />
          </label>
        ))}
        <label className="text-sm font-medium" htmlFor="country">
          Phone country *
          <select id="country" name="country" value={country} onChange={e => setCountry(e.target.value)} className={inputClass} required>
            {phoneCountries.map(c => <option key={c.code} value={c.code}>{c.label}{c.dial ? ` (${c.dial})` : ""}</option>)}
          </select>
        </label>
        <label className="text-sm font-medium" htmlFor="phone">
          Phone Number *
          <input id="phone" name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={30} aria-describedby="phone-hint" className={inputClass} />
          <span id="phone-hint" className="mt-2 block text-xs font-normal text-muted-foreground">{country === "OTHER" ? "Include your country code, starting with +." : `Country code ${phoneCountries.find(c => c.code === country)?.dial}. You can enter a local or international number.`}</span>
        </label>
        <label className="text-sm font-medium sm:col-span-2" htmlFor="message">
          Message *
          <textarea id="message" name="message" rows={6} required maxLength={5000} className={`${inputClass} resize-y`} />
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
