import type { Metadata } from "next";
import { BlogListClient } from "@/components/blog-list-client";
import { getAllArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights, guides, and news on payroll compliance from The Payroll Studio team.",
};

export default function BlogPage() {
  const posts = getAllArticles();

  return (
    <>
      <section className="py-20 text-white" style={{ backgroundColor: "#1e3a2a" }}>
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Blog</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
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
