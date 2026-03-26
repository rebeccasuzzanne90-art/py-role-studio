"use client";

import type { Entry, EntrySkeletonType } from "contentful";
import type { CtaFields } from "@/types/contentful";
import { useContentfulInspectorMode } from "@contentful/live-preview/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LinkedCtaButtonProps {
  entry: Entry<EntrySkeletonType>;
  className?: string;
  size?: "default" | "sm" | "lg";
  darkBorder?: boolean;
}

export function LinkedCtaButton({ entry, className, size = "lg", darkBorder }: LinkedCtaButtonProps) {
  const f = entry.fields as unknown as CtaFields;
  const inspectorProps = useContentfulInspectorMode({ entryId: entry.sys.id });

  return (
    <Link href={f.url ?? "#"} className={className}>
      <Button
        size={size}
        variant={f.variant === "primary" ? "default" : "outline"}
        className={cn(
          darkBorder && f.variant !== "primary" && "border-white/25 bg-transparent text-white hover:bg-white/10"
        )}
      >
        <span {...inspectorProps({ fieldId: "label" })}>{f.label}</span>
      </Button>
    </Link>
  );
}
