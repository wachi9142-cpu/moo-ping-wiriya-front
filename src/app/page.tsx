import { CallFirst } from "@/components/CallFirst";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Hours } from "@/components/Hours";
import { Laundry } from "@/components/Laundry";
import { Location } from "@/components/Location";
import { Menu } from "@/components/Menu";
import { Reviews } from "@/components/Reviews";
import { owners, site } from "@/data/site";

export default function Home() {
  return (
    <main>
      <Hero />
      <Menu />
      <Gallery />
      <Hours />
      <section className="mx-auto max-w-6xl px-4 pb-4">
        <CallFirst
          className="mx-auto max-w-2xl"
          text={site.callFirst}
          phones={owners.map((o) => ({ label: o.name, phone: o.phone, phoneDisplay: o.phoneDisplay }))}
        />
      </section>
      <Location />
      <Laundry />
      <Reviews />
    </main>
  );
}
