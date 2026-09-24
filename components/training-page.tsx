import Link from "next/link";
import { ArrowRight, Users, ShieldCheck, MessageSquare, FileText, ClipboardCheck, ListChecks } from "lucide-react";
import type { PageData, SectionData } from "@/types/content";
import { Hero } from "@/components/hero";
import { ModuleRenderer } from "@/components/module-renderer";
import { WorkshopExplorer, TrainingScenario } from "@/components/training-experience";
import ReactMarkdown from "react-markdown";
import styles from "./training-page.module.css";

const navigation = [["audience", "Your team"], ["workshops", "Workshops"], ["outcomes", "Outcomes"], ["materials", "Practical learning"], ["delivery", "Delivery"], ["facilitator", "Facilitator"], ["training-faqs", "FAQs"]];
const audienceIcons = [Users, ShieldCheck, MessageSquare];
const materialCards = [
  { icon: FileText, title: "Make responsibilities visible", text: "Explore a responsibilities matrix that connects a decision to its owner, reviewer and escalation route." },
  { icon: ClipboardCheck, title: "Work through the evidence", text: "Use a scenario, root-cause worksheet or validation checklist to practise asking better questions." },
  { icon: ListChecks, title: "Plan what happens next", text: "Bring learning together in a practical action plan with priorities and accountable owners." },
];

export function TrainingPage({ page }: { page: PageData }) {
  const sections = (page.sections ?? []) as (SectionData & { anchorId?: string })[];
  return <div className={styles.page}>
    <Hero data={{ ...page.hero, headline: page.hero?.headline ?? "Payroll training. *Stronger decisions.*", imageUrl: "/images/training/canva-workshop-audience.jpg", imageAlt: "Participants raising their hands during a facilitated workshop; illustrative stock photo" }} />
    <nav className={styles.navigation} aria-label="On this page"><div className={styles.container}><span>Explore training</span>{navigation.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</div></nav>
    {sections.map((section, index) => {
      const id = section.anchorId;
      if (index === 0) return null;
      if (id === "audience" && section._type === "triplex") return <section key={id} id={id} className={styles.section}><div className={styles.container}><div className={styles.sectionIntro}><div><p className={styles.eyebrow}>Built around your people</p><h2>Payroll is a team responsibility.<br /><em>Build capability together.</em></h2></div><p>Bring payroll, HR and Finance into the same conversation, with learning shaped around the decisions each team makes.</p></div><div className={styles.audiences}>{section.items.map((item, i) => { const Icon = audienceIcons[i]; return <article key={item.title}><Icon size={28} aria-hidden="true"/><span className={styles.cardNumber}>0{i + 1}</span><h3>{item.title}</h3><p>{item.description}</p><a href="#workshops" className={styles.textLink}>Explore workshop themes <ArrowRight size={17} aria-hidden="true"/></a></article>; })}</div></div></section>;
      if (section._type === "textBlock" && section.heading === "When payroll knowledge needs to be shared") return null;
      if (id === "workshops" && section._type === "accordionSection") return <WorkshopExplorer key={id} data={section}/>;
      if (id === "outcomes" && section._type === "triplex") return <section key={id} id={id} className={`${styles.section} ${styles.outcomes}`}><div className={styles.container}><p className={styles.eyebrow}>From understanding to action</p><h2>{section.heading}</h2><div className={styles.journey}>{section.items.map((item, i) => <article key={item.title}><span>0{i + 1}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></div></section>;
      if (id === "materials") return <div key={id} id={id}><TrainingScenario/><section className={styles.section}><div className={styles.container}><div className={styles.sectionIntro}><div><p className={styles.eyebrow}>Tools for the conversation</p><h2>Put the learning<br /><em>to work.</em></h2></div><p>Exercises can use fictional or appropriately anonymised scenarios. Materials and any follow-up support are agreed in your proposal.</p></div><div className={styles.materials}>{materialCards.map(({ icon: Icon, title, text }) => <article key={title}><Icon size={26} aria-hidden="true"/><h3>{title}</h3><p>{text}</p></article>)}</div><Link href="/blog/payroll-remediation/root-causes" className={styles.textLink}>Explore payroll underpayment causes <ArrowRight size={18} aria-hidden="true"/></Link></div></section></div>;
      if (id === "delivery" && section._type === "textBlock") return <section key={id} id={id} className={`${styles.section} ${styles.delivery}`}><div className={`${styles.container} ${styles.deliveryGrid}`}><div><p className={styles.eyebrow}>A format that fits</p><h2>{section.heading}</h2><div className={styles.copy}><ReactMarkdown>{section.body ?? ""}</ReactMarkdown></div></div><div className={styles.formats}>{[{title:"In-house",text:"A shared learning experience shaped around your workforce and team."},{title:"Virtual",text:"Discuss delivery for colleagues working across different locations."},{title:"Across sessions",text:"Make room for practical work, reflection and a focused follow-up."}].map((item,i)=><article key={item.title}><span>0{i+1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></div></section>;
      if (section._type === "triplex" && !id) return <section key={index} className={styles.section}><div className={styles.container}><p className={styles.eyebrow}>Your next steps</p><h2>{section.heading}</h2><div className={styles.journey}>{section.items.map((item,i)=><article key={item.title}><span>0{i+1}</span><h3>{item.title.replace(/^\d+ \/ /, "")}</h3><p>{item.description}</p></article>)}</div></div></section>;
      if (id === "facilitator" && section._type === "textBlock") return <section key={id} id={id} className={`${styles.section} ${styles.facilitator}`}><div className={`${styles.container} ${styles.facilitatorGrid}`}><div><p className={styles.eyebrow}>Meet your facilitator</p><h2>Rebecca Wade</h2><p className={styles.role}>Founder, The Payroll Studio</p><Link href="/about" className={styles.textLink}>Meet Rebecca <ArrowRight size={18} aria-hidden="true"/></Link></div><div><h3>{section.heading}</h3><div className={styles.copy}><ReactMarkdown>{section.body ?? ""}</ReactMarkdown></div></div></div></section>;
      if (section._type === "textBlock" && section.heading === "Practical capability, with a clear scope") return null;
      if (index === sections.length-1 && section._type === "textBlock") return <section key={index} className={`${styles.section} ${styles.finalCta}`}><div className={styles.container}><p className={styles.eyebrow}>Build your team’s next chapter</p><h2>{section.heading}</h2><p>{section.body}</p><Link href="/contact" className={styles.button}>Discuss your training needs <ArrowRight size={18} aria-hidden="true"/></Link><Link href="/services/payroll-remediation" className={styles.textLink}>Explore remediation support <ArrowRight size={18} aria-hidden="true"/></Link></div></section>;
      return <ModuleRenderer key={id ?? index} sections={[section]}/>;
    })}
  </div>;
}
