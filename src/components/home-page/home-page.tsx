import { About } from "./about";
import { Industries } from "./industries";
import { Cta } from "./cta";
import { FloatingContact } from "./floating-contact";
import { Hero } from "./hero";
import { Products } from "./products";
import { Resources } from "./resources";
import { Solutions } from "./solutions";
import { Stats } from "./stats";
import { TechnologyFoundation } from "./technology-foundation";

export function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Industries />
        <TechnologyFoundation />
        <Products />
        <Stats />
        <Solutions />
        <Resources />
        <Cta />
      </main>
      <FloatingContact />
    </>
  );
}
