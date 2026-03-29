import type { CtaSectionData } from "@/types/content";
import { SectionWrapper } from "@/components/section-wrapper";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Props {
  data: CtaSectionData;
}

export function CtaSection({ data }: Props) {
  return (
    <SectionWrapper className="border-t bg-muted/30">
      <div className="text-center">
        <Link href={data.href}>
          <Button
            size="lg"
            variant={data.variant === "primary" ? "default" : "outline"}
            className="gap-2 text-base font-semibold"
          >
            {data.label}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </SectionWrapper>
  );
}
