import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { Geist, Geist_Mono, Playfair_Display, DM_Sans } from "next/font/google";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeInjector } from "@/components/theme-injector";
import { JsonLd } from "@/components/json-ld";
import { ContentfulPreviewProvider } from "@/components/contentful-preview-provider";
import { DraftModeBanner } from "@/components/draft-mode-banner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getSiteSettings, getNavigation } from "@/lib/contentful";
import { organizationJsonLd } from "@/lib/seo";
import { parseNavigation } from "@/lib/parse-navigation";
import type { SiteSettingsFields } from "@/types/contentful";
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
    default: "VanRein Compliance | Data Security",
    template: "%s | VanRein Compliance",
  },
  description:
    "With over 25 years of experience, we help organizations navigate HIPAA, SOC2, ISO27001, HITRUST, GDPR, and other data security regulations.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "VanRein Compliance",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  let settings: SiteSettingsFields | null = null;
  let navData: ReturnType<typeof parseNavigation> | null = null;

  try {
    const [settingsEntry, navEntry] = await Promise.all([
      getSiteSettings(isDraftMode),
      getNavigation(isDraftMode),
    ]);
    if (settingsEntry) {
      settings = settingsEntry.fields as unknown as SiteSettingsFields;
    }
    if (navEntry) {
      navData = parseNavigation(navEntry, settings);
    }
  } catch {
    // Contentful not configured — use defaults
  }

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
        <ContentfulPreviewProvider isDraftMode={isDraftMode}>
          <ThemeProvider>
            <TooltipProvider>
              <Navigation navData={navData} />
              <main className="flex-1">{children}</main>
              <Footer />
            </TooltipProvider>
          </ThemeProvider>
          {isDraftMode && <DraftModeBanner />}
        </ContentfulPreviewProvider>
      </body>
    </html>
  );
}
