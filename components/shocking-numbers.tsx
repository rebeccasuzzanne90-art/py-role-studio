const NUMBERS = [
  {
    stat: "$135M",
    title: "HIPAA Fines",
    description:
      "On average, a data breach can cost an organization approximately $135 million, making it essential to prioritize data security measures.",
  },
  {
    stat: "82%",
    title: "of Data Breaches",
    description:
      "Approximately 82% of data breaches are caused by human error, emphasizing the need for comprehensive staff training and awareness programs.",
  },
  {
    stat: "€1.5B",
    title: "GDPR Fines",
    description:
      "Non-compliance with data security regulations can result in substantial fines. GDPR fines alone totaled €1.5 billion in recent years.",
  },
  {
    stat: "493.33M",
    title: "Ransomware Attacks",
    description:
      "Businesses experience an average of 493.33 million ransomware attacks per year, underscoring the constant need for robust security defenses.",
  },
];

export function ShockingNumbers() {
  return (
    <section className="bg-primary py-20 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          The Numbers Are Shocking
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {NUMBERS.map((item) => (
            <div key={item.title} className="text-center">
              <p className="text-3xl font-bold sm:text-4xl">{item.stat}</p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-primary-foreground/80">
                {item.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
