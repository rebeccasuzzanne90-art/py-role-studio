import type { Metadata } from "next";
import { BlogListClient } from "@/components/blog-list-client";
import { getAllArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "Payroll Governance Insights | The Payroll Studio" },
  description: "Read payroll governance insights and Australian payroll articles covering compliance, operating models, risk and remediation.",
  alternates: { canonical: "https://www.thepayrollstudio.com.au/blog" },
};

export default function BlogPage() {
  const posts = getAllArticles();

  return (
    <>
      <section className="py-20 text-foreground" style={{ backgroundColor: "var(--muted)" }}>
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Payroll governance insights</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Insights, guides, and news on payroll compliance
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <BlogListClient posts={posts} />
          ) : (
            <p className="py-20 text-center text-muted-foreground">
              No articles found.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
