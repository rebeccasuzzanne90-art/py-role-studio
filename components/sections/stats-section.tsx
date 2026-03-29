import type { StatsSectionData } from "@/types/content";
import { SectionWrapper } from "@/components/section-wrapper";
import { StatCounter } from "@/components/stat-counter";
import { Eyebrow } from "@/components/ui/eyebrow";

interface Props {
  data: StatsSectionData;
}

export function StatsSection({ data }: Props) {
  const stats = data.stats ?? [];

  return (
    <SectionWrapper
      backgroundColor={data.backgroundColor}
      textColor={data.textColor}
      paddingSize={data.paddingSize}
      containerWidth={data.containerWidth}
      className={data.backgroundColor ? "" : "bg-primary text-primary-foreground"}
    >
      <Eyebrow text={data.eyebrow} className="mb-6 flex items-center justify-center gap-3" />
      {data.heading && (
        <h2 className="mb-12 text-center text-3xl font-normal leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          {data.heading}
        </h2>
      )}
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {stats.map((stat, idx) => (
          <StatCounter
            key={idx}
            value={stat.value}
            label={stat.label}
            prefix={stat.prefix}
            suffix={stat.suffix}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
