import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Search, ListChecks, Users, RefreshCw } from "lucide-react";
import styles from "../services/services.module.css";

export const metadata: Metadata = {
  title: "How We Work | The Payroll Studio Approach",
  description: "How The Payroll Studio works with Australian HR, Finance and payroll teams: agree the scope, investigate issues, coordinate delivery and strengthen governance.",
  alternates: { canonical: "https://www.thepayrollstudio.com.au/how-we-work" },
};

const steps = [
  { id: "understand", label: "Understand", title: "Start with your situation", icon: Search,
    lead: "Tell us what has happened, what is uncertain and what needs attention now.",
    body: "We discuss your concerns, existing findings, available records, current advisers and any deadlines. If an investigation or remediation is already underway, we start with that evidence and identify where support will make a difference.",
    output: "A shared understanding of the issue, immediate priorities and the information needed to scope the work.",
    href: "/services/understand-the-risk", link: "Explore payroll risk reviews" },
  { id: "agree", label: "Agree", title: "Define the work and the roles", icon: ListChecks,
    lead: "Everyone should know what is being delivered, who owns each decision and how progress will be assessed.",
    body: "We agree the scope, deliverables, responsibilities, dependencies, reporting and commercial terms before the engagement begins. We also clarify the role of your internal teams, calculation providers, system partners and legal or tax advisers.",
    output: "An agreed engagement scope and delivery approach, including decision owners, milestones and how changes to scope will be handled.",
    href: "/services", link: "Compare our services" },
  { id: "deliver", label: "Deliver", title: "Turn findings into action", icon: Users,
    lead: "Connect the technical work with the decisions your organisation needs to make.",
    body: "Depending on the engagement, we investigate underpayment drivers, establish governance, manage remediation workstreams, design validation and reconciliation approaches, or coordinate employee communications and payment readiness. We work with your existing team and specialists, with risks and unresolved questions kept visible.",
    output: "Practical outputs matched to the scope: these may include a risk register, governance framework, validation plan, corrective-action register or remediation delivery plan.",
    href: "/services/payroll-remediation", link: "Explore remediation support" },
  { id: "embed", label: "Embed", title: "Help the improvements hold", icon: RefreshCw,
    lead: "The work should leave your people clearer about their responsibilities and the controls they own.",
    body: "We support agreed handovers, document outstanding actions and help teams understand how to maintain the changes. Training can build capability across Payroll, HR, Finance and leadership. Where ongoing support is needed, we agree a review and reporting rhythm that fits the organisation.",
    output: "Clear ownership of remaining actions, usable documentation and an agreed approach to training, monitoring or ongoing advisory support.",
    href: "/services/payroll-training", link: "Explore training and workshops" },
];

const faqs = [
  { question: "Do we need a review before we can engage you?", answer: "Not always. A review is useful when the exposure or underlying cause is unclear. If you already have findings, an active remediation program or a defined training need, we can scope support around that starting point." },
  { question: "Can you work with our existing advisers and software providers?", answer: "Yes. We can coordinate the work around your internal team, calculation provider and specialist advisers. We agree responsibilities, inputs, decision owners and escalation so that findings move into action without duplicating existing work." },
  { question: "How long does an engagement take and how is it priced?", answer: "Timing and fees depend on the agreed scope, the quality and availability of information, the people involved and the outputs required. We discuss these during scoping and agree the commercial terms before work begins. A change in scope should prompt an explicit review of timing and fees." },
  { question: "Can you manage remediation and provide independent oversight?", answer: "These are different roles. Remediation management can include coordinating workstreams, validation, reconciliation and the employee-payment journey. Independent oversight reviews governance and decisions against an agreed remit. Where independence is required, we explicitly separate review from the delivery responsibilities being assessed; we do not describe a review of our own delivery as independent assurance." },
];

