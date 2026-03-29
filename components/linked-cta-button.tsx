"use client";

import type { CtaData } from "@/types/content";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LinkedCtaButtonProps {
  cta: CtaData;
  className?: string;
  size?: "default" | "sm" | "lg";
  darkBorder?: boolean;
}

export function LinkedCtaButton({ cta, className, size = "lg", darkBorder }: LinkedCtaButtonProps) {
  return (
    <Link href={cta.href ?? "#"} className={className}>
      <Button
        size={size}
        variant={cta.variant === "primary" ? "default" : "outline"}
        className={cn(
          darkBorder && cta.variant !== "primary" && "border-white/25 bg-transparent text-white hover:bg-white/10"
        )}
      >
        {cta.label}
      </Button>
    </Link>
  );
}
