"use client";

import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import type { Entry, EntrySkeletonType, Asset } from "contentful";
import type { ArticleFields, AuthorFields } from "@/types/contentful";
import type { Document } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyEntry = Entry<EntrySkeletonType, any, any>;

interface Props {
  entry: AnyEntry;
  slug: string;
}

export function LiveArticle({ entry, slug }: Props) {
  const liveEntry = useContentfulLiveUpdates(entry);
  const f = liveEntry.fields as unknown as ArticleFields;

  const imageAsset = f.image as unknown as Asset | undefined;
  const imageUrl = imageAsset?.fields?.file
    ? `https:${(imageAsset.fields.file as { url: string }).url}`
    : null;

  const authorEntry = f.author as unknown as AnyEntry | undefined;
  const author = authorEntry?.fields as unknown as AuthorFields | undefined;

  return (
    <article className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Blog
        </Link>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          {f.category && <Badge variant="secondary">{f.category}</Badge>}
          {f.publishDate && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(f.publishDate).toLocaleDateString("en-US", {
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

        {author && (
          <p className="mt-3 text-sm text-muted-foreground">
            By {author.name}
            {author.role && <span> &middot; {author.role}</span>}
          </p>
        )}

        {imageUrl && (
          <div className="relative mt-8 aspect-video overflow-hidden rounded-xl">
            <Image
              src={imageUrl}
              alt={f.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <Separator className="my-8" />

        <div className="prose prose-neutral max-w-none dark:prose-invert">
          {f.body && typeof f.body === "object" && "nodeType" in f.body
            ? documentToReactComponents(f.body as Document)
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
