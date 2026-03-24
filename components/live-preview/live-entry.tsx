"use client";

import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import type { Entry, EntrySkeletonType } from "contentful";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyEntry = Entry<EntrySkeletonType, any, any>;

interface LiveEntryProps {
  entry: AnyEntry;
  Component: React.ComponentType<{ entry: AnyEntry }>;
}

export function LiveEntry({ entry, Component }: LiveEntryProps) {
  const liveEntry = useContentfulLiveUpdates(entry);
  return <Component entry={liveEntry as AnyEntry} />;
}
