"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronDown, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import type { NavData, NavLink } from "@/types/content";

const FALLBACK_LINKS: NavLink[] = [
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Understand The Risk", href: "/services/understand-the-risk" },
      { label: "Build The Foundations", href: "/services/build-the-foundations" },
      { label: "Stay Ahead Of Problems", href: "/services/stay-ahead-of-problems" },
      { label: "Prepare For Change", href: "/services/prepare-for-change" },
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
    <header
      className="sticky top-0 z-50 w-full border-b border-white/10 text-white backdrop-blur"
      style={{ backgroundColor: "rgba(30, 58, 42, 0.95)" }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          {navData?.logoPath ? (
            <Image
              src={navData.logoPath}
              alt={navData.logoAlt ?? "The Payroll Studio"}
              width={160}
              height={32}
              className="h-8 w-auto brightness-0 invert"
              priority
            />
          ) : (
            <>
              <Shield className="h-6 w-6 text-white" />
              <span className="text-lg font-bold tracking-tight text-white">The Payroll Studio</span>
            </>
          )}
        </Link>

        {/* Desktop nav + CTA */}
        <div className="hidden items-center gap-2 lg:flex">
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
                className="flex items-center gap-1 rounded-md px-4 py-2 text-base font-medium text-white/80 transition-colors hover:text-white"
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {link.label}
                {link.children && <ChevronDown className="h-4 w-4" />}
              </Link>

              {link.children && openDropdown === link.label && (
                <div className="absolute left-0 top-full z-50 min-w-[240px] border border-white/10 bg-[#1e3a2a] p-2 shadow-lg">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
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
          <Link href={ctaHref}>
            <Button size="sm">{ctaLabel}</Button>
          </Link>
        </div>

        {/* Mobile nav */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger
            className="lg:hidden"
            render={<Button variant="ghost" size="icon" className="text-white hover:bg-white/10" />}
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
