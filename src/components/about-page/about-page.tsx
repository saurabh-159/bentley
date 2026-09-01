import { FloatingContact } from "@/components/home-page/floating-contact";
import { AboutHero } from "./about-hero";
import { AboutStory } from "./about-story";
import { AboutValues } from "./about-values";
import { AboutWhatWeDo } from "./about-what-we-do";

export function AboutPage() {
  return (
    <>
      <main>
        <AboutHero />
        <AboutStory />
        <AboutValues />
        <AboutWhatWeDo />
      </main>
      <FloatingContact />
    </>
  );
}
