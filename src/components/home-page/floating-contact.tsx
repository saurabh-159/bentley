"use client";

import { Mail, Phone } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { contact } from "./nav-data";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.05 4.91A9.91 9.91 0 0 0 12.04 2C6.55 2 2.08 6.45 2.08 11.93c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a10 10 0 0 0 4.79 1.22h.01c5.49 0 9.96-4.45 9.96-9.93a9.86 9.86 0 0 0-2.96-7Zm-7.01 15.27h-.01a8.27 8.27 0 0 1-4.21-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.71-8.24 8.28-8.24 2.21 0 4.29.86 5.85 2.42a8.18 8.18 0 0 1 2.42 5.83c0 4.55-3.71 8.25-8.28 8.25Zm4.54-6.18c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.84-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.10-.23-.17-.48-.29Z" />
    </svg>
  );
}

const actions = [
  {
    label: "Call",
    href: contact.phoneHref,
    icon: Phone,
  },
  {
    label: "Email",
    href: contact.emailHref,
    icon: Mail,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/919849007830",
    icon: WhatsAppIcon,
    external: true,
  },
] as const;

/**
 * Floating contact
 * Content: Synergic — Call, Email, WhatsApp
 * UI: Bentley — small edge cluster, not a large always-on chat stack
 */
export function FloatingContact() {
  return (
    <div className="pointer-events-none fixed top-1/2 right-0 z-40 -translate-y-1/2 pr-0">
      <div className="pointer-events-auto flex flex-col border-y border-l border-border bg-background shadow-[0_12px_32px_-18px_rgba(15,15,15,0.35)]">
        {actions.map((item) => (
          <Tooltip key={item.label}>
            <TooltipTrigger
              render={
                <a
                  href={item.href}
                  {...("external" in item
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  aria-label={item.label}
                  className="flex size-11 items-center justify-center border-b border-border text-foreground/75 last:border-b-0 transition-colors hover:bg-brand hover:text-brand-foreground"
                />
              }
            >
              <item.icon className="size-4" />
            </TooltipTrigger>
            <TooltipContent side="left" sideOffset={10}>
              {item.label}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
