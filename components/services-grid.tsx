import { ServiceCard } from "@/components/service-card";

const SERVICES = [
  {
    title: "HIPAA",
    slug: "hipaa",
    description:
      "Ensure your healthcare organization's compliance with the Health Insurance Portability and Accountability Act through our expert guidance and tailored solutions.",
  },
  {
    title: "ISO 27001 & ISO 42001",
    slug: "iso-27001",
    description:
      "Elevate your organization's information security posture with ISO 27001 & ISO 42001 certification, supported by our proven methodologies.",
  },
  {
    title: "SOC2",
    slug: "soc2",
    description:
      "Build trust with your clients by demonstrating your commitment to security and privacy through SOC2 compliance.",
  },
  {
    title: "GDPR",
    slug: "gdpr",
    description:
      "Safeguard the personal data of your EU clients with GDPR compliance strategies, ensuring your global operations meet stringent data protection regulations.",
  },
  {
    title: "HITRUST",
    slug: "hitrust",
    description:
      "Achieve the gold standard in healthcare security with HITRUST certification, supported by our experts.",
  },
  {
    title: "Data Security Audits",
    slug: "data-security-audits",
    description:
      "Identify vulnerabilities and enhance your security framework with our meticulous data security audits.",
  },
  {
    title: "Fractional CISO",
    slug: "fractional-ciso",
    description:
      "Access the expertise of a seasoned Chief Information Security Officer on a flexible basis, tailored to your needs.",
  },
  {
    title: "Pen Tests",
    slug: "pen-tests",
    description:
      "Uncover weaknesses in your security infrastructure through thorough penetration testing.",
  },
  {
    title: "Disaster Recovery",
    slug: "disaster-recovery",
    description:
      "Develop robust disaster recovery plans to ensure business continuity, minimizing downtime and data loss.",
  },
  {
    title: "Team Training",
    slug: "team-training",
    description:
      "Empower your workforce with essential cybersecurity knowledge through comprehensive training programs.",
  },
];

export function ServicesGrid() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your All-in-One Data Security Solution
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From audits and execution to team training and ongoing
            support.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SERVICES.map((service) => (
            <ServiceCard key={service.slug} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
