"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import { submitContactForm } from "@/app/actions";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    try {
      await submitContactForm({
        name: form.get("name") as string,
        email: form.get("email") as string,
        company: form.get("company") as string,
        message: form.get("message") as string,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <section className="py-20 text-white" style={{ backgroundColor: "#1e3a2a" }}>
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Ready to start your compliance journey? Get in touch for a free risk
            review.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Contact info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">
                      hello@vanreincompliance.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">
                      (555) 123-4567
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">
                      United States (Remote-first)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Get a Free Risk Review</CardTitle>
                </CardHeader>
                <CardContent>
                  {status === "success" ? (
                    <div className="flex flex-col items-center gap-4 py-8 text-center">
                      <CheckCircle className="h-12 w-12 text-green-600" />
                      <h3 className="text-xl font-bold">Message Sent!</h3>
                      <p className="text-muted-foreground">
                        We&apos;ll get back to you within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            required
                            placeholder="John Smith"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="john@company.com"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          name="company"
                          placeholder="Your company name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">
                          How Can We Help? *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          placeholder="Tell us about your compliance needs..."
                        />
                      </div>
                      {status === "error" && (
                        <p className="text-sm text-destructive">
                          Something went wrong. Please try again.
                        </p>
                      )}
                      <Button
                        type="submit"
                        size="lg"
                        disabled={status === "loading"}
                      >
                        {status === "loading" ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
