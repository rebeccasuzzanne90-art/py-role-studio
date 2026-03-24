import type { Metadata } from "next";
import { ServicesGrid } from "@/components/services-grid";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore our comprehensive data security and compliance services including HIPAA, SOC2, ISO 27001, GDPR, HITRUST, and more.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="py-20 text-white" style={{ backgroundColor: "#1e3a2a" }}>
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Our Services
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            We&apos;re not just a platform that runs an audit and gives you a
            to-do list — we provide one-on-one support with the entire data
            security suite.
          </p>
        </div>
      </section>

      <ServicesGrid />

      <section className="border-t bg-muted/30 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold">
            Not Sure Which Service You Need?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Start with a free risk review and our team will recommend the right
            path for your organization.
          </p>
          <div className="mt-6">
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                Get a Free Risk Review
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
