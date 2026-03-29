import type { TrustLogoStripData } from "@/types/content";
import { SectionWrapper } from "@/components/section-wrapper";
import { TrustLogos } from "@/components/trust-logos";
import { Eyebrow } from "@/components/ui/eyebrow";

interface Props {
  data: TrustLogoStripData;
}

export function TrustLogoStripSection({ data }: Props) {
  const logoData = (data.logos ?? []).map((logo) => ({
    name: logo.name,
    url: logo.imageUrl,
  }));

  return (
    <SectionWrapper
      backgroundColor={data.backgroundColor}
      paddingSize={data.paddingSize ?? "small"}
      containerWidth="wide"
      className={data.backgroundColor ? "" : "border-y bg-background"}
    >
      <Eyebrow text={data.eyebrow} className="mb-6 flex items-center justify-center gap-3" />
      <TrustLogos heading={data.heading} logos={logoData} />
    </SectionWrapper>
  );
}
