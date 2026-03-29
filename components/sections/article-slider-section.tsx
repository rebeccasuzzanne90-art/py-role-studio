import type { ArticleSliderData } from "@/types/content";
import { SectionWrapper } from "@/components/section-wrapper";
import { BlogCard } from "@/components/blog-card";

interface Props {
  data: ArticleSliderData;
}

export function ArticleSliderSection({ data }: Props) {
  const articles = data.articles ?? [];

  return (
    <SectionWrapper>
      {data.heading && (
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          {data.heading}
        </h2>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <BlogCard
            key={article.slug}
            title={article.title}
            slug={article.slug}
            excerpt={article.excerpt ?? ""}
            date={""}
            category={article.category}
            imageUrl={article.imagePath}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
