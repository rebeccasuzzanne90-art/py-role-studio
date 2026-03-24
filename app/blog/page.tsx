import type { Metadata } from "next";
import type { Asset } from "contentful";
import { BlogListClient } from "@/components/blog-list-client";
import { getAllArticles } from "@/lib/contentful";
import type { ArticleFields } from "@/types/contentful";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Stay informed on data security, compliance news, and best practices from the VanRein Compliance team.",
};

export const revalidate = 60;

export default async function BlogPage() {
  let posts: {
    title: string;
    slug: string;
    excerpt?: string;
    category?: string;
    publishDate?: string;
    imageUrl?: string;
  }[] = [];

  try {
    const articles = await getAllArticles();
    posts = articles.map((entry) => {
      const f = entry.fields as unknown as ArticleFields;
      const img = f.image as Asset | undefined;
      const imgFile = img?.fields?.file as
        | { url: string }
        | undefined;

      return {
        title: f.title,
        slug: f.slug,
        excerpt: f.excerpt as string | undefined,
        category: f.category as string | undefined,
        publishDate: f.publishDate as string | undefined,
        imageUrl: imgFile?.url ? `https:${imgFile.url}` : undefined,
      };
    });
  } catch {
    // Contentful not configured — empty state
  }

  return (
    <>
      <section
        className="py-20 text-white"
        style={{ backgroundColor: "#1e3a2a" }}
      >
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Blog
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Insights, guides, and news on data security and compliance
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <BlogListClient posts={posts} />
          ) : (
            <p className="py-20 text-center text-muted-foreground">
              No articles found. Add articles in Contentful to get started.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
