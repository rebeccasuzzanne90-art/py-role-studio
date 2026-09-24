"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ArrowUpRight, Search, Users, ShieldCheck, Workflow, FileCheck2, Presentation } from "lucide-react";
import type { AccordionSectionData } from "@/types/content";
import styles from "./training-page.module.css";

const workshopDetails = [
  { label: "HR & Finance", icon: Users, output: "A responsibilities map and 30-day action plan", focus: "Ownership · Hand-offs · Escalation" },
  { label: "Risk & controls", icon: ShieldCheck, output: "A prioritised risk register with clear control owners", focus: "Risk visibility · Controls · Evidence" },
  { label: "Underpayment prevention", icon: Search, output: "A root-cause worksheet and prevention action plan", focus: "Data · Policies · Processes · Systems" },
  { label: "Remediation validation", icon: FileCheck2, output: "A validation approach and exception log", focus: "Completeness · Variances · Approval" },
  { label: "System change", icon: Workflow, output: "Governance checkpoints for your project", focus: "Testing · Ownership · Readiness" },
  { label: "Payroll leadership", icon: Presentation, output: "A concise risk briefing or board-paper outline", focus: "Risk reporting · Decisions · Communication" },
];

export function WorkshopExplorer({ data }: { data: AccordionSectionData }) {
  const [active, setActive] = useState(0);
  return <section id="workshops" className={`${styles.section} ${styles.workshops}`}>
    <div className={styles.container}>
      <div className={styles.sectionIntro}><div><p className={styles.eyebrow}>Find your focus</p><h2>Different responsibilities.<br /><em>A shared understanding.</em></h2></div><p>Select a workshop theme to explore the learning focus and an example of what your team could work on.</p></div>
      <div className={styles.explorer}>
        <div className={styles.choices} role="group" aria-label="Choose a workshop theme">
          {data.items.map((item, i) => { const detail = workshopDetails[i]; const Icon = detail?.icon ?? Users; return <button key={item.question} type="button" aria-pressed={active === i} aria-controls={`workshop-panel-${i}`} onClick={() => setActive(i)}><Icon size={21} aria-hidden="true"/><span>{detail?.label ?? item.question}</span><ArrowUpRight size={18} aria-hidden="true" /></button>; })}
        </div>
        <div className={styles.panels}>
          {data.items.map((item, i) => <div key={item.question} id={`workshop-panel-${i}`} hidden={active !== i} className={styles.panel}>
            <p className={styles.eyebrow}>Workshop {String(i + 1).padStart(2, "0")} / {String(data.items.length).padStart(2, "0")}</p>
            <h3>{item.question}</h3><p>{item.answer}</p>
            <div className={styles.output}><Check size={22} aria-hidden="true"/><div><span>Example workshop output</span><strong>{workshopDetails[i]?.output}</strong></div></div>
            <p className={styles.focus}>{workshopDetails[i]?.focus}</p>
            <Link href="/contact" className={styles.textLink}>Discuss this workshop <ArrowRight size={18} aria-hidden="true"/></Link>
          </div>)}
        </div>
      </div>
      <p className={styles.note}>Workshop themes and outputs are starting points. Your proposal confirms the audience, depth, exercises, materials and duration.</p>
    </div>
  </section>;
}

const lenses = [
  { label: "Policy", question: "Does the policy reflect the applicable pay requirements?", action: "Identify who reviews the policy, how changes are approved and how those decisions reach payroll." },
  { label: "Process", question: "Where could the hand-off have broken down?", action: "Trace the approval and hand-off from the operational team to payroll. Look for missing checks or unclear ownership." },
  { label: "Data", question: "Is the information complete and reliable?", action: "Compare the source record with the information received by payroll. Investigate missing, delayed or incorrectly mapped data." },
  { label: "System", question: "Is the rule working as intended?", action: "Check the configuration against the agreed requirement and test representative cases. Identify who signs off any change." },
];

export function TrainingScenario() {
  const [lens, setLens] = useState(0);
  return <section className={`${styles.section} ${styles.scenario}`} aria-labelledby="scenario-heading"><div className={`${styles.container} ${styles.scenarioGrid}`}>
    <div><p className={styles.eyebrow}>Inside the workshop / Illustrative scenario</p><h2 id="scenario-heading">The same payroll error.<br /><em>Four places to look.</em></h2><p>A recurring allowance is missing from some employees’ pay. Correcting the payment is one step. Understanding why it happened helps your team prevent a repeat.</p><p className={styles.prompt}>Where would you start investigating?</p><div className={styles.lenses} role="group" aria-label="Explore an investigation lens">{lenses.map((item, i) => <button type="button" key={item.label} aria-pressed={lens === i} aria-controls="scenario-answer" onClick={() => setLens(i)}>{item.label}<ArrowUpRight size={16} aria-hidden="true"/></button>)}</div></div>
    <div className={styles.scenarioCard} id="scenario-answer" aria-live="polite" aria-atomic="true"><span className={styles.scenarioNumber}>0{lens + 1}</span><p className={styles.eyebrow}>Investigate the {lenses[lens].label.toLowerCase()}</p><h3>{lenses[lens].question}</h3><p>{lenses[lens].action}</p><div className={styles.scenarioFoot}>Discuss the evidence. Agree the owner. Check the outcome.</div></div>
  </div></section>;
}
