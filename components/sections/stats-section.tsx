"use client";

import type { Entry, EntrySkeletonType } from "contentful";
import type { StatsSectionFields, StatItemFields } from "@/types/contentful";
import { useContentfulInspectorMode } from "@contentful/live-preview/react";
import { SectionWrapper } from "@/components/section-wrapper";
import { StatCounter } from "@/components/stat-counter";
import { Eyebrow } from "@/components/ui/eyebrow";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entry: Entry<EntrySkeletonType, any, any>;
}

function StatItem({ stat }: { stat: Entry<EntrySkeletonType> }) {
  const sf = stat.fields as unknown as StatItemFields;
  const inspectorProps = useContentfulInspectorMode({ entryId: stat.sys.id });
  return (
    <div {...inspectorProps({ fieldId: "value" })}>
      <StatCounter
        value={sf.value}
        label={sf.label}
        prefix={sf.prefix}
        suffix={sf.suffix}
      />
    </div>
  );
}

export function StatsSection({ entry }: Props) {
  const f = entry.fields as unknown as StatsSectionFields;
  const stats = (f.stats ?? []) as unknown as Entry<EntrySkeletonType>[];
  const inspectorProps = useContentfulInspectorMode({ entryId: entry.sys.id });

  return (
    <SectionWrapper
      backgroundColor={f.backgroundColor}
      textColor={f.textColor}
      paddingSize={f.paddingSize}
      containerWidth={f.containerWidth}
      className={f.backgroundColor ? "" : "bg-primary text-primary-foreground"}
    >
      <Eyebrow text={f.eyebrow} className="mb-6 flex items-center justify-center gap-3" inspectorProps={inspectorProps({ fieldId: "eyebrow" })} />
      {f.heading && (
        <h2 {...inspectorProps({ fieldId: "heading" })} className="mb-12 text-center text-3xl font-normal leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          {f.heading}
        </h2>
      )}
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {stats.map((stat) => (
          <StatItem key={stat.sys.id} stat={stat} />
        ))}
      </div>
    </SectionWrapper>
  );
}
