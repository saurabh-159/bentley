import {
  About,
  Cta,
  FloatingContact,
  Hero,
  Partners,
  Products,
  Resources,
  Solutions,
  Stats,
} from "@/components/home-page";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <main className="flex-1">
        <Hero />
        <About />
        <Products />
        <Stats />
        <Solutions />
        <Partners />
        <Resources />
        <Cta />
      </main>
      <FloatingContact />
    </div>
  );
}
