"use client";

import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";

interface Props {
  isDraftMode: boolean;
  children: React.ReactNode;
}

export function ContentfulPreviewProvider({ isDraftMode, children }: Props) {
  if (!isDraftMode) {
    return <>{children}</>;
  }

  return (
    <ContentfulLivePreviewProvider
      locale="en-US"
      enableInspectorMode={isDraftMode}
      enableLiveUpdates={isDraftMode}
    >
      {children}
    </ContentfulLivePreviewProvider>
  );
}
