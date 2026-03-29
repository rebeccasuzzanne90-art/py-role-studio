import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, DM_Sans } from "next/font/google";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeInjector } from "@/components/theme-injector";
import { JsonLd } from "@/components/json-ld";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getSiteSettings, getNavigation } from "@/lib/content";
import { organizationJsonLd } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "The Payroll Studio | Payroll Governance & Compliance",
    template: "%s | The Payroll Studio",
  },
  description:
    "The Payroll Studio helps Australian organisations build payroll functions that are compliant, well-governed, and built to scale.",
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "The Payroll Studio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = getSiteSettings();
  const navData = getNavigation();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${dmSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeInjector settings={settings} />
        <JsonLd data={organizationJsonLd(settings)} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <TooltipProvider>
            <Navigation navData={navData} />
            <main className="flex-1">{children}</main>
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
