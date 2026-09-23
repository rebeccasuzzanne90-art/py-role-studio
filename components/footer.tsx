import Link from "next/link";
import Image from "next/image";
import { NewsletterForm } from "@/components/newsletter-form";

const FOOTER_SECTIONS = [
  {
    title: "Navigation",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Understand The Risk", href: "/services/understand-the-risk" },
      { label: "Build The Foundations", href: "/services/build-the-foundations" },
      { label: "Stay Ahead Of Problems", href: "/services/stay-ahead-of-problems" },
      { label: "Prepare For Change", href: "/services/prepare-for-change" },
      { label: "Payroll Training", href: "/services/payroll-training" },
      { label: "Remediation Governance", href: "/services/payroll-remediation" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="text-foreground" style={{ backgroundColor: "var(--muted)" }}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="The Payroll Studio"
                width={160}
                height={32}
                className="h-8 w-auto brightness-0"
              />
            </Link>
            <NewsletterForm variant="footer" />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title}>
                <h3 className="mb-4 text-sm font-semibold text-muted-foreground">{section.title}</h3>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} The Payroll Studio. All rights
            reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="/accessibility" className="hover:text-foreground">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
