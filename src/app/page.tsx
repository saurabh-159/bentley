import {
  About,
  Cta,
  FloatingContact,
  Hero,
  Industries,
  Products,
  Resources,
  Services,
  Solutions,
  Stats,
  TechnologyAdvisory,
  TechnologyFoundation,
  ValueBar,
} from "@/components/home-page";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <main className="flex-1">
        <Hero />
        <ValueBar />
        <About />
        <Industries />
        <TechnologyFoundation />
        <TechnologyAdvisory />
        <Products />
        <Stats />
        <Solutions />
        <Services />
        <Resources />
        <Cta />
      </main>
      <FloatingContact />
    </div>
  );
}
