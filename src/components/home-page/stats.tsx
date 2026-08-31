import { Reveal, RevealItem, RevealStagger } from "./reveal";

const stats = [
  { value: "25+", label: "Products" },
  { value: "6", label: "Solutions" },
  { value: "1,900+", label: "Customers" },
  { value: "17 yrs", label: "In market" },
] as const;

/**
 * Stats
 * Content: Synergic — products, solutions, 1500+ customers, satisfaction
 * UI: Bentley — large numerals on a dark band, short labels, no cartoon counters
 */
export function Stats() {
  return (
    <section className="bg-foreground text-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <RevealStagger className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-x-0">
          {stats.map((item) => (
            <RevealItem
              key={item.label}
              className="lg:border-l lg:border-background/10 lg:px-8 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
            >
              <p className="font-heading text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                {item.value}
              </p>
              <p className="mt-3 text-[11px] font-semibold tracking-[0.18em] text-background/55 uppercase">
                {item.label}
              </p>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
