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
}

export function NewsletterForm({
  variant = "default",
  heading = "Stay Up to Date",
  description = "Subscribe to our newsletter for data security and compliance updates.",
  buttonLabel = "Subscribe",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await subscribeToNewsletter(name, email);
      setStatus("success");
      setEmail("");
      setName("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-sm font-medium text-green-600">
        Thank you for subscribing! Check your email to confirm.
      </p>
    );
  }

  if (variant === "footer") {
    return (
      <form onSubmit={handleSubmit} className="flex max-w-sm flex-col gap-2 sm:flex-row">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-10"
        />
        <Button type="submit" size="sm" disabled={status === "loading"}>
          {status === "loading" ? "..." : buttonLabel}
        </Button>
      </form>
    );
  }

  return (
    <div className="mx-auto max-w-xl text-center">
      <h2 className="text-2xl font-bold sm:text-3xl">{heading}</h2>
      {description && (
        <p className="mt-2 text-muted-foreground">{description}</p>
      )}
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="First name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-11"
        />
        <Input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-11"
        />
        <Button type="submit" size="lg" disabled={status === "loading"}>
          {status === "loading" ? "Subscribing..." : buttonLabel}
        </Button>
      </form>
      {status === "error" && (
        <p className="mt-2 text-sm text-destructive">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
