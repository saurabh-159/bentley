import { About } from "./about";
import { Cta } from "./cta";
import { FloatingContact } from "./floating-contact";
import { Hero } from "./hero";
import { Partners } from "./partners";
import { Products } from "./products";
import { Resources } from "./resources";
import { Solutions } from "./solutions";
import { Stats } from "./stats";

export function HomePage() {
  return (
    <>
      <main>
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
    </>
  );
}
