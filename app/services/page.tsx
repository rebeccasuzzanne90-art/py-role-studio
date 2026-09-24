import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Search, Network, Compass, ShieldCheck, ClipboardCheck, GraduationCap } from "lucide-react";
import { getPageBySlug } from "@/lib/content";
import type { ServicesSectionData } from "@/types/content";
import styles from "./services.module.css";

export const metadata: Metadata = {
  title: { absolute: "Payroll Advisory Services | The Payroll Studio" },
  description: "Explore payroll advisory services for Australian organisations: compliance reviews, governance frameworks, transformation oversight, remediation and training.",
  alternates: { canonical: "https://www.thepayrollstudio.com.au/services" },
};

const icons = [Search, Network, Compass, ShieldCheck, ClipboardCheck, GraduationCap];
const labels = ["Risk reviews", "Governance", "Transformation", "Ongoing support", "Remediation", "Training"];

export default function ServicesPage() {
  const page = getPageBySlug("services");
  const section = page?.sections?.find((item): item is ServicesSectionData => item._type === "servicesSection");
  const services = section?.services ?? [];

  return (
    <>
      <section className={styles.hero}>
        <Image src="/images/services/canva-business-meeting.jpg" alt="Business colleagues discussing documents around a meeting table" fill preload sizes="100vw" className={styles.heroImage} />
        <div className={styles.heroShade} />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Payroll advisory · Australia</p>
          <h1>Expert support.<br /><span>More confident payroll.</span></h1>
          <p className={styles.heroBody}>Payroll advisory services that bring clarity to risk, structure to change and confidence to the people responsible for getting pay right.</p>
          <div className={styles.actions}>
            <Link href="/contact" className={styles.primary}>Discuss your needs <ArrowUpRight size={18} aria-hidden="true" /></Link>
            <a href="#service-options" className={styles.heroLink}>Explore our services <ArrowDown size={17} aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <nav aria-label="Explore payroll services" className={styles.serviceNav}>
        <div>{services.map((service, index) => <a key={service.slug} href={`#${service.slug}`}>{labels[index] ?? service.category}<ArrowDown size={14} aria-hidden="true" /></a>)}</div>
      </nav>

      <section className={styles.intro}>
        <div>
          <p className={styles.eyebrow}>How can we help?</p>
          <h2>Start with what’s<br />keeping you up.</h2>
        </div>
        <div>
          <p className={styles.introLead}>You don’t need to have all the answers before you ask for support.</p>
          <p>Perhaps payroll errors keep returning. A review has identified an underpayment. Or a major system change is putting pressure on your people. We help HR, Finance and payroll leaders understand what needs attention and agree a practical way forward.</p>
          <ul>
            <li>Understand your exposure and prioritise the right fixes.</li>
            <li>Put clear ownership and oversight around complex work.</li>
            <li>Build the knowledge and controls to prevent a repeat.</li>
          </ul>
        </div>
      </section>

      <section id="service-options" className={styles.services} aria-labelledby="services-heading">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Our services</p>
          <h2 id="services-heading">The right expertise.<br />At the right point.</h2>
        </div>
        {services.map((service, index) => {
          const Icon = icons[index] ?? Search;
          return (
            <article key={service.slug} id={service.slug} className={`${styles.serviceRow} ${index % 2 ? styles.reverse : ""}`}>
              <div className={`${styles.servicePanel} ${index % 3 === 1 ? styles.darkPanel : ""}`}>
                <div className={styles.panelTop}><Icon size={34} strokeWidth={1.3} aria-hidden="true" /><span>{String(index + 1).padStart(2, "0")}</span></div>
                <div><p className={styles.eyebrow}>{service.category}</p><h3>{service.title}</h3></div>
              </div>
              <div className={styles.serviceCopy}>
                <p className={styles.bestFor}>{service.bestFor}</p>
                <p>{service.shortDescription}</p>
                <div className={styles.outcome}><span>What you take away</span><p>{service.outcome}</p></div>
                <Link href={`/services/${service.slug}`} className={styles.textLink}>{service.ctaLabel ?? "Explore this service"}<ArrowUpRight size={19} aria-hidden="true" /></Link>
              </div>
            </article>
          );
        })}
      </section>

      <section className={styles.nextStep} aria-labelledby="next-step-heading">
        <div className={styles.nextInner}>
          <div className={styles.nextHeading}><p className={styles.eyebrow}>A clear starting point</p><h2 id="next-step-heading">Let’s work out<br />what comes next.</h2><p>Whether the issue is clear or you’re still finding the edges, start with a conversation.</p><Link href="/contact" className={styles.primary}>Talk through your situation <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
          <ol className={styles.steps}>
            <li><span>01</span><div><h3>Tell us what’s happening</h3><p>Share the issue, who it affects, what you’ve tried and any deadlines ahead.</p></div></li>
            <li><span>02</span><div><h3>Agree the right scope</h3><p>We clarify priorities, responsibilities and how our work connects with your team and existing advisers.</p></div></li>
            <li><span>03</span><div><h3>Move forward with a plan</h3><p>Know the next steps, the expected outputs and who owns the decisions.</p></div></li>
          </ol>
        </div>
      </section>
    </>
  );
}
