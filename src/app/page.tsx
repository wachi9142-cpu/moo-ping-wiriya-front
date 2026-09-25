import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Hours } from "@/components/Hours";
import { Laundry } from "@/components/Laundry";
import { Location } from "@/components/Location";
import { Menu } from "@/components/Menu";
import { Reviews } from "@/components/Reviews";

export default function Home() {
  return (
    <main>
      <Hero />
      <Menu />
      <section id="shop">
        <Gallery />
        <Location />
      </section>
      <Hours />
      <section className="mx-auto grid max-w-6xl items-start gap-6 px-4 py-10 lg:grid-cols-2">
        <Reviews />
        <Laundry />
      </section>
    </main>
  );
}
