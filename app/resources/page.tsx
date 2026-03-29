import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Access whitepapers, guides, podcasts, and videos on payroll compliance.",
};

export default function ResourcesPage() {
  return (
    <>
      <section className="py-20 text-white" style={{ backgroundColor: "#1e3a2a" }}>
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Resources
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Whitepapers, guides, podcasts, and more to keep you informed
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="py-20 text-center text-muted-foreground">
            No resources available yet.
          </p>
        </div>
      </section>
    </>
  );
}
