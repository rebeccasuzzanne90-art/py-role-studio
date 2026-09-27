export const courses = [
  {
    slug: "modern-award-interpretation",
    title: "Modern Award Interpretation Training",
    category: "Award interpretation",
    description: "Apply award clauses to practical payroll scenarios. Build a clear, documented approach to the decisions behind employee pay.",
    audience: "Payroll teams, HR professionals and people responsible for reviewing pay rules.",
    topics: ["Identify award coverage and the questions to resolve before applying a clause.", "Work through ordinary hours, overtime, penalties, allowances and breaks using practical scenarios.", "Document interpretation decisions, assumptions and issues that need specialist advice.", "Translate agreed rules into payroll checks and review points."],
    takeaway: "A practical approach to reading award clauses, recording decisions and checking their application.",
  },
  {
    slug: "payroll-remediation",
    title: "Payroll Remediation Training",
    category: "Remediation & controls",
    description: "Scope a review, document interpretation decisions and validate remediation results. Learn how to address the causes of errors and reduce the risk of them recurring.",
    audience: "Payroll, HR and Finance teams involved in an underpayment review or remediation program.",
    topics: ["Define the review scope, responsibilities, data needs and key decisions.", "Record historical rule interpretations, assumptions and evidence gaps.", "Plan validation checks, investigate exceptions and document review outcomes.", "Connect root causes to practical controls, accountable owners and follow-up actions."],
    takeaway: "A clearer framework for contributing to a remediation program, from scoping to validation and prevention.",
  },
  {
    slug: "payroll-essentials",
    title: "Payroll Essentials",
    category: "Payroll foundations",
    description: "Build confidence in the everyday payroll cycle. Understand the inputs, checks and responsibilities that support accurate, consistent payroll.",
    audience: "People new to payroll, returning to the function, or supporting payroll through HR and Finance.",
    topics: ["Follow the payroll cycle from employee setup and approved inputs to review and reporting.", "Understand where pay, leave, tax and superannuation requirements fit into the process.", "Recognise common input errors and practise useful pre-pay and post-pay checks.", "Clarify record keeping, approvals, handovers and escalation responsibilities."],
    takeaway: "A practical foundation for day-to-day payroll work and knowing when to ask for support.",
  },
] as const;

export function getCourse(slug: string | string[] | undefined) {
  return typeof slug === "string" ? courses.find(course => course.slug === slug) : undefined;
}

export function courseQuoteUrl(slug: string) {
  return `/contact?course=${encodeURIComponent(slug)}#enquiry`;
}
