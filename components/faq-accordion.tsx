import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

const FALLBACK_FAQS: FaqItem[] = [
  {
    question: "What is HIPAA compliance and who needs it?",
    answer:
      "HIPAA (Health Insurance Portability and Accountability Act) is a federal law that requires healthcare organizations and their business associates to protect sensitive patient health information. Any organization that handles Protected Health Information (PHI) needs to be HIPAA compliant.",
    category: "General",
  },
  {
    question: "How long does a compliance audit take?",
    answer:
      "A typical compliance audit takes 4-8 weeks depending on the size and complexity of your organization. This includes the initial assessment, gap analysis, and remediation planning phases.",
    category: "General",
  },
  {
    question: "What is the difference between SOC2 Type I and Type II?",
    answer:
      "SOC2 Type I evaluates the design of security controls at a specific point in time, while SOC2 Type II evaluates the operating effectiveness of those controls over a period of time (typically 6-12 months). Type II is generally considered more rigorous and valuable.",
    category: "SOC2",
  },
  {
    question: "Do you offer ongoing compliance monitoring?",
    answer:
      "Yes, we provide continuous compliance monitoring and support. Our team will work alongside you to maintain compliance, conduct regular reviews, and ensure your security posture stays current with evolving regulations.",
    category: "Services",
  },
  {
    question: "What industries do you serve?",
    answer:
      "We serve healthcare, fintech, SaaS, telecommunications, answering services, and any organization that handles sensitive data. Our expertise spans HIPAA, SOC2, ISO 27001, GDPR, HITRUST, and more.",
    category: "General",
  },
];

interface FaqAccordionProps {
  faqs?: FaqItem[];
}

export function FaqAccordion({ faqs = FALLBACK_FAQS }: FaqAccordionProps) {
  return (
    <Accordion className="w-full">
      {faqs.map((faq, i) => (
        <AccordionItem key={i} value={`faq-${i}`}>
          <AccordionTrigger className="text-left text-base font-medium">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
