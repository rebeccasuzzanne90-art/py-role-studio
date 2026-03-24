import type { Metadata } from "next";
import { Shield, Target, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about VanRein Compliance — over 25 years of experience helping organizations navigate data security regulations.",
};

const VALUES = [
  {
    icon: Shield,
    title: "Security First",
    description:
      "We believe data security is not optional. Every recommendation we make is grounded in real-world risk assessment.",
  },
  {
    icon: Target,
    title: "Results Driven",
    description:
      "We measure success by the tangible improvements we deliver — reduced risk, streamlined processes, and audit readiness.",
  },
  {
    icon: Award,
    title: "Expert Guidance",
    description:
      "Our team holds certifications across HIPAA, SOC2, ISO 27001, HITRUST, and GDPR with decades of combined experience.",
  },
  {
    icon: Users,
    title: "Partner Approach",
    description:
      "We don't just audit and leave. We embed with your team, train your staff, and provide ongoing support.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            About VanRein Compliance
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80">
            With over 25 years of experience, we help organizations navigate
            HIPAA, SOC2, ISO27001, HITRUST, GDPR, and other data security
            regulations.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Data security doesn&apos;t have to be confusing and overwhelming.
              Our mission is to make compliance accessible, understandable, and
              achievable for organizations of every size. We provide one-on-one
              support and help with the entire data security suite — from audits
              and execution to team training and ongoing support.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">
            Our Values
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => (
              <div key={value.title} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">{value.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Our Team</h2>
            <p className="mt-4 text-muted-foreground">
              Led by Rob and Dawn Van Buskirk, our team of compliance experts
              brings decades of experience across healthcare, fintech, SaaS, and
              telecommunications.
            </p>
            <div className="mt-8">
              <Link href="/contact">
                <Button size="lg">Work With Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
