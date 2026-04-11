import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/hero";
import { SectionWrapper } from "@/components/section-wrapper";
import { JourneyFlowSection } from "@/components/sections/journey-flow-section";
import { ScopeTableSection } from "@/components/sections/scope-table-section";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function generateMetadata(): Metadata {
  try {
    const settings = getSiteSettings();
    return buildMetadata({
      seo: {
        metaTitle: "How We Work | The Payroll Studio",
        metaDescription:
          "The Payroll Studio works across the full payroll governance journey — from diagnosing risk you may not fully see yet, to building the structures that make compliance sustainable, to independent oversight that holds over time.",
      },
      fallbackTitle: "How We Work | The Payroll Studio",
      fallbackDescription:
        "The Payroll Studio works across the full payroll governance journey — from diagnosing risk you may not fully see yet, to building the structures that make compliance sustainable, to independent oversight that holds over time.",
      path: "/how-we-work",
      settings,
    });
  } catch {
    return { title: "How We Work | The Payroll Studio" };
  }
}

// ─── Stage detail data ───────────────────────────────────────────────

const STAGES = [
  {
    id: "stage-1",
    number: "Stage 1",
    label: "Understand the risk",
    service: "Payroll Governance Review",
    description:
      "Before anything can be fixed, the picture has to be clear. This is an independent, evidence-based assessment of where payroll risk actually sits — across governance structures, controls, systems, compliance obligations, and leadership visibility. It produces findings that are specific to your organisation, not a generic checklist.",
    output:
      "A maturity scorecard, risk and issues register, and a prioritised 90-day action plan delivered in a written report and executive debrief.",
    trigger:
      "Most organisations start here. If you are uncertain about your exposure, this is where the work begins.",
    serviceHref: "/services/understand-the-risk",
  },
  {
    id: "stage-2",
    number: "Stage 2",
    label: "Build the foundations",
    service: "Payroll Operating Model and Governance Sprint",
    description:
      "Knowing where the gaps are is not enough. This sprint translates the diagnostic findings into a working governance structure — decision rights, controls, accountability, a governance calendar, and the artefacts that allow an organisation to demonstrate that payroll compliance is being managed, not assumed.",
    output:
      "A governance framework, RACI, controls map, governance work calendar, and template reporting packs for leadership and the board.",
    trigger:
      "Follows a diagnostic, or used where an organisation already has a clear picture of its gaps and needs to build the structures to close them.",
    serviceHref: "/services/build-the-foundations",
  },
  {
    id: "stage-3",
    number: "Stage 3",
    label: "Prepare for change",
    service: "Remediation and Transformation Governance",
    description:
      "Payroll remediation and system change are two of the highest-risk events an organisation faces. Both carry significant regulatory, financial, and reputational exposure if governance is absent or inadequate from the start. This engagement puts governance in place before the work begins — so the organisation, its leadership team, and its board can demonstrate that the program is being run correctly.",
    output:
      "A program governance blueprint, risk and issues register, and milestone assurance opinions suitable for boards and regulators.",
    trigger:
      "Applied when a remediation, system change, or operating model transformation is underway or imminent.",
    serviceHref: "/services/prepare-for-change",
    note: "Stages 3 and 4 are often engaged together. They are typically combined as a program governance package.",
  },
  {
    id: "stage-4",
    number: "Stage 4",
    label: "Govern the program",
    service: "Independent Program Oversight",
    description:
      "During high-risk programs, someone independent needs to be watching the governance — not running the program, but ensuring that decisions are being made by the right people, risks are visible, evidence is being retained, and the board has what it needs to demonstrate oversight. This is time-bound, program-specific oversight that sits above the execution layer.",
    output:
      "Governance forum attendance or facilitation, independent review of key decisions, risk and issue reporting, and end-of-phase assurance opinions.",
    trigger:
      "Engaged during active remediation or transformation programs where board-level governance oversight is needed.",
    serviceHref: null,
  },
  {
    id: "stage-5",
    number: "Stage 5",
    label: "Stay ahead",
    service: "Payroll Governance Office",
    description:
      "Governance weakens over time. People change, systems change, awards update, obligations shift. This ongoing partnership keeps the disciplines in place — regular oversight, risk reporting, and an independent annual view of payroll governance health — so the organisation does not have to start again from the beginning the next time something changes.",
    output:
      "Quarterly governance and risk reports, periodic maturity re-assessment, review of open issues and governance artefacts, and an annual independent opinion on payroll governance health.",
    trigger:
      "Follows a governance design sprint, the completion of a remediation program, or any point where an organisation wants ongoing independent assurance rather than point-in-time reviews.",
    serviceHref: "/services/stay-ahead",
  },
];

