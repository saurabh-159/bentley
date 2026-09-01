import type { Metadata } from "next";
import { AboutPage } from "@/components/about-page/about-page";

export const metadata: Metadata = {
  title: "About Us | Synergic Information Solutions",
  description:
    "Synergic is a leading system integrator in India. CAD solutions for architecture, civil, and mechanical engineering since 2008 — 1,900+ customers from Hyderabad.",
};

export default function AboutRoute() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <AboutPage />
    </div>
  );
}
