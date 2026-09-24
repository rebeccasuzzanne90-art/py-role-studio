import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getArticleBySlug, getAllArticles, getSiteSettings } from "@/lib/content";
import { buildMetadata, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { createArticleHeadings } from "@/lib/article-headings";
import { ArticleTable } from "@/components/article-table";
import { JsonLd } from "@/components/json-ld";

type Params = Promise<{ slug: string[] }>;

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug.split("/") }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const slug = (await params).slug.join("/");
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  const metadata = buildMetadata({
    seo: article.seo,
    fallbackTitle: article.title,
    fallbackDescription: article.excerpt,
    path: `/blog/${slug}`,
    settings: getSiteSettings(),
  });
  return { ...metadata, openGraph: { ...metadata.openGraph, type: "article",
    ...(article.publishDate ? { publishedTime: article.publishDate } : {}),
    ...(article.modifiedDate ? { modifiedTime: article.modifiedDate } : {}),
  } };
}

function displayDate(date: string) {
  return new Date(date).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const slug = (await params).slug.join("/");
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  const parent = article.parentSlug ? getArticleBySlug(article.parentSlug) : null;
  const isRemediation = article.category === "Remediation";
  const related = (article.relatedSlugs ?? []).map(getArticleBySlug).filter((item) => item !== null);
  const { headings, plugin } = createArticleHeadings();
  const { content } = await compileMDX({
    source: article.body ?? "",
    components: { ArticleTable },
    options: { mdxOptions: { remarkPlugins: [plugin] } },
  });
  const contents = [...headings,
    ...(article.faqs?.length ? [{ id: "faqs", title: "Frequently asked questions" }] : []),
    ...(related.length ? [{ id: "related-articles", title: "Continue reading" }] : []),
  ];
  const crumbs = [{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" },
    ...(parent ? [{ name: "Payroll remediation", path: `/blog/${parent.slug}` }] : []),
    { name: article.title, path: `/blog/${slug}` },
  ];
  const readingMinutes = Math.max(1, Math.ceil(((article.body ?? "") + (article.answer ?? "") + (article.faqs ?? []).map(f => f.question + " " + f.answer).join(" ")).split(/\s+/).length / 220));
  const contentsLinks = <ol>{contents.map((heading, i) => <li key={heading.id}>
    <a href={`#${heading.id}`}><span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>{heading.title}</a>
  </li>)}</ol>;

  return <>
    <JsonLd data={articleJsonLd({ title: article.title, description: article.excerpt, path: `/blog/${slug}`, publishDate: article.publishDate, modifiedDate: article.modifiedDate, author: article.author })} />
    <JsonLd data={breadcrumbJsonLd(crumbs)} />
    <article className="studio-article" id="article-top">
      <header className="article-hero">
        <div className="article-shell">
          <nav aria-label="Breadcrumb" className="article-breadcrumb"><ol>{crumbs.map((crumb, i) => <li key={crumb.path}>
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === crumbs.length - 1 ? <span aria-current="page">{parent ? "Guide" : article.category ?? "Article"}</span> : <Link href={crumb.path}>{crumb.name}</Link>}
          </li>)}</ol></nav>
          <p className="article-eyebrow">{article.category ?? "Insights"} <span aria-hidden="true">/</span> The Payroll Studio</p>
          <h1>{article.title}</h1>
          {article.answer && <div className="article-answer"><p>{article.answer}</p></div>}
          <div className="article-meta">
            <span>{article.author ? `By ${article.author.name}` : "The Payroll Studio"}</span>
            <span>{readingMinutes} min read</span>
            {article.modifiedDate ? <span>Updated <time dateTime={article.modifiedDate}>{displayDate(article.modifiedDate)}</time></span>
              : article.publishDate && <span>Published <time dateTime={article.publishDate}>{displayDate(article.publishDate)}</time></span>}
          </div>
          {article.contributor && <p className="article-contributor">With practitioner input from <Link href="/about">{article.contributor}</Link></p>}
          {article.imagePath && <div className="relative mt-8 aspect-video max-w-3xl overflow-hidden rounded-xl"><Image src={article.imagePath} alt={article.title} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" /></div>}
        </div>
      </header>

      <div className="article-shell article-layout">
        {contents.length > 0 && <aside className="article-sidebar">
          <nav aria-label="On this page" className="article-desktop-toc"><p>On this page</p>{contentsLinks}<a className="article-back-top" href="#article-top">Back to top ↑</a></nav>
          <details className="article-mobile-toc"><summary>On this page <span>{contents.length} sections</span></summary><nav aria-label="Article contents">{contentsLinks}</nav></details>
        </aside>}
        <div className="article-main">
          <div className="prose article-prose">{content}</div>
          {!!article.faqs?.length && <section id="faqs" className="article-faqs" aria-labelledby="faq-heading">
            <p className="article-eyebrow">Your questions, answered</p><h2 id="faq-heading">Frequently asked questions</h2>
            {article.faqs.map((faq) => <div className="article-faq" key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></div>)}
          </section>}
          {related.length > 0 && <section id="related-articles" className="article-related" aria-labelledby="related-heading">
            <p className="article-eyebrow">The remediation collection</p><h2 id="related-heading">Continue reading</h2>
            {related.map((item) => <Link href={`/blog/${item.slug}`} key={item.slug}><span>{item.title}</span><span aria-hidden="true">↗</span></Link>)}
          </section>}
          <section className="article-cta" aria-labelledby="article-cta-heading">
            <p className="article-eyebrow">From findings to action</p>
            <h2 id="article-cta-heading">{isRemediation ? "Make the next remediation decision clearer." : "Strengthen your payroll governance."}</h2>
            <p>{isRemediation ? "Discuss your programme stage, the findings you need to act on and where your team needs support." : "Discuss your payroll compliance and governance needs with The Payroll Studio."}</p>
            <Link href={isRemediation ? "/services/payroll-remediation" : "/contact"}>{isRemediation ? "Explore payroll remediation support" : "Talk to The Payroll Studio"} <span aria-hidden="true">↗</span></Link>
          </section>
        </div>
      </div>
    </article>
  </>;
}
