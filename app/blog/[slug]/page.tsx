import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getArticleBySlug, getAllArticles, getSiteSettings } from "@/lib/contentful";
import { buildMetadata, articleJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { LiveArticle } from "@/components/live-preview/live-article";
import type { SiteSettingsFields, SeoSkeleton, ArticleFields } from "@/types/contentful";
import type { Entry } from "contentful";

export const revalidate = 60;

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  try {
    const articles = await getAllArticles();
    return articles.map((a) => ({
      slug: (a.fields as unknown as ArticleFields).slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;

  try {
    const [article, settingsEntry] = await Promise.all([
      getArticleBySlug(slug),
      getSiteSettings(),
    ]);
    if (article) {
      const f = article.fields as unknown as ArticleFields;
      const settings = settingsEntry?.fields as unknown as SiteSettingsFields | undefined;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const seoEntry = (f as any).seo as Entry<SeoSkeleton> | undefined;
      return buildMetadata({
        seoEntry: seoEntry ?? null,
        fallbackTitle: f.title,
        fallbackDescription: f.excerpt as string | undefined,
        path: `/blog/${slug}`,
        settings: settings ?? null,
      });
    }
  } catch {
    // Contentful not configured
  }

  return { title: "Blog Post" };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const { isEnabled: isDraft } = await draftMode();

  let article: Awaited<ReturnType<typeof getArticleBySlug>> | null = null;
  try {
    article = await getArticleBySlug(slug, isDraft);
  } catch {
    // Contentful not configured
  }

  if (article) {
    if (isDraft) {
      return <LiveArticle entry={article} slug={slug} />;
    }

    const f = article.fields as unknown as ArticleFields;
    return (
      <article className="py-16">
        <JsonLd
          data={articleJsonLd({
            title: f.title,
            description: (f.excerpt as string) ?? f.title,
            path: `/blog/${slug}`,
            publishDate: f.publishDate as string | undefined,
          })}
        />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Blog
          </Link>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            {f.category && <Badge variant="secondary">{f.category as string}</Badge>}
            {f.publishDate && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(f.publishDate as string).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {f.title}
          </h1>

          <Separator className="my-8" />

          <div className="prose prose-neutral max-w-none dark:prose-invert">
            {f.body && typeof f.body === "object" && "nodeType" in f.body
              ? (await import("@contentful/rich-text-react-renderer")).documentToReactComponents(
                  f.body as import("@contentful/rich-text-types").Document,
                )
              : null}
          </div>

          <Separator className="my-8" />

          <div className="border bg-muted/30 p-8 text-center">
            <h3 className="text-xl font-bold">Need Help With Compliance?</h3>
            <p className="mt-2 text-muted-foreground">
              Our experts can help you navigate these requirements.
            </p>
            <Link href="/contact" className="mt-4 inline-block">
              <Button>Get a Free Consultation</Button>
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Post Not Found</h1>
      <p className="mt-4 text-muted-foreground">
        This article could not be found.
      </p>
      <Link href="/blog" className="mt-4 inline-block text-primary">
        Back to Blog
      </Link>
    </div>
  );
}
