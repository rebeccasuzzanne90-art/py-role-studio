"use client";

import type { Entry, EntrySkeletonType } from "contentful";
import type { CtaFields } from "@/types/contentful";
import { useContentfulInspectorMode } from "@contentful/live-preview/react";
import { SectionWrapper } from "@/components/section-wrapper";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entry: Entry<EntrySkeletonType, any, any>;
}

export function CtaSection({ entry }: Props) {
  const f = entry.fields as unknown as CtaFields;
  const inspectorProps = useContentfulInspectorMode({ entryId: entry.sys.id });

  return (
    <SectionWrapper className="border-t bg-muted/30">
      <div className="text-center">
        <Link href={f.url}>
          <Button
            size="lg"
            variant={f.variant === "primary" ? "default" : "outline"}
            {...inspectorProps({ fieldId: "label" })}
            className="gap-2 text-base font-semibold"
          >
            {f.label}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </SectionWrapper>
  );
}
