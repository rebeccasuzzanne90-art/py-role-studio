import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getArticleBySlug, getSiteSettings } from "@/lib/contentful";
import { buildMetadata, articleJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { LiveArticle } from "@/components/live-preview/live-article";
import type { SiteSettingsFields, SeoSkeleton, ArticleFields, AuthorSkeleton } from "@/types/contentful";
import type { Entry } from "contentful";

const POSTS: Record<
  string,
  {
    title: string;
    category: string;
    publishDate: string;
    body: string;
  }
> = {
  "2026-hipaa-security-rule-updates": {
    title: "Understanding the 2026 HIPAA Security Rule Updates",
    category: "HIPAA",
    publishDate: "2026-01-15",
    body: `The Department of Health and Human Services (HHS) has released significant updates to the HIPAA Security Rule that will affect covered entities and business associates across the healthcare industry.

## Key Changes

The updated rule emphasizes several critical areas:

**Enhanced Risk Assessment Requirements** — Organizations must now conduct more frequent and detailed risk assessments, with specific documentation requirements for each identified vulnerability and its corresponding mitigation strategy.

**Access Control Improvements** — Multi-factor authentication (MFA) is now required for all systems containing electronic Protected Health Information (ePHI), not just recommended.

**Incident Response Enhancements** — The updated rule requires organizations to maintain and regularly test incident response plans, with specific timeframes for detection, containment, and notification.

## What You Need to Do

1. Review your current risk assessment methodology against the new requirements
2. Implement MFA across all ePHI-accessible systems if not already in place
3. Update your incident response plan with the new required elements
4. Schedule staff training on the updated requirements
5. Document all changes for your next compliance audit

## How VanRein Can Help

Our team stays ahead of regulatory changes so you don't have to. We can help you assess your current compliance posture against the new requirements and create a prioritized remediation plan.`,
  },
  "soc2-type-ii-vs-type-i": {
    title: "SOC2 Type II vs Type I: Which Does Your Startup Need?",
    category: "SOC2",
    publishDate: "2026-01-08",
    body: `When enterprise customers ask for your SOC2 report, understanding the difference between Type I and Type II is crucial for making the right investment.

## SOC2 Type I

A Type I report evaluates the **design** of your security controls at a **specific point in time**. Think of it as a snapshot — it says "yes, these controls exist and are appropriately designed."

**Best for:** Startups that need a compliance credential quickly, typically achievable in 4-8 weeks.

## SOC2 Type II

A Type II report evaluates the **operating effectiveness** of your controls over a **period of time** (typically 6-12 months). It says "these controls not only exist but have been working properly over this entire period."

**Best for:** Mature organizations selling to enterprise customers who require ongoing assurance.

## Our Recommendation

Start with Type I to get your foot in the door, then work toward Type II. Many enterprise deals will accept a Type I report while you work toward Type II, especially if you can demonstrate a clear timeline.`,
  },
};

type Params = Promise<{ slug: string }>;

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
    // fall through to hardcoded
  }

  const post = POSTS[slug];
  return { title: post?.title ?? "Blog Post" };
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

          <div className="rounded-xl border bg-muted/30 p-8 text-center">
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

  const post = POSTS[slug];

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Post Not Found</h1>
        <p className="mt-4 text-muted-foreground">
          This post may have been moved or is coming from Contentful.
        </p>
        <Link href="/blog" className="mt-4 inline-block text-primary">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="py-16">
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.body.slice(0, 160),
          path: `/blog/${slug}`,
          publishDate: post.publishDate,
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
          <Badge variant="secondary">{post.category}</Badge>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(post.publishDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {post.title}
        </h1>

        <Separator className="my-8" />

        <div className="prose prose-neutral max-w-none dark:prose-invert">
          {post.body.split("\n\n").map((para, i) => {
            if (para.startsWith("## ")) {
              return (
                <h2 key={i} className="mb-4 mt-8 text-2xl font-bold">
                  {para.replace("## ", "")}
                </h2>
              );
            }
            if (para.startsWith("**")) {
              return (
                <p
                  key={i}
                  className="mb-4 text-muted-foreground"
                  dangerouslySetInnerHTML={{
                    __html: para.replace(
                      /\*\*(.*?)\*\*/g,
                      '<strong class="text-foreground">$1</strong>'
                    ),
                  }}
                />
              );
            }
            if (para.match(/^\d\./)) {
              const items = para.split("\n");
              return (
                <ol key={i} className="mb-4 list-decimal space-y-1 pl-6 text-muted-foreground">
                  {items.map((item, j) => (
                    <li key={j}>{item.replace(/^\d+\.\s*/, "")}</li>
                  ))}
                </ol>
              );
            }
            return (
              <p key={i} className="mb-4 leading-relaxed text-muted-foreground">
                {para}
              </p>
            );
          })}
        </div>

        <Separator className="my-8" />

        <div className="rounded-xl border bg-muted/30 p-8 text-center">
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
