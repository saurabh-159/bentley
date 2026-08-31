import { cn } from "@/lib/utils";

export function SectionHeading({
  label,
  title,
  description,
  action,
  className,
  dark = false,
}: {
  label: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
        className
      )}
    >
      <div className="max-w-3xl">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
          {label}
        </p>
        <h2
          className={cn(
            "mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]",
            dark ? "text-background" : "text-foreground"
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "mt-4 max-w-xl text-base leading-7",
              dark ? "text-background/70" : "text-muted-foreground"
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