export default function HowWeWorkPage() {
  return (
    <>
      {/* Hero */}
      <Hero
        data={{
          eyebrow: "How We Work",
          headline: "Payroll governance is not a single problem with a single fix.",
          subheadline:
            "It is a progression. From exposure that is often invisible until it surfaces, through structures that make compliance sustainable, to oversight you can defend and assurance that holds over time.",
          body: `Most organisations come to The Payroll Studio at a specific point in that progression. Some have a growing sense that their payroll is more exposed than they can prove. Some are mid-way through a remediation or system change that is moving faster than the governance around it. Some have done the work of cleaning things up and want to make sure it stays that way.

The work we do is the same regardless of where you enter. We diagnose the risk. We build the structures. We govern the change. We provide independent oversight when it matters most. And we help organisations stay ahead once the hard work is done.

Where you start depends on where you are.`,
        }}
      />

      {/* Journey flow diagram */}
      <JourneyFlowSection />

      {/* Stage detail sections */}
      {STAGES.map((stage, index) => (
        <SectionWrapper
          key={stage.id}
          as="section"
          paddingSize="large"
          backgroundColor={index % 2 === 0 ? "#ffffff" : "#f5f1eb"}
          textColor="#1e3a2a"
        >
          <div id={stage.id} className="scroll-mt-24 max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="block h-px w-8" style={{ backgroundColor: "#c9963e" }} />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#c9963e" }}>
                {stage.number}
              </span>
            </div>
            <h2 className="font-heading text-3xl font-normal text-[#1e3a2a] sm:text-4xl">
              {stage.label}
            </h2>
            <p className="mt-1 font-heading text-lg font-normal italic text-[#1e3a2a]/60">
              {stage.service}
            </p>
            <p className="mt-6 text-base leading-relaxed text-[#1e3a2a]/80">
              {stage.description}
            </p>
            {stage.note && (
              <div className="mt-6 rounded border border-[#c9963e]/30 bg-[#c9963e]/8 px-5 py-4">
                <p className="text-sm text-[#1e3a2a]/70">{stage.note}</p>
              </div>
            )}
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#1e3a2a]/40">Output</p>
                <p className="text-sm leading-relaxed text-[#1e3a2a]/70">{stage.output}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#1e3a2a]/40">When this applies</p>
                <p className="text-sm leading-relaxed text-[#1e3a2a]/70">{stage.trigger}</p>
              </div>
            </div>
            {stage.serviceHref && (
              <div className="mt-8">
                <Link
                  href={stage.serviceHref}
                  className="text-sm font-semibold underline underline-offset-4 hover:no-underline"
                  style={{ color: "#c9963e" }}
                >
                  Explore this service →
                </Link>
              </div>
            )}
          </div>
        </SectionWrapper>
      ))}

      {/* Not sure where you fit? */}
      <SectionWrapper backgroundColor="#1e3a2a" textColor="#ffffff" paddingSize="large">
        <div className="max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="block h-px w-8" style={{ backgroundColor: "#c9963e" }} />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#c9963e" }}>
              Starting point
            </span>
          </div>
          <h2 className="font-heading text-3xl font-normal text-white sm:text-4xl">
            Not sure where you fit?
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-white/70">
            <p>
              Most organisations begin at Stage 1 — the Payroll Governance Review. It gives your leadership team an independent picture of where risk sits without committing to a larger program. The findings from that review make the path forward clear.
            </p>
            <p>
              Some come in at Stage 3 because a remediation or system change is already underway and the governance needs to be built around it immediately.
            </p>
            <p>
              A small number come in at Stage 5 — they have already done significant work on their payroll governance and want independent ongoing oversight to make sure it holds.
            </p>
            <p>
              If you are not certain which stage applies to your organisation, the discovery conversation will make it clear. That conversation is free and there is no obligation to proceed.
            </p>
            <p>
              Not sure where you sit in the journey? The first conversation is free, and there&apos;s no obligation.
            </p>
          </div>
          <div className="mt-8">
            <Link href="/contact">
              <Button
                size="lg"
                className="font-medium text-white hover:brightness-110"
                style={{ backgroundColor: "#c9963e" }}
              >
                Book a call
              </Button>
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* Scope table */}
      <ScopeTableSection />

      {/* Closing CTA */}
      <SectionWrapper backgroundColor="#ffffff" paddingSize="large" containerWidth="narrow">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-normal text-[#1e3a2a] sm:text-4xl">
            Ready to talk through where you are in the journey?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#1e3a2a]/70">
            The first conversation is a discovery call — no cost, no commitment. We will talk through your situation and tell you clearly whether and how The Payroll Studio can help.
          </p>
          <div className="mt-8">
            <Link href="/contact">
              <Button
                size="lg"
                className="font-medium text-white hover:brightness-110"
                style={{ backgroundColor: "#c9963e" }}
              >
                Book a call
              </Button>
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
