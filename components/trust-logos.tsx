"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface LogoItem {
  name: string;
  url?: string;
}

const FALLBACK_LOGOS: LogoItem[] = [
  "ATSI", "Anserve", "CareHive", "Open Systems", "WayCool",
  "NMA", "Veriheal", "VSA", "SNUG", "Mahmee",
  "AMBS", "Keystone", "Dedupely", "FHMC", "DirectLine",
].map((name) => ({ name }));

interface TrustLogosProps {
  heading?: string;
  logos?: LogoItem[];
}

export function TrustLogos({
  heading = "Trusted by great companies",
  logos = FALLBACK_LOGOS,
}: TrustLogosProps) {
  const doubled = [...logos, ...logos];

  return (
    <div>
      {heading && (
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
          {heading}
        </p>
      )}
      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex shrink-0 gap-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {doubled.map((logo, i) =>
            logo.url ? (
              <div
                key={`${logo.name}-${i}`}
                className="flex h-12 w-28 shrink-0 items-center justify-center"
              >
                <Image
                  src={logo.url}
                  alt={logo.name}
                  width={112}
                  height={48}
                  className="h-auto max-h-12 w-auto object-contain"
                />
              </div>
            ) : (
              <div
                key={`${logo.name}-${i}`}
                className="flex h-12 w-28 shrink-0 items-center justify-center rounded-md bg-muted px-4 text-xs font-semibold text-muted-foreground"
              >
                {logo.name}
              </div>
            )
          )}
        </motion.div>
      </div>
    </div>
  );
}
