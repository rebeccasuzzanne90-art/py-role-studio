import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Hero } from "@/components/hero";
import { LinkedCtaButton } from "@/components/linked-cta-button";
import { courses, getCourse, courseQuoteUrl } from "@/content/courses";
import styles from "../courses/courses.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return courses.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const course = getCourse((await params).slug);
  if (!course) notFound();
  return {
    title: { absolute: `${course.title} | The Payroll Studio` },
    description: course.description,
    alternates: { canonical: `https://www.thepayrollstudio.com.au/payroll-training/${course.slug}` },
  };
}

export default async function CoursePage({ params }: Props) {
  const course = getCourse((await params).slug);
  if (!course) notFound();
  return <div className={styles.page}>
    <Hero data={{
      eyebrow: `Payroll courses · ${course.category}`,
      headline: course.title,
      subheadline: "",
      body: course.description,
      primaryCta: { label: "Request a quote", href: courseQuoteUrl(course.slug), variant: "primary" },
      secondaryCta: { label: "Explore all courses", href: "/payroll-training/courses", variant: "secondary" },
    }} />
    <section className={`${styles.container} ${styles.catalogue}`}>
      <div className={styles.intro}>
        <div><p className={styles.eyebrow}>Who this course is for</p><h2>Build confidence.<br /><span>Apply it at work.</span></h2></div>
        <p>{course.audience}</p>
      </div>
      <h2>What you’ll learn</h2>
      <ol className={styles.modules}>{course.topics.map((topic, index) => <li key={topic}><span>0{index + 1}</span><p>{topic}</p></li>)}</ol>
    </section>
    <section className={styles.next}><div className={styles.container}>
      <div><p className={styles.eyebrow}>From learning to practice</p><h2>Your course takeaway</h2><p>{course.takeaway}</p></div>
      <div><h3>Work with relevant scenarios</h3><p>Tell us about your team’s experience and the situations they need to handle. We’ll agree the scope and examples before delivery, so the session connects to their responsibilities.</p><p>You can discuss learning priorities without sharing identifiable employee records in your enquiry.</p></div>
    </div></section>
    <section className={`${styles.container} ${styles.faq}`}>
      <h2>Plan training for your team</h2>
      <p>Share your participant numbers, preferred timing and delivery preference. We’ll confirm the scope, duration, format and fee in your quote.</p>
      <LinkedCtaButton cta={{ label: "Request a quote", href: courseQuoteUrl(course.slug), variant: "primary" }} className="my-8" />
      <details><summary>Can the course be tailored?</summary><p>Yes. We’ll discuss your team’s experience, responsibilities and learning goals, then confirm the agreed content in your proposal.</p></details>
      <details><summary>How long is the course and what does it cost?</summary><p>Duration and pricing depend on the agreed scope and delivery arrangements. Request a quote to discuss your requirements.</p></details>
      <details><summary>Is this an accredited qualification?</summary><p>This is practical workplace training, not a nationally recognised qualification. It supports team capability and does not replace advice on a specific legal or tax matter.</p></details>
      <p><Link href="/payroll-training/courses">Compare all payroll courses</Link> or learn more about our <Link href="/services/payroll-training">payroll training approach</Link>.</p>
    </section>
  </div>;
}
