import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  hipaa: HeartPulse,
  "iso-27001": Lock,
  soc2: FolderLock,
  gdpr: Globe,
  hitrust: Shield,
  "data-security-audits": BarChart3,
  "fractional-ciso": UserCheck,
  "direct-support": Handshake,
  "pen-tests": ClipboardCheck,
  "policies-package": FileKey,
  "disaster-recovery": ShieldAlert,
  "team-training": Users,
  Shield,
  Lock,
  HeartPulse,
  BarChart3,
  UserCheck,
  Globe,
  Users,
};

interface ServiceCardProps {
  title: string;
  slug: string;
  description: string;
  iconName?: string;
}

export function ServiceCard({ title, slug, description, iconName }: ServiceCardProps) {
  const Icon = ICON_MAP[iconName ?? ""] ?? ICON_MAP[slug] ?? Shield;

  return (
    <Link href={`/services/${slug}`}>
      <Card className="group h-full transition-all hover:shadow-lg hover:-translate-y-1">
        <CardHeader>
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="h-6 w-6" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription className="line-clamp-3">
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
