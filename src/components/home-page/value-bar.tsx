const items = [
  {
    title: "Choose With Confidence",
    description: "Multi-platform technology expertise",
  },
  {
    title: "Deploy Successfully",
    description: "Implementation & migration support",
  },
  {
    title: "Build Team Capability",
    description: "Workflow-focused training",
  },
  {
    title: "Stay Productive",
    description: "Long-term technical support",
  },
] as const;

/**
 * Value bar
 * Content: choose, deploy, train, support
 * UI: compact four-column ribbon between hero and about
 */
export function ValueBar() {
  return (
    <section
      aria-label="How we help"
      className="border-b border-border bg-muted"
    >
      <ul className="mx-auto grid w-full max-w-7xl grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li
            key={item.title}
            className="border-b border-r border-border px-4 py-3.5 sm:px-6 sm:py-4 [&:nth-child(2n)]:border-r-0 [&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0 lg:[&:nth-child(2n)]:border-r lg:last:border-r-0"
          >
            <p className="font-heading text-[0.9375rem] leading-snug font-semibold tracking-tight text-foreground">
              {item.title}
            </p>
            <p className="mt-0.5 text-[13px] leading-snug text-muted-foreground">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
