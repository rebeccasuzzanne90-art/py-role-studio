export const PRODUCTS: Record<
  string,
  {
    title: string;
    price: number;
    description: string;
    features: string[];
    stripePriceId?: string;
  }
> = {
  "hipaa-training": {
    title: "HIPAA Compliance Training",
    price: 299,
    description:
      "Comprehensive HIPAA training for all staff members. Includes interactive modules, quizzes, and certification of completion. Covers the Privacy Rule, Security Rule, and Breach Notification Rule.",
    features: [
      "12 interactive training modules",
      "Quizzes after each module",
      "Certificate of completion",
      "Annual refresher content",
      "Phishing simulation exercises",
      "Manager dashboard for tracking",
    ],
  },
  "security-awareness": {
    title: "Security Awareness Program",
    price: 199,
    description:
      "Annual security awareness training covering phishing, social engineering, password hygiene, and data handling best practices.",
    features: [
      "8 core training modules",
      "Monthly phishing simulations",
      "Password security best practices",
      "Social engineering awareness",
      "Data handling procedures",
      "Completion tracking",
    ],
  },
  "policies-package": {
    title: "Policies & Procedures Package",
    price: 499,
    description:
      "A complete package of customizable security policies and procedures tailored to your industry.",
    features: [
      "50+ policy templates",
      "Customizable to your organization",
      "Regular updates included",
      "Industry-specific versions",
      "Implementation guidance",
      "1 year of updates",
    ],
  },
  "soc2-readiness": {
    title: "SOC2 Readiness Course",
    price: 399,
    description:
      "Self-paced course covering everything you need to prepare for SOC2 audits.",
    features: [
      "15 video lessons",
      "Evidence collection templates",
      "Control mapping worksheets",
      "Practice assessments",
      "Assessor preparation guide",
      "Lifetime access",
    ],
  },
  "incident-response-kit": {
    title: "Incident Response Planning Kit",
    price: 249,
    description:
      "Templates and training materials for building incident response capability.",
    features: [
      "IR plan templates",
      "Communication templates",
      "Tabletop exercise guides",
      "Escalation procedures",
      "Post-incident review forms",
      "Regulatory notification checklists",
    ],
  },
  "gdpr-toolkit": {
    title: "GDPR Compliance Toolkit",
    price: 349,
    description:
      "Everything needed to achieve and maintain GDPR compliance.",
    features: [
      "Data mapping templates",
      "Privacy impact assessments",
      "Consent management guides",
      "Subject access request procedures",
      "Breach notification templates",
      "DPA templates",
    ],
  },
};

