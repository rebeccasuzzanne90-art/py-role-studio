import type { Entry, EntrySkeletonType } from "contentful";
import type { ServicesSectionFields, ServiceFields } from "@/types/contentful";
import { SectionWrapper } from "@/components/section-wrapper";
import { ServiceCard } from "@/components/service-card";
import { cn } from "@/lib/utils";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entry: Entry<EntrySkeletonType, any, any>;
}

const COL_MAP: Record<string, string> = {
  "2": "sm:grid-cols-2",
  "3": "sm:grid-cols-2 lg:grid-cols-3",
  "4": "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

export function ServicesSectionBlock({ entry }: Props) {
  const f = entry.fields as unknown as ServicesSectionFields;
  const services = (f.services ?? []) as unknown as Entry<EntrySkeletonType>[];
  const cols = COL_MAP[f.columns ?? "3"] ?? COL_MAP["3"];

  return (
    <SectionWrapper
      backgroundColor={f.backgroundColor}
      paddingSize={f.paddingSize}
      containerWidth={f.containerWidth}
    >
      {(f.heading || f.subheading) && (
        <div className="mb-12 text-center">
          {f.heading && (
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {f.heading}
            </h2>
          )}
          {f.subheading && (
            <p className="mt-4 text-lg text-muted-foreground">{f.subheading}</p>
          )}
        </div>
      )}
      <div className={cn("grid gap-6", cols)}>
        {services.map((svc) => {
          const sf = svc.fields as unknown as ServiceFields;
          return (
            <ServiceCard
              key={svc.sys.id}
              title={sf.title}
              slug={sf.slug}
              description={sf.shortDescription}
              iconName={sf.iconName}
            />
          );
        })}
      </div>
    </SectionWrapper>
  );
}
