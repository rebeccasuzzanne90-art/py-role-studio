import type { Metadata } from "next";
import { BlogCard } from "@/components/blog-card";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Stay informed on data security, compliance news, and best practices from the VanRein Compliance team.",
};

const SAMPLE_POSTS = [
  {
    title: "Understanding the 2026 HIPAA Security Rule Updates",
    slug: "2026-hipaa-security-rule-updates",
    excerpt:
      "The latest changes to the HIPAA Security Rule bring new requirements for risk assessments and access controls. Here's what your organization needs to know.",
    category: "HIPAA",
    publishDate: "2026-01-15",
  },
  {
    title: "SOC2 Type II vs Type I: Which Does Your Startup Need?",
    slug: "soc2-type-ii-vs-type-i",
    excerpt:
      "Choosing between SOC2 Type I and Type II can impact your sales cycle and customer trust. We break down the differences and help you decide.",
    category: "SOC2",
    publishDate: "2026-01-08",
  },
  {
    title: "5 Common GDPR Mistakes Companies Still Make",
    slug: "common-gdpr-mistakes",
    excerpt:
      "After years of GDPR enforcement, many organizations still fall short on key requirements. Avoid these pitfalls to stay compliant.",
    category: "GDPR",
    publishDate: "2025-12-20",
  },
  {
    title: "Building a Security-First Culture in Your Organization",
    slug: "security-first-culture",
    excerpt:
      "Technical controls alone aren't enough. Learn how to create a culture where every team member is a security champion.",
    category: "Training",
    publishDate: "2025-12-10",
  },
  {
    title: "The Complete Guide to Penetration Testing",
    slug: "complete-guide-penetration-testing",
    excerpt:
      "From scoping to reporting, this guide covers everything you need to know about penetration testing for your organization.",
    category: "Security",
    publishDate: "2025-11-28",
  },
  {
    title: "ISO 27001 Certification: A Step-by-Step Roadmap",
    slug: "iso-27001-certification-roadmap",
    excerpt:
      "Thinking about ISO 27001? Our comprehensive roadmap walks you through every phase from gap analysis to certification.",
    category: "ISO 27001",
    publishDate: "2025-11-15",
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Blog
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80">
            Insights, guides, and news on data security and compliance
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SAMPLE_POSTS.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
