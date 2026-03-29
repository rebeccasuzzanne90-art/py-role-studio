import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getArticleBySlug, getAllArticles, getSiteSettings } from "@/lib/content";
import { buildMetadata, articleJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { compileMDX } from "next-mdx-remote/rsc";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  return params.then(({ slug }) => {
    try {
      const [article, settings] = [getArticleBySlug(slug), getSiteSettings()];
      if (article) {
        return buildMetadata({
          seo: article.seo ?? null,
          fallbackTitle: article.title,
          fallbackDescription: article.excerpt,
          path: `/blog/${slug}`,
          settings,
        });
      }
    } catch {
      // fall through
    }
    return { title: "Blog Post" };
  });
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Post Not Found</h1>
        <p className="mt-4 text-muted-foreground">This article could not be found.</p>
        <Link href="/blog" className="mt-4 inline-block text-primary">
          Back to Blog
        </Link>
      </div>
    );
  }

  const { content: BodyContent } = article.body
    ? await compileMDX({ source: article.body })
    : { content: null };

  const settings = getSiteSettings();

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          description: article.excerpt,
          path: `/blog/${slug}`,
          publishDate: article.publishDate,
          author: article.author ?? null,
          imageUrl: article.imagePath
            ? `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}${article.imagePath}`
            : undefined,
        })}
      />

      <article className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Blog
          </Link>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            {article.category && <Badge variant="secondary">{article.category}</Badge>}
            {article.publishDate && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(article.publishDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {article.title}
          </h1>

          {article.author && (
            <p className="mt-3 text-sm text-muted-foreground">
              By {article.author.name}
              {article.author.role && <span> &middot; {article.author.role}</span>}
            </p>
          )}

          {article.imagePath && (
            <div className="relative mt-8 aspect-video overflow-hidden rounded-xl">
              <Image
                src={article.imagePath}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <Separator className="my-8" />

          <div className="prose prose-neutral max-w-none dark:prose-invert">
            {BodyContent}
          </div>

          <Separator className="my-8" />

          <div className="rounded-xl border bg-muted/30 p-8 text-center">
            <h3 className="text-xl font-bold">Need help with your payroll compliance or governance?</h3>
            <p className="mt-2 text-muted-foreground">
              We can help you navigate these requirements.
            </p>
            <Link href="/contact" className="mt-4 inline-block">
              <Button>Get In Touch</Button>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
