"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  companyLinks,
  categoryLinks,
  contact,
  productGroups,
  solutions,
} from "./nav-data";
import { SiteLogo } from "./site-logo";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1Z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M14.7 10.3 22 2h-2.2l-6.3 7.2L8.4 2H2l7.7 11.1L2 22h2.2l6.8-7.8L15.6 22H22l-7.3-11.7Zm-2.4 2.7-.8-1.1L5.1 3.5h2.6l5.1 7.3.8 1.1 6.6 9.5h-2.6l-5.3-7.4Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M6.5 9H4V20h2.5V9ZM5.3 4C4.5 4 3.8 4.7 3.8 5.5S4.5 7 5.3 7s1.5-.7 1.5-1.5S6.1 4 5.3 4ZM20 20h-2.5v-5.6c0-1.6-.6-2.6-2-2.6-1.1 0-1.7.7-2 1.4-.1.2-.1.6-.1.9V20H11V9h2.4v1.5c.5-.8 1.5-1.8 3.5-1.8 2.5 0 4.1 1.6 4.1 5.1V20Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm8 1.8H8A3.2 3.2 0 0 0 4.8 8v8A3.2 3.2 0 0 0 8 19.2h8A3.2 3.2 0 0 0 19.2 16V8A3.2 3.2 0 0 0 16 4.8ZM12 8.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2Zm0 1.6A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8Zm4.7-2.9a.9.9 0 1 1-.9.9.9.9 0 0 1 .9-.9Z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M22.5 7.2a3 3 0 0 0-2.1-2.1C18.6 4.7 12 4.7 12 4.7s-6.6 0-8.4.4A3 3 0 0 0 1.5 7.2 31 31 0 0 0 1.1 12a31 31 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.8.4 8.4.4 8.4.4s6.6 0 8.4-.4a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .4-4.8 31 31 0 0 0-.4-4.8ZM10 15.2V8.8L15.5 12 10 15.2Z" />
    </svg>
  );
}

const footerInputClass =
  "h-10 rounded-none border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:border-brand focus-visible:ring-brand/30";

const socials = [
  { label: "Facebook", href: "https://www.facebook.com", icon: FacebookIcon },
  { label: "Twitter", href: "https://www.twitter.com", icon: XIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: LinkedInIcon },
  { label: "Instagram", href: "https://www.instagram.com", icon: InstagramIcon },
  { label: "YouTube", href: "https://www.youtube.com", icon: YouTubeIcon },
] as const;

export function Footer() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toast.success("Message sent. We'll get back to you shortly.");
    event.currentTarget.reset();
  }

  const productLinks = productGroups.flatMap((group) => group.items).slice(0, 8);

  return (
    <footer id="contact" className="border-t border-border bg-background text-foreground">
      <div className="h-0.5 bg-brand" />

      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:py-16">
        <div className="lg:col-span-3">
          <SiteLogo />
          <p className="mt-5 max-w-xs text-sm leading-6 text-muted-foreground">
            CAD and engineering software for architecture, civil, and mechanical
            teams across India. Trusted partner since 2008.
          </p>
          <div className="mt-6 flex items-center gap-2">
            {socials.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="flex size-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand"
              >
                <item.icon className="size-3.5" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            Categories
          </p>
          <ul className="mt-4 space-y-2.5">
            {categoryLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/categories"
                className="text-sm font-medium text-brand transition-colors hover:text-brand/80"
              >
                All categories
              </Link>
            </li>
          </ul>
          <p className="mt-8 text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            Products
          </p>
          <ul className="mt-4 space-y-2.5">
            {productLinks.slice(0, 5).map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/products"
                className="text-sm font-medium text-brand transition-colors hover:text-brand/80"
              >
                All products
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            Solutions
          </p>
          <ul className="mt-4 space-y-2.5">
            {solutions.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            Company
          </p>
          <ul className="mt-4 space-y-2.5">
            {companyLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            Get in touch
          </p>
          <ul className="mt-4 space-y-3 text-sm text-foreground/70">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
              <span className="leading-6">{contact.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="size-4 shrink-0 text-brand" />
              <a href={contact.phoneHref} className="hover:text-foreground">
                {contact.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="size-4 shrink-0 text-brand" />
              <a href={contact.emailHref} className="hover:text-foreground">
                {contact.email}
              </a>
            </li>
          </ul>

          <form onSubmit={handleSubmit} className="mt-8 space-y-3">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              Send a message
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="footer-name" className="sr-only">
                  Name
                </Label>
                <Input
                  id="footer-name"
                  name="name"
                  required
                  placeholder="Name"
                  className={footerInputClass}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="footer-email" className="sr-only">
                  Email
                </Label>
                <Input
                  id="footer-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  className={footerInputClass}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="footer-phone" className="sr-only">
                Contact number
              </Label>
              <Input
                id="footer-phone"
                name="phone"
                type="tel"
                required
                placeholder="Contact no"
                className={footerInputClass}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="footer-message" className="sr-only">
                Message
              </Label>
              <Textarea
                id="footer-message"
                name="message"
                required
                rows={4}
                placeholder="Message"
                className="min-h-24 rounded-none border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:border-brand focus-visible:ring-brand/30"
              />
            </div>
            <Button
              type="submit"
              className="h-10 rounded-none bg-brand px-6 text-[11px] font-semibold tracking-[0.16em] text-brand-foreground uppercase hover:bg-brand/90"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Synergic Information Solutions. All rights reserved.</p>
          <p>Hyderabad, India</p>
        </div>
      </div>
    </footer>
  );
}
