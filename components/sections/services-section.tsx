import type { ServicesSectionData, ServiceCardData } from "@/types/content";
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
  data: ServicesSectionData;
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

export function ServicesSectionBlock({ data }: Props) {
  const services = data.services ?? [];
  const cols = COL_MAP[data.columns ?? "2"] ?? COL_MAP["2"];
  const isCards = data.displayMode === "cards";

  if (isCards) {
    return <CardsLayout data={data} services={services} cols={cols} />;
  }

  return (
    <SectionWrapper
      backgroundColor={data.backgroundColor}
      paddingSize={data.paddingSize}
      containerWidth={data.containerWidth}
    >
      {(data.heading || data.subheading) && (
        <div className="mb-12 text-center">
          {data.heading && (
            <h2 className="text-3xl font-normal leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {data.heading}
            </h2>
          )}
          {data.subheading && (
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {data.subheading}
            </p>
          )}
        </div>
      )}
      <div className={cn("grid gap-6", cols)}>
        {services.map((svc) => (
          <ServiceCard
            key={svc.slug}
            title={svc.title}
            slug={svc.slug}
            description={svc.shortDescription}
            iconName={svc.iconName}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}

function ServiceCardItem({ svc, hasDarkBg }: { svc: ServiceCardData; hasDarkBg: boolean }) {
  const Icon = ICON_MAP[svc.iconName ?? ""] ?? Shield;

  return (
    <div className="group flex flex-col border border-white/10 bg-white/5 p-8 rounded-sm transition-colors hover:bg-white/10 sm:p-10">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#c9963e]/40 text-[#c9963e]">
        <Icon className="h-5 w-5" />
      </div>
      {svc.category && (
        <span className="mb-4 inline-block w-fit rounded-full border border-[#c9963e]/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#c9963e]">
          {svc.category}
        </span>
      )}
      <h3 className={cn("text-xl font-semibold sm:text-2xl", hasDarkBg ? "text-white" : "text-foreground")}>
        {svc.title}
      </h3>
      {svc.tagline && (
        <p className={cn("mt-3 font-heading text-base italic leading-snug sm:text-lg", hasDarkBg ? "text-white/70" : "text-muted-foreground")}>
          {svc.tagline}
        </p>
      )}
      <p className={cn("mt-4 flex-1 text-sm leading-relaxed sm:text-base", hasDarkBg ? "text-white/50" : "text-muted-foreground")}>
        {svc.shortDescription}
      </p>
      <Link
        href={`/services/${svc.slug}`}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#c9963e] transition-colors hover:text-[#d4a64e]"
      >
        Find out more
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

function CardsLayout({ data, services, cols }: { data: ServicesSectionData; services: ServiceCardData[]; cols: string }) {
  const hasDarkBg =
    data.backgroundColor &&
    data.backgroundColor !== "#ffffff" &&
    data.backgroundColor !== "#fafafa" &&
    data.backgroundColor !== "#f5f1eb";

  const headingHtml = data.heading
    ? data.heading.replace(/\*(.*?)\*/g, '<em class="font-normal italic" style="color: #c9963e">$1</em>')
    : "";

  return (
    <section className="py-28" style={{ backgroundColor: data.backgroundColor || "#1e3a2a" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <Eyebrow text={data.eyebrow} className="mb-8 flex items-center gap-3" />
          {data.heading && (
            <h2
              className={cn("text-4xl font-normal leading-tight tracking-tight sm:text-5xl lg:text-6xl", hasDarkBg ? "text-white" : "text-foreground")}
              dangerouslySetInnerHTML={{ __html: headingHtml }}
            />
          )}
          {data.subheading && (
            <p className={cn("mt-6 text-base leading-relaxed sm:text-lg", hasDarkBg ? "text-white/60" : "text-muted-foreground")}>
              {data.subheading}
            </p>
          )}
        </div>
        <div className={cn("grid gap-6", cols)}>
          {services.map((svc) => (
            <ServiceCardItem key={svc.slug} svc={svc} hasDarkBg={!!hasDarkBg} />
          ))}
        </div>
      </div>
    </section>
  );
}
