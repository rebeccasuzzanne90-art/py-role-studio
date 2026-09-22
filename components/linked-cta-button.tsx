"use client";

import type { CtaData } from "@/types/content";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LinkedCtaButtonProps {
  cta: CtaData;
  className?: string;
  size?: "default" | "sm" | "lg";
  darkBorder?: boolean;
}

export function LinkedCtaButton({ cta, className, size = "lg" }: LinkedCtaButtonProps) {
  return (
    <Link href={cta.href ?? "#"} className={cn(buttonVariants({ size, variant: cta.variant === "primary" ? "default" : "outline" }), className)}>
      {cta.label}
    </Link>
  );
}
