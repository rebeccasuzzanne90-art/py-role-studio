import Link from "next/link";
import { Shield } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter-form";

const FOOTER_SECTIONS = [
  {
    title: "Navigation",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Shop", href: "/shop" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "HIPAA", href: "/services/hipaa" },
      { label: "SOC2", href: "/services/soc2" },
      { label: "ISO 27001", href: "/services/iso-27001" },
      { label: "GDPR", href: "/services/gdpr" },
      { label: "HITRUST", href: "/services/hitrust" },
      { label: "Pen Tests", href: "/services/pen-tests" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Client Portal", href: "/portal" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="text-white" style={{ backgroundColor: "#1e3a2a" }}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-7 w-7 text-[#c9963e]" />
              <span className="text-lg font-bold text-white">VanRein Compliance</span>
            </Link>
            <p className="max-w-sm text-sm text-white/60">
              With over 25 years of experience, we help organizations navigate
              HIPAA, SOC2, ISO27001, HITRUST, GDPR, and other data security
              regulations.
            </p>
            <NewsletterForm variant="footer" />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title}>
                <h3 className="mb-4 text-sm font-semibold text-[#c9963e]">{section.title}</h3>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/60 transition-colors hover:text-white"
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

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} VanRein Compliance. All rights
            reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/40">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
            <Link href="/accessibility" className="hover:text-white">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
