import { SectionWrapper } from "@/components/section-wrapper";

const WHAT_WE_DO = [
  "Assess payroll governance maturity independently and produce evidence-based findings",
  "Design governance structures — frameworks, decision rights, controls, RACI, accountability",
  "Govern remediation and transformation programs as an independent oversight function",
  "Provide ongoing assurance and risk reporting to leadership and boards",
  "Translate payroll risk into language that boards and executives can act on",
];

const WHAT_WE_DONT = [
  "Process, run, or manage payroll operations",
  "Interpret modern awards or enterprise agreements (this is legal and IR work — we work alongside the specialists who do it)",
  "Execute remediation calculations or back-pay processing",
  "Configure payroll systems or manage technology vendors",
  "Provide legal advice or appear as legal representatives",
];

export function ScopeTableSection() {
  return (
    <SectionWrapper backgroundColor="#f5f1eb" textColor="#1e3a2a" paddingSize="large">
      <div className="mb-3 flex items-center gap-3">
        <span className="block h-px w-8" style={{ backgroundColor: "#c9963e" }} />
        <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#c9963e" }}>
          Scope
        </span>
      </div>
      <h2 className="font-heading text-3xl font-normal text-[#1e3a2a] sm:text-4xl">
        What The Payroll Studio does and does not do
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#1e3a2a]/70">
        Being clear about the boundaries of this work is part of how we maintain independence. The Payroll Studio is a governance and risk advisory practice. The following makes the scope explicit.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-px" style={{ backgroundColor: "#d1c8bb" }}>
        {/* What we do */}
        <div className="bg-[#f5f1eb] p-6 sm:p-8">
          <h3 className="mb-4 text-base font-semibold uppercase tracking-wide text-[#1e3a2a]">
            What we do
          </h3>
          <ul className="space-y-3">
            {WHAT_WE_DO.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-[#1e3a2a]/80">
                <span className="mt-0.5 shrink-0 text-base leading-none" style={{ color: "#c9963e" }}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What we don't */}
        <div className="bg-[#f5f1eb] p-6 sm:p-8">
          <h3 className="mb-4 text-base font-semibold uppercase tracking-wide text-[#1e3a2a]">
            What we don&apos;t do
          </h3>
          <ul className="space-y-3">
            {WHAT_WE_DONT.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-[#1e3a2a]/80">
                <span className="mt-0.5 shrink-0 text-base leading-none text-[#1e3a2a]/30">✗</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[#1e3a2a]/60">
        This distinction matters. It is what allows The Payroll Studio to sit in an independent governance role rather than as a delivery participant with a conflict of interest in the outcome.
      </p>
    </SectionWrapper>
  );
}
