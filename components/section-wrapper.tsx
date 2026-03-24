import type { SectionStyleFields } from "@/types/contentful";
import { cn } from "@/lib/utils";

const PADDING_MAP: Record<string, string> = {
  small: "py-8",
  medium: "py-16",
  large: "py-24",
};

const WIDTH_MAP: Record<string, string> = {
  narrow: "max-w-4xl",
  default: "max-w-7xl",
  wide: "max-w-[1400px]",
  full: "max-w-full",
};

interface SectionWrapperProps extends SectionStyleFields {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div";
}

export function SectionWrapper({
  backgroundColor,
  textColor,
  paddingSize = "medium",
  containerWidth = "default",
  className,
  children,
  as: Tag = "section",
}: SectionWrapperProps) {
  const padding = PADDING_MAP[paddingSize] ?? PADDING_MAP.medium;
  const width = WIDTH_MAP[containerWidth] ?? WIDTH_MAP.default;

  return (
    <Tag
      className={cn(padding, className)}
      style={{
        backgroundColor: backgroundColor || undefined,
        color: textColor || undefined,
      }}
    >
      <div className={cn("mx-auto px-4 sm:px-6 lg:px-8", width)}>
        {children}
      </div>
    </Tag>
  );
}
