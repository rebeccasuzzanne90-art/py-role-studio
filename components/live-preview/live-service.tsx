"use client";

import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import type { Entry, EntrySkeletonType } from "contentful";
import type { ServiceFields } from "@/types/contentful";
import type { Document } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyEntry = Entry<EntrySkeletonType, any, any>;

interface Props {
  entry: AnyEntry;
  slug: string;
}

export function LiveService({ entry, slug }: Props) {
  const liveEntry = useContentfulLiveUpdates(entry);
  const f = liveEntry.fields as unknown as ServiceFields;

  return (
    <>
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="mb-6 inline-flex items-center gap-1 text-sm text-primary-foreground/70 hover:text-primary-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All Services
          </Link>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {f.title}
          </h1>
          {f.shortDescription && (
            <p className="mt-4 max-w-2xl text-lg text-primary-foreground/80">
              {f.shortDescription}
            </p>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="prose prose-neutral max-w-none dark:prose-invert lg:col-span-2">
              {f.body && typeof f.body === "object" && "nodeType" in f.body
                ? documentToReactComponents(f.body as Document)
                : null}
            </div>

            <div className="rounded-xl border bg-muted/30 p-8">
              <h3 className="text-xl font-bold">Get Started</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Ready to strengthen your {f.title?.toLowerCase()}? Start with a
                free risk review.
              </p>
              <Link href="/contact" className="mt-6 block">
                <Button className="w-full gap-2">
                  Request a Consultation
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
