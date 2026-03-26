"use client";

import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";

interface Props {
  isDraftMode: boolean;
  children: React.ReactNode;
}

export function ContentfulPreviewProvider({ isDraftMode, children }: Props) {
  return (
    <ContentfulLivePreviewProvider
      locale="en-US"
      enableInspectorMode={true}
      enableLiveUpdates={isDraftMode}
    >
      {children}
    </ContentfulLivePreviewProvider>
  );
}
