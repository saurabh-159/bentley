import Link from "next/link";

export function SiteLogo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span className="flex size-10 shrink-0 items-center justify-center bg-brand">
        <span className="font-heading text-base font-bold text-brand-foreground">
          S
        </span>
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span className="font-heading text-base font-semibold tracking-[0.18em] text-foreground">
          SYNERGIC
        </span>
        <span className="mt-1 hidden text-[10px] tracking-[0.18em] text-muted-foreground uppercase sm:block">
          Information Solutions
        </span>
      </span>
    </Link>
  );
}
