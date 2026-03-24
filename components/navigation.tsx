"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronDown, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import type { NavData, NavLink } from "@/lib/parse-navigation";

const FALLBACK_LINKS: NavLink[] = [
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "HIPAA Compliance", href: "/services/hipaa" },
      { label: "ISO 27001 & ISO 42001", href: "/services/iso-27001" },
      { label: "SOC2", href: "/services/soc2" },
      { label: "GDPR", href: "/services/gdpr" },
      { label: "HITRUST", href: "/services/hitrust" },
      { label: "Data Security Audits", href: "/services/data-security-audits" },
      { label: "Fractional CISO", href: "/services/fractional-ciso" },
      { label: "Pen Tests", href: "/services/pen-tests" },
      { label: "Disaster Recovery", href: "/services/disaster-recovery" },
      { label: "Team Training", href: "/services/team-training" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Resources", href: "/resources" },
    ],
  },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
];

interface NavigationProps {
  navData?: NavData | null;
}

export function Navigation({ navData }: NavigationProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const links = navData?.links?.length ? navData.links : FALLBACK_LINKS;
  const ctaLabel = navData?.ctaLabel ?? "Get Started";
  const ctaHref = navData?.ctaHref ?? "/contact";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          {navData?.logoUrl ? (
            <Image
              src={navData.logoUrl}
              alt={navData.logoAlt ?? "VanRein Compliance"}
              width={160}
              height={32}
              className="h-8 w-auto"
              priority
            />
          ) : (
            <>
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold tracking-tight">VanRein</span>
            </>
          )}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() =>
                link.children && setOpenDropdown(link.label)
              }
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={link.href}
                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {link.label}
                {link.children && <ChevronDown className="h-3.5 w-3.5" />}
              </Link>

              {link.children && openDropdown === link.label && (
                <div className="absolute left-0 top-full z-50 min-w-[220px] rounded-lg border bg-popover p-2 shadow-lg">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      {...(child.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <Link href="/portal/login">
            <Button variant="ghost" size="sm">
              Client Portal
            </Button>
          </Link>
          <Link href={ctaHref}>
            <Button size="sm">{ctaLabel}</Button>
          </Link>
        </div>

        {/* Mobile nav */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger
            className="lg:hidden"
            render={<Button variant="ghost" size="icon" />}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col gap-4 pt-8">
              {links.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    className="block py-2 text-lg font-medium"
                    onClick={() => setSheetOpen(false)}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="ml-4 flex flex-col gap-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block py-1.5 text-sm text-muted-foreground"
                          onClick={() => setSheetOpen(false)}
                          {...(child.external
                            ? {
                                target: "_blank",
                                rel: "noopener noreferrer",
                              }
                            : {})}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-4 flex flex-col gap-2 border-t pt-4">
                <ThemeToggle />
                <Link
                  href="/portal/login"
                  onClick={() => setSheetOpen(false)}
                >
                  <Button variant="outline" className="w-full">
                    Client Portal
                  </Button>
                </Link>
                <Link href={ctaHref} onClick={() => setSheetOpen(false)}>
                  <Button className="w-full">{ctaLabel}</Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
