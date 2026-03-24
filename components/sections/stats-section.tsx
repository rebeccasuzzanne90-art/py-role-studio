"use client";

import type { Entry, EntrySkeletonType } from "contentful";
import type { StatsSectionFields, StatItemFields } from "@/types/contentful";
import { SectionWrapper } from "@/components/section-wrapper";
import { StatCounter } from "@/components/stat-counter";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entry: Entry<EntrySkeletonType, any, any>;
}

export function StatsSection({ entry }: Props) {
  const f = entry.fields as unknown as StatsSectionFields;
  const stats = (f.stats ?? []) as unknown as Entry<EntrySkeletonType>[];

  return (
    <SectionWrapper
      backgroundColor={f.backgroundColor}
      textColor={f.textColor}
      paddingSize={f.paddingSize}
      containerWidth={f.containerWidth}
      className={f.backgroundColor ? "" : "bg-primary text-primary-foreground"}
    >
      {f.heading && (
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          {f.heading}
        </h2>
      )}
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {stats.map((stat) => {
          const sf = stat.fields as unknown as StatItemFields;
          return (
            <StatCounter
              key={stat.sys.id}
              value={sf.value}
              label={sf.label}
              prefix={sf.prefix}
              suffix={sf.suffix}
            />
          );
        })}
      </div>
    </SectionWrapper>
  );
}
