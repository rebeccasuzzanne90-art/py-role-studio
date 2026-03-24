import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Headphones, BookOpen, Video, ExternalLink } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Access whitepapers, guides, podcasts, and videos on data security and compliance.",
};

const RESOURCES = [
  {
    title: "HIPAA Compliance Checklist 2026",
    type: "whitepaper" as const,
    description:
      "A comprehensive checklist to help you evaluate your organization's HIPAA compliance status.",
    url: "#",
  },
  {
    title: "SOC2 Readiness Assessment Template",
    type: "guide" as const,
    description:
      "Download our free template to assess your organization's readiness for SOC2 certification.",
    url: "#",
  },
  {
    title: "Data Security Decoded — Podcast",
    type: "podcast" as const,
    description:
      "Weekly episodes covering the latest in data security, featuring industry experts and real-world case studies.",
    url: "#",
  },
  {
    title: "Understanding ISO 27001 in 30 Minutes",
    type: "video" as const,
    description:
      "A concise video overview of what ISO 27001 requires and how to get started on the certification path.",
    url: "#",
  },
  {
    title: "Ransomware Response Playbook",
    type: "whitepaper" as const,
    description:
      "A step-by-step guide for responding to ransomware incidents, from detection to recovery.",
    url: "#",
  },
  {
    title: "GDPR for US Companies",
    type: "guide" as const,
    description:
      "Essential guidance for American companies handling EU personal data under GDPR.",
    url: "#",
  },
];

const TYPE_ICONS = {
  whitepaper: FileText,
  podcast: Headphones,
  guide: BookOpen,
  video: Video,
};

export default function ResourcesPage() {
  return (
    <>
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Resources
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80">
            Whitepapers, guides, podcasts, and more to keep you informed
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {RESOURCES.map((resource) => {
              const Icon = TYPE_ICONS[resource.type];
              return (
                <Card key={resource.title} className="group h-full transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-2 flex items-center gap-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <Badge variant="secondary" className="capitalize">
                        {resource.type}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={resource.url}>
                      <Button variant="outline" size="sm" className="gap-2">
                        Access Resource
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
