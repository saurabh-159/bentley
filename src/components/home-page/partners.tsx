import { Reveal, RevealItem, RevealStagger } from "./reveal";

const partners = [
  { name: "Bentley Systems", role: "Infrastructure engineering" },
  { name: "Studio ARS", role: "Civil design" },
  { name: "CGS LABS", role: "Rail and road" },
  { name: "EDV Software", role: "Building services" },
] as const;

/**
 * Partners
 * Content: Synergic — Bentley Systems, Studio ARS, CGS LABS, EDV Software
 * UI: Bentley — quiet logo row on muted ground, no heavy "Partnering with" frame
 */
export function Partners() {
  return (
    <section className="border-y border-border bg-muted/60">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
        <Reveal>
          <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
            OEM partners
          </p>
        </Reveal>

        <RevealStagger className="mt-8 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
          {partners.map((partner) => (
            <RevealItem key={partner.name} className="min-w-0">
              <p className="font-heading text-xl font-semibold tracking-tight text-foreground/80 sm:text-2xl">
                {partner.name}
              </p>
              <p className="mt-1 text-xs tracking-[0.12em] text-muted-foreground uppercase">
                {partner.role}
              </p>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
