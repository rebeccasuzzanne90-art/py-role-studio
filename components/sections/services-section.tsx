"use client";

import type { Entry, EntrySkeletonType } from "contentful";
import type { ServicesSectionFields, ServiceFields } from "@/types/contentful";
import { useContentfulInspectorMode } from "@contentful/live-preview/react";
import { SectionWrapper } from "@/components/section-wrapper";
import { ServiceCard } from "@/components/service-card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Shield,
  Lock,
  FolderLock,
  Globe,
  HeartPulse,
  BarChart3,
  UserCheck,
  Handshake,
  ClipboardCheck,
  FileKey,
  ShieldAlert,
  Users,
  Search,
  Award,
  CheckCircle,
  type LucideIcon,
} from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entry: Entry<EntrySkeletonType, any, any>;
}

const COL_MAP: Record<string, string> = {
  "2": "sm:grid-cols-2",
  "3": "sm:grid-cols-2 lg:grid-cols-3",
  "4": "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

const ICON_MAP: Record<string, LucideIcon> = {
  Shield,
  Lock,
  FolderLock,
  Globe,
  HeartPulse,
  BarChart3,
  UserCheck,
  Handshake,
  ClipboardCheck,
  FileKey,
  ShieldAlert,
  Users,
  Search,
  Award,
  CheckCircle,
  UserCog: UserCheck,
  LifeBuoy: ShieldAlert,
  Crosshair: ClipboardCheck,
};

export function ServicesSectionBlock({ entry }: Props) {
  const f = entry.fields as unknown as ServicesSectionFields;
  const services = (f.services ?? []) as unknown as Entry<EntrySkeletonType>[];
  const cols = COL_MAP[f.columns ?? "2"] ?? COL_MAP["2"];
  const isCards = f.displayMode === "cards";
  const inspectorProps = useContentfulInspectorMode({ entryId: entry.sys.id });

  if (isCards) {
    return <CardsLayout f={f} services={services} cols={cols} inspectorProps={inspectorProps} />;
  }

  return (
    <SectionWrapper
      backgroundColor={f.backgroundColor}
      paddingSize={f.paddingSize}
      containerWidth={f.containerWidth}
    >
      {(f.heading || f.subheading) && (
        <div className="mb-12 text-center">
          {f.heading && (
            <h2 {...inspectorProps({ fieldId: "heading" })} className="text-3xl font-normal leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {f.heading}
            </h2>
          )}
          {f.subheading && (
            <p {...inspectorProps({ fieldId: "subheading" })} className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {f.subheading}
            </p>
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

function ServiceCardItem({
  svc,
  hasDarkBg,
}: {
  svc: Entry<EntrySkeletonType>;
  hasDarkBg: boolean;
}) {
  const sf = svc.fields as unknown as ServiceFields;
  const Icon = ICON_MAP[sf.iconName ?? ""] ?? Shield;
  const inspectorProps = useContentfulInspectorMode({ entryId: svc.sys.id });

  return (
    <div className="group flex flex-col border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/10 sm:p-10">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#c9963e]/40 text-[#c9963e]">
        <Icon className="h-5 w-5" />
      </div>
      {sf.category && (
        <span {...inspectorProps({ fieldId: "category" })} className="mb-4 inline-block w-fit rounded-full border border-[#c9963e]/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#c9963e]">
          {sf.category}
        </span>
      )}
      <h3
        {...inspectorProps({ fieldId: "title" })}
        className={cn("text-xl font-semibold sm:text-2xl", hasDarkBg ? "text-white" : "text-foreground")}
      >
        {sf.title}
      </h3>
      {sf.tagline && (
        <p
          {...inspectorProps({ fieldId: "tagline" })}
          className={cn("mt-3 font-heading text-base italic leading-snug sm:text-lg", hasDarkBg ? "text-white/70" : "text-muted-foreground")}
        >
          {sf.tagline}
        </p>
      )}
      <p
        {...inspectorProps({ fieldId: "shortDescription" })}
        className={cn("mt-4 flex-1 text-sm leading-relaxed sm:text-base", hasDarkBg ? "text-white/50" : "text-muted-foreground")}
      >
        {sf.shortDescription}
      </p>
      <Link
        href={`/services/${sf.slug}`}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#c9963e] transition-colors hover:text-[#d4a64e]"
      >
        Find out more
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

function CardsLayout({
  f,
  services,
  cols,
  inspectorProps,
}: {
  f: ServicesSectionFields;
  services: Entry<EntrySkeletonType>[];
  cols: string;
  inspectorProps: (opts: { fieldId: string }) => Record<string, string> | null;
}) {
  const hasDarkBg =
    f.backgroundColor &&
    f.backgroundColor !== "#ffffff" &&
    f.backgroundColor !== "#fafafa" &&
    f.backgroundColor !== "#f5f1eb";

  const headingHtml = f.heading
    ? f.heading.replace(
        /\*(.*?)\*/g,
        '<em class="font-normal italic" style="color: #c9963e">$1</em>'
      )
    : "";

  return (
    <section
      className="py-28"
      style={{ backgroundColor: f.backgroundColor || "#1e3a2a" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <Eyebrow text={f.eyebrow} className="mb-8 flex items-center gap-3" inspectorProps={inspectorProps({ fieldId: "eyebrow" })} />
          {f.heading && (
            <h2
              {...inspectorProps({ fieldId: "heading" })}
              className={cn("text-4xl font-normal leading-tight tracking-tight sm:text-5xl lg:text-6xl", hasDarkBg ? "text-white" : "text-foreground")}
              dangerouslySetInnerHTML={{ __html: headingHtml }}
            />
          )}
          {f.subheading && (
            <p
              {...inspectorProps({ fieldId: "subheading" })}
              className={cn("mt-6 text-base leading-relaxed sm:text-lg", hasDarkBg ? "text-white/60" : "text-muted-foreground")}
            >
              {f.subheading}
            </p>
          )}
        </div>
        <div className={cn("grid gap-6", cols)}>
          {services.map((svc) => (
            <ServiceCardItem key={svc.sys.id} svc={svc} hasDarkBg={!!hasDarkBg} />
          ))}
        </div>
      </div>
    </section>
  );
}
