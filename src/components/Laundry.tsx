import Image from "next/image";
import { laundry } from "@/data/site";
import { SectionTitle } from "./SectionTitle";

export function Laundry() {
  return (
    <section id="laundry" className="bg-leaf/10 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle sub={laundry.intro}>🧺 {laundry.title}</SectionTitle>

        <div className="grid gap-6 md:grid-cols-[3fr_2fr]">
          <Image
            src={laundry.image}
            alt={laundry.title}
            width={1200}
            height={900}
            sizes="(min-width: 768px) 640px, 100vw"
            className="aspect-[4/3] w-full rounded-3xl object-cover ring-1 ring-leaf/40"
          />
          <div className="grid gap-4">
            <div className="rounded-3xl bg-warm p-5 ring-1 ring-leaf/40">
              <p className="font-display text-lg font-bold text-charcoal">🧺 เครื่องซักผ้า</p>
              <ul className="mt-2 space-y-1.5 text-sm text-ash">
                {laundry.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-warm p-5 ring-1 ring-leaf/40">
              <p className="font-display text-lg font-bold text-charcoal">🪙 จุดแลกเหรียญ 10 บาท</p>
              <ul className="mt-2 space-y-1.5 text-sm text-ash">
                <li>📍 {laundry.coinExchange.place}</li>
                <li>🕠 {laundry.coinExchange.hours}</li>
              </ul>
              <p className="mt-2 rounded-xl bg-caramel/10 px-3 py-2 text-xs leading-relaxed text-ash">⚠️ {laundry.coinExchange.warning}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-3xl bg-warm p-6 ring-1 ring-rice/50">
          <p className="font-display text-lg font-bold text-charcoal">🔧 เครื่องซักผ้ามีปัญหา?</p>
          <p className="mt-1 text-sm leading-relaxed text-ash">{laundry.support.intro}</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {laundry.support.owners.map((o) => (
              <li key={o.phone}>
                <a href={`tel:${o.phone}`} className="flex items-center gap-3 rounded-2xl bg-warm px-4 py-3 ring-1 ring-rice/40 transition hover:bg-rice/10">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-caramel/15 text-2xl">📞</span>
                  <span className="min-w-0">
                    <span className="block text-xs text-ash">{o.name} — เจ้าของเครื่อง</span>
                    <span className="font-display text-lg font-bold text-caramel">{o.phoneDisplay}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-relaxed text-ash">
            หากไม่สะดวกติดต่อเจ้าของเครื่อง สามารถแจ้งที่ {laundry.support.fallback.place} (ร้านข้าง ๆ) ได้เช่นกัน —{" "}
            <a href={`tel:${laundry.support.fallback.phone}`} className="font-semibold text-caramel">
              📞 {laundry.support.fallback.phoneDisplay}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
