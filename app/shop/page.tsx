import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ShoppingCart } from "lucide-react";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse our compliance training courses, policy packages, and security tools.",
};

const PRODUCTS = [
  {
    title: "HIPAA Compliance Training",
    slug: "hipaa-training",
    description:
      "Comprehensive HIPAA training for all staff members. Includes interactive modules, quizzes, and certification of completion.",
    price: 299,
    badge: "Most Popular",
  },
  {
    title: "Security Awareness Program",
    slug: "security-awareness",
    description:
      "Annual security awareness training covering phishing, social engineering, password hygiene, and data handling best practices.",
    price: 199,
  },
  {
    title: "Policies & Procedures Package",
    slug: "policies-package",
    description:
      "A complete package of customizable security policies and procedures tailored to your industry and regulatory requirements.",
    price: 499,
  },
  {
    title: "SOC2 Readiness Course",
    slug: "soc2-readiness",
    description:
      "Self-paced course covering everything you need to prepare for SOC2 Type I and Type II audits.",
    price: 399,
  },
  {
    title: "Incident Response Planning Kit",
    slug: "incident-response-kit",
    description:
      "Templates, checklists, and training materials for building a robust incident response capability.",
    price: 249,
  },
  {
    title: "GDPR Compliance Toolkit",
    slug: "gdpr-toolkit",
    description:
      "Everything your organization needs to achieve and maintain GDPR compliance, including templates and assessment tools.",
    price: 349,
  },
];

export default function ShopPage() {
  return (
    <>
      <section className="py-20 text-white" style={{ backgroundColor: "#1e3a2a" }}>
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Shop
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Training courses, policy packages, and tools to strengthen your
            compliance
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product) => (
              <Card
                key={product.slug}
                className="group flex h-full flex-col transition-all hover:shadow-lg"
              >
                <CardHeader className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    {product.badge && (
                      <Badge variant="default">{product.badge}</Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{product.title}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between border-t pt-4">
                  <span className="text-2xl font-bold">
                    ${product.price}
                  </span>
                  <Link href={`/shop/${product.slug}`}>
                    <Button size="sm" className="gap-2">
                      <ShoppingCart className="h-3.5 w-3.5" />
                      Buy Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
