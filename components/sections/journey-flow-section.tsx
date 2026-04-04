import Link from "next/link";
import { SectionWrapper } from "@/components/section-wrapper";

const STAGES = [
  {
    number: "01",
    label: "Understand the risk",
    service: "Payroll Governance Review",
    output: "Clear picture of risk and priorities",
    anchor: "#stage-1",
    // Subtle cream tint progression
    bg: "#f5f1eb",
  },
  {
    number: "02",
    label: "Build the foundations",
    service: "Operating Model and Governance Sprint",
    output: "Working governance structure",
    anchor: "#stage-2",
    bg: "#ede8df",
  },
  {
    number: "03",
    label: "Prepare for change",
    service: "Remediation and Transformation Governance",
    output: "Governance in place before work begins",
    anchor: "#stage-3",
    bg: "#e4ddd4",
  },
  {
    number: "04",
    label: "Govern the program",
    service: "Independent Program Oversight",
    output: "Board-visible evidence programs are run correctly",
    anchor: "#stage-4",
    bg: "#dbd3c8",
  },
  {
    number: "05",
    label: "Stay ahead",
    service: "Payroll Governance Office",
    output: "Payroll compliance that holds over time",
    anchor: "#stage-5",
    bg: "#d1c8bb",
  },
];

function ArrowDown() {
  return (
    <div className="flex justify-center py-2" aria-hidden="true">
      <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0 L10 20 M2 13 L10 22 L18 13" stroke="#1e3a2a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.35" />
      </svg>
    </div>
  );
}

export function JourneyFlowSection() {
  return (
    <SectionWrapper backgroundColor="#ffffff" paddingSize="large" containerWidth="narrow">
      {/* Section heading */}
      <div className="mb-10 text-center">
        <div className="mb-3 flex items-center justify-center gap-3">
          <span className="block h-px w-8" style={{ backgroundColor: "#c9963e" }} />
          <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#c9963e" }}>
            The Journey
          </span>
          <span className="block h-px w-8" style={{ backgroundColor: "#c9963e" }} />
        </div>
        <h2 className="font-heading text-3xl font-normal text-[#1e3a2a] sm:text-4xl">
          Five stages. One progression.
        </h2>
      </div>

      {/* Trigger row */}
      <div className="mb-4 rounded border border-dashed border-[#1e3a2a]/20 bg-[#f5f1eb]/60 px-4 py-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#1e3a2a]/50">
          Trigger
        </p>
        <p className="mt-1 text-sm text-[#1e3a2a]/70">
          Audit finding&ensp;·&ensp;Underpayment concern&ensp;·&ensp;System change&ensp;·&ensp;Board question
        </p>
      </div>

      <ArrowDown />

      {/* Stage cards */}
      <div className="flex flex-col">
        {STAGES.map((stage, index) => (
          <div key={stage.number}>
            <Link
              href={stage.anchor}
              className="group block rounded border border-[#1e3a2a]/10 px-6 py-5 transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9963e]"
              style={{ backgroundColor: stage.bg }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#c9963e" }}>
                    Stage {stage.number}
                  </p>
                  <h3 className="font-heading text-lg font-normal text-[#1e3a2a] group-hover:underline sm:text-xl">
                    {stage.label}
                  </h3>
                  <p className="mt-1 text-sm text-[#1e3a2a]/70">
                    {stage.service}
                  </p>
                </div>
                <div className="hidden shrink-0 text-right sm:block">
                  <p className="text-xs uppercase tracking-wide text-[#1e3a2a]/40">Output</p>
                  <p className="mt-0.5 max-w-[200px] text-sm text-[#1e3a2a]/60">{stage.output}</p>
                </div>
              </div>
              {/* Output on mobile */}
              <p className="mt-3 text-xs text-[#1e3a2a]/50 sm:hidden">
                <span className="font-semibold uppercase tracking-wide">Output: </span>
                {stage.output}
              </p>
            </Link>

            {/* Arrow + callout between stages */}
            {index < STAGES.length - 1 && (
              <>
                <ArrowDown />
                {/* Callout between stage 3 and 4 */}
                {index === 2 && (
                  <div className="mb-2 px-2 text-center">
                    <p className="inline-block rounded-full border border-[#c9963e]/30 bg-[#c9963e]/8 px-4 py-1.5 text-xs text-[#1e3a2a]/60">
                      Stages 3 and 4 are typically engaged as a combined program governance package
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Footer scope note */}
      <p className="mt-8 text-center text-xs text-[#1e3a2a]/40">
        Governance and risk clarity only. No payroll processing, legal advice, or system configuration.
      </p>
    </SectionWrapper>
  );
}
