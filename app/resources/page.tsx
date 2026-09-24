import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Payroll Governance Resources | The Payroll Studio" },
  description: "Explore payroll governance resources from The Payroll Studio. Visit our articles for guidance on payroll risk, controls and accountability.",
  alternates: { canonical: "https://www.thepayrollstudio.com.au/resources" },
};

export default function ResourcesPage() {
  return (
    <>
      <section className="py-20 text-foreground" style={{ backgroundColor: "var(--muted)" }}>
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Payroll governance resources</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Explore practical reading on payroll risk, controls and accountability.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="py-20 text-center text-muted-foreground">
            Dedicated resources are being developed. Read our <Link href="/blog" className="underline">payroll governance guides and articles</Link> in the meantime.
          </p>
        </div>
      </section>
    </>
  );
}
