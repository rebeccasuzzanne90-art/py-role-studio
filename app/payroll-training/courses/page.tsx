import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, Plus } from "lucide-react";
import { Hero } from "@/components/hero";
import { LinkedCtaButton } from "@/components/linked-cta-button";
import { courses, courseQuoteUrl } from "@/content/courses";
import styles from "./courses.module.css";

export const metadata: Metadata = {
  title: { absolute: "Payroll Courses: Awards, Remediation & Essentials | The Payroll Studio" },
  description: "Explore Modern Award Interpretation Training, Payroll Remediation Training and Payroll Essentials. Request a quote for practical training for your team.",
  alternates: { canonical: "https://www.thepayrollstudio.com.au/payroll-training/courses" },
};

export default function CoursesPage() {
  return <div className={styles.page}>
    <Hero data={{
      eyebrow: "The Payroll Studio · Courses",
      headline: "Payroll courses. *Knowledge put to work.*",
      subheadline: "",
      body: "Explore practical learning in award interpretation, remediation and payroll essentials. Choose the focus your team needs, then talk to us about a course shaped around your people and their day-to-day work.",
      imageUrl: "/images/training/canva-workshop-audience.jpg",
      imageAlt: "An audience participating in a workshop with a speaker; illustrative Canva stock image",
      primaryCta: { label: "Explore courses", href: "#courses", variant: "primary" },
      secondaryCta: { label: "Discuss your training needs", href: "/contact", variant: "secondary" },
    }} />
    <nav className={styles.courseNav} aria-label="Course topics"><div className={styles.container}><span>Find your focus</span>{courses.map(course => <a key={course.slug} href={`#${course.slug}`}>{course.category}<ArrowDown size={14} aria-hidden="true" /></a>)}</div></nav>
    <section id="courses" className={`${styles.container} ${styles.catalogue}`} aria-labelledby="courses-heading">
      <div className={styles.intro}><div><p className={styles.eyebrow}>Learning for the work ahead</p><h2 id="courses-heading">Three courses.<br /><span>A stronger payroll team.</span></h2></div><p>Start with the topic that matters most. Tell us about your team, experience and priorities, and we’ll confirm the content, delivery and pricing in your quote.</p></div>
      <div className={styles.list}>{courses.map((course, index) => <article id={course.slug} key={course.slug} className={styles.course} aria-labelledby={`${course.slug}-title`}>
        <div className={styles.number}>0{index + 1}<span>{course.category}</span></div>
        <div className={styles.courseBody}><h3 id={`${course.slug}-title`}><Link href={`/payroll-training/${course.slug}`}>{course.title}</Link></h3><p>{course.description}</p><p className={styles.audience}><strong>Who it’s for</strong>{course.audience}</p>
          <Link href={`/payroll-training/${course.slug}`} className={styles.textLink} style={{ marginTop: 20 }}>View course details <ArrowUpRight size={16} aria-hidden="true" /></Link><details className={styles.details}><summary>Explore what you’ll learn <Plus size={18} aria-hidden="true" /></summary><ul>{course.topics.map(topic => <li key={topic}><Check size={17} aria-hidden="true" /><span>{topic}</span></li>)}</ul><p><strong>Your takeaway:</strong> {course.takeaway}</p></details>
        </div>
        <aside className={styles.quote} aria-label={`${course.title} enquiry`}><p className={styles.eyebrow}>Training for your team</p><p>Content, duration and delivery agreed around your needs.</p><LinkedCtaButton cta={{ label: "Request a quote", href: courseQuoteUrl(course.slug), variant: "primary" }} className={styles.quoteButton}/><span>No fixed course fee. We’ll scope your requirements first.</span></aside>
      </article>)}</div>
    </section>
    <section className={styles.next}><div className={styles.container}><div><p className={styles.eyebrow}>Make it relevant</p><h2>Built around<br /><span>your team’s questions.</span></h2><p>Bring the decisions, handovers or recurring issues your team needs to understand. We’ll discuss the right level and format before confirming your training.</p><Link href="/services/payroll-training" className={styles.textLink}>How our training works <ArrowUpRight size={18} aria-hidden="true" /></Link></div><ol><li><span>01</span><div><h3>Choose your focus</h3><p>Select a course or tell us where your team needs support.</p></div></li><li><span>02</span><div><h3>Tell us about your team</h3><p>Share your group size, experience, preferred format and timing.</p></div></li><li><span>03</span><div><h3>Receive a tailored quote</h3><p>Agree the course scope, delivery arrangements and fee before booking.</p></div></li></ol></div></section>
    <section className={`${styles.container} ${styles.faq}`} aria-labelledby="questions-heading"><h2 id="questions-heading">Before you enquire</h2><details><summary>Can we tailor a course to our organisation?</summary><p>Yes. Tell us about your workforce, team responsibilities and learning priorities. The agreed scope and materials will be confirmed in your proposal.</p></details><details><summary>Where are the dates, duration and prices?</summary><p>These are confirmed when we scope your training. Use Request a quote to share your preferred timing, location or virtual delivery preference, and the number of participants.</p></details><details><summary>Are these accredited qualifications?</summary><p>These are practical workplace training courses, not nationally recognised qualifications. They focus on capability and application within your team.</p></details><details><summary>Can training help with a live remediation program?</summary><p>Training can help your team understand scoping, decisions and validation. For support with the program itself, explore our <Link href="/services/payroll-remediation">payroll remediation service</Link>. Training does not replace legal or tax advice.</p></details></section>
  </div>;
}