export default function HowWeWorkPage() {
  return <>
    <section className={styles.hero}>
      <Image src="/images/services/canva-business-meeting.jpg" alt="Colleagues reviewing documents together at a meeting table" fill preload sizes="100vw" className={styles.heroImage} />
      <div className={styles.heroShade} />
      <div className={styles.heroContent}>
        <p className={styles.eyebrow}>How we work · The Payroll Studio</p>
        <h1>Clear roles.<br /><span>Practical progress.</span></h1>
        <p className={styles.heroBody}>We work alongside your HR, Finance and payroll teams to understand the issue, agree the right support and turn findings into action.</p>
        <div className={styles.actions}><Link href="/contact" className={styles.primary}>Talk through your situation <ArrowUpRight size={18} aria-hidden="true" /></Link><a href="#our-approach" className={styles.heroLink}>Explore our approach <ArrowDown size={17} aria-hidden="true" /></a></div>
      </div>
    </section>
    <nav aria-label="Our engagement approach" className={styles.serviceNav}><div>{steps.map(step => <a href={`#${step.id}`} key={step.id}>{step.label}<ArrowDown size={14} aria-hidden="true" /></a>)}<a href="#responsibilities">Responsibilities<ArrowDown size={14} aria-hidden="true" /></a><a href="#questions">Your questions<ArrowDown size={14} aria-hidden="true" /></a></div></nav>
    <section className={styles.intro}>
      <div><p className={styles.eyebrow}>Your starting point</p><h2>Support shaped<br />around your situation.</h2></div>
      <div><p className={styles.introLead}>You can come to us with a concern, a set of findings or a program already in motion.</p><p>The engagement follows the work you need. You may need a focused risk review, help delivering a remediation program, independent oversight of change, or workshops for your team. We agree the combination that fits your circumstances.</p><ul><li>Use the evidence and work you already have.</li><li>Make responsibilities and boundaries explicit.</li><li>Agree practical outputs and how they will be used.</li></ul></div>
    </section>
    <section id="our-approach" className={styles.services} aria-labelledby="approach-heading">
      <div className={styles.sectionHeading}><p className={styles.eyebrow}>From first conversation to handover</p><h2 id="approach-heading">A clear way<br />to work together.</h2></div>
      {steps.map((step, index) => { const Icon = step.icon; return <article id={step.id} key={step.id} className={`${styles.serviceRow} ${index % 2 ? styles.reverse : ""}`}>
        <div className={`${styles.servicePanel} ${index % 2 ? styles.darkPanel : ""}`}><div className={styles.panelTop}><Icon size={34} strokeWidth={1.3} aria-hidden="true" /><span>{String(index + 1).padStart(2, "0")}</span></div><div><p className={styles.eyebrow}>{step.label}</p><h3>{step.title}</h3></div></div>
        <div className={styles.serviceCopy}><p className={styles.bestFor}>{step.lead}</p><p>{step.body}</p><div className={styles.outcome}><span>What this gives you</span><p>{step.output}</p></div><Link href={step.href} className={styles.textLink}>{step.link}<ArrowUpRight size={19} aria-hidden="true" /></Link></div>
      </article>; })}
    </section>
    <section id="responsibilities" className="scroll-mt-28 bg-[#f5f1eb] px-5 py-14 sm:px-8 sm:py-20" aria-labelledby="responsibilities-heading">
      <div className="mx-auto max-w-7xl"><p className={styles.eyebrow}>Responsibilities</p><h2 id="responsibilities-heading" className="max-w-3xl font-heading text-3xl tracking-tight sm:text-5xl">The right people.<br />Clear accountability.</h2><p className="mt-6 max-w-3xl leading-relaxed text-neutral-600">We agree how the work is shared before delivery begins. The employer retains accountability for its obligations and approvals, with specialist decisions owned by the appropriate people.</p>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {[
            ["The Payroll Studio", "Advisory, root-cause investigation, governance design, remediation program coordination, validation strategy, reconciliation approaches, communications planning and capability uplift, as agreed in scope."],
            ["Your organisation", "Access to records and people, internal decisions and approvals, ownership of corrective actions, payroll execution and maintaining controls after the engagement."],
            ["Specialist partners", "Calculation providers supply their agreed calculations. Legal, industrial relations and tax advisers resolve matters within their remit. System owners and implementation partners own configuration and technical changes."],
          ].map(([title, text]) => <div key={title} className="border-t border-neutral-400 pt-6"><h3 className="text-xl font-medium">{title}</h3><p className="mt-4 leading-relaxed text-neutral-600">{text}</p></div>)}
        </div>
        <p className="mt-10 max-w-4xl border-l-2 border-[#a5522c] pl-5 leading-relaxed text-neutral-700"><strong className="font-medium text-neutral-950">Independence is agreed explicitly.</strong> Where we provide independent oversight, its remit and separation from delivery are documented. Our work does not replace legal or tax advice, routine payroll processing or system configuration.</p>
      </div>
    </section>
    <section id="questions" className="mx-auto max-w-5xl scroll-mt-28 px-5 py-14 sm:px-8 sm:py-20" aria-labelledby="questions-heading"><p className={styles.eyebrow}>Before we begin</p><h2 id="questions-heading" className="mb-8 font-heading text-3xl tracking-tight sm:text-4xl">Your questions, answered.</h2>{faqs.map(faq => <details key={faq.question} className="group border-t border-neutral-300 py-5 last:border-b"><summary className="cursor-pointer text-lg font-medium focus-visible:outline-2 focus-visible:outline-offset-4">{faq.question}</summary><p className="mt-4 max-w-3xl leading-relaxed text-neutral-600">{faq.answer}</p></details>)}</section>
    <section className={styles.nextStep}><div className={styles.nextInner}><div className={styles.nextHeading}><p className={styles.eyebrow}>Let’s find your starting point</p><h2>Bring the problem.<br />We’ll talk through the path.</h2><p>Tell us what prompted you to seek support and what you need to happen next.</p><Link href="/contact" className={styles.primary}>Book a conversation<ArrowUpRight size={18} aria-hidden="true" /></Link></div><ol className={styles.steps}><li><span>01</span><div><h3>The issue or concern</h3><p>What happened, who is affected and what remains uncertain.</p></div></li><li><span>02</span><div><h3>The work already done</h3><p>Existing reports, findings and the people or providers involved.</p></div></li><li><span>03</span><div><h3>The priorities ahead</h3><p>Upcoming decisions, deadlines and the support your team needs.</p></div></li></ol></div></section>
  </>;
}
