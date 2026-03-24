"use client";

import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import type { Entry, EntrySkeletonType } from "contentful";
import { Hero } from "@/components/hero";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyEntry = Entry<EntrySkeletonType, any, any>;

interface Props {
  entry: AnyEntry;
}

export function LiveHero({ entry }: Props) {
  const liveEntry = useContentfulLiveUpdates(entry);
  return <Hero entry={liveEntry as AnyEntry} />;
}
