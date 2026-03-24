import type { Entry, Asset, EntrySkeletonType } from "contentful";
import type { ArticleSliderFields, ArticleFields } from "@/types/contentful";
import { SectionWrapper } from "@/components/section-wrapper";
import { BlogCard } from "@/components/blog-card";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entry: Entry<EntrySkeletonType, any, any>;
}

export function ArticleSliderSection({ entry }: Props) {
  const f = entry.fields as unknown as ArticleSliderFields;
  const articles = (f.articles ?? []) as unknown as Entry<EntrySkeletonType>[];

  return (
    <SectionWrapper>
      {f.heading && (
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          {f.heading}
        </h2>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => {
          const af = article.fields as unknown as ArticleFields;
          const img = af.image as Asset | undefined;
          const imgUrl = img?.fields?.file
            ? `https:${(img.fields.file as { url: string }).url}`
            : undefined;

          return (
            <BlogCard
              key={article.sys.id}
              title={af.title}
              slug={af.slug}
              excerpt={af.excerpt ?? ""}
              date={af.publishDate ?? ""}
              category={af.category}
              imageUrl={imgUrl}
            />
          );
        })}
      </div>
    </SectionWrapper>
  );
}
