"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeToNewsletter } from "@/app/actions";

interface NewsletterFormProps {
  variant?: "default" | "footer";
  heading?: string;
  description?: string;
  buttonLabel?: string;
  headingProps?: Record<string, string> | null;
  descriptionProps?: Record<string, string> | null;
  buttonLabelProps?: Record<string, string> | null;
}

export function NewsletterForm({
  variant = "default",
  heading = "Stay Up to Date",
  description = "Subscribe for payroll governance and compliance updates.",
  buttonLabel = "Subscribe",
  headingProps,
  descriptionProps,
  buttonLabelProps,
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setErrorMessage("");
    try {
      const result = await subscribeToNewsletter(name, email);
      if (!result.success) {
        setErrorMessage(result.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setEmail("");
      setName("");
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="text-sm font-medium text-green-600">
        Thank you for subscribing to The Payroll Studio updates!
      </p>
    );
  }

  if (variant === "footer") {
    return (
      <div className="max-w-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
        <Input
          type="email"
          placeholder="Enter your email"
          aria-label="Email address for newsletter"
          autoComplete="email"
          maxLength={254}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-10"
        />
        <Button type="submit" size="sm" disabled={status === "loading"}>
          {status === "loading" ? "..." : buttonLabel}
        </Button>
      </form>
      {status === "error" && <p role="alert" className="mt-2 text-sm text-destructive">{errorMessage}</p>}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl text-center">
      <h2 {...headingProps} className="text-3xl font-normal leading-tight tracking-tight sm:text-4xl lg:text-5xl">{heading}</h2>
      {description && (
        <p {...descriptionProps} className="mt-4 text-lg leading-relaxed text-muted-foreground">{description}</p>
      )}
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="First name"
          aria-label="First name"
          maxLength={100}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-11"
        />
        <Input
          type="email"
          placeholder="Email address"
          aria-label="Email address for newsletter"
          autoComplete="email"
          maxLength={254}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-11"
        />
        <Button type="submit" size="lg" disabled={status === "loading"}>
          <span {...buttonLabelProps}>{status === "loading" ? "Subscribing..." : buttonLabel}</span>
        </Button>
      </form>
      {status === "error" && (
        <p role="alert" className="mt-2 text-sm text-destructive">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
