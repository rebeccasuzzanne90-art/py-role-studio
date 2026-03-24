import {
  Send,
  ClipboardList,
  BarChart3,
  FileCheck,
  Users,
  ShieldCheck,
} from "lucide-react";

const STEPS = [
  {
    icon: Send,
    title: "Start a Conversation",
    description:
      "Begin your journey to enhanced data security by initiating a conversation with our experts to assess your specific needs.",
  },
  {
    icon: ClipboardList,
    title: "Risk Assessment & Audit",
    description:
      "Our team conducts a thorough risk assessment and audit of your existing data security infrastructure.",
  },
  {
    icon: BarChart3,
    title: "Risk Remediation Report",
    description:
      "Receive a comprehensive report detailing our findings and recommended actions to mitigate risks.",
  },
  {
    icon: FileCheck,
    title: "We Guide You Through",
    description:
      "We'll personally guide you through the report, helping you understand the findings and prioritize actions.",
  },
  {
    icon: Users,
    title: "We Train Your Staff",
    description:
      "Empower your team with essential cybersecurity knowledge through our training programs.",
  },
  {
    icon: ShieldCheck,
    title: "Maintain Compliance",
    description:
      "We continue to work alongside you, providing ongoing support to maintain compliance and strengthen data security.",
  },
];

export function FrameworkSteps() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            The VanRein Framework
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our proven six-step process to secure your data
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.title} className="relative flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                {i + 1}
              </div>
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <step.icon className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold">{step.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
