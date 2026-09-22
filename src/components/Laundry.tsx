import Image from "next/image";
import { laundry } from "@/data/site";
import { SectionTitle } from "./SectionTitle";

export function Laundry() {
  const { coinExchange, support } = laundry;

  return (
    <section id="laundry" className="bg-leaf/10 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle sub={laundry.intro}>🧺 {laundry.title}</SectionTitle>

        <p className="mx-auto mb-6 max-w-xl rounded-full bg-warm px-4 py-2 text-center text-sm font-semibold text-pork ring-1 ring-rice">
          {laundry.separateNote}
        </p>

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
            {/* เครื่องซักผ้า — แยกจากจุดแลกเหรียญให้ชัด */}
            <div className="rounded-3xl bg-warm p-5 ring-1 ring-leaf/40">
              <p className="font-display text-lg font-bold text-charcoal">🧺 เครื่องซักผ้าหยอดเหรียญ</p>
              <p className="mt-1 text-xs text-ash">{laundry.hoursNote}</p>
              <p className="mt-3 text-xs font-semibold text-ash">💰 ราคา</p>
              <ul className="mt-1 space-y-1.5 text-sm text-charcoal">
                {laundry.prices.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
            {/* จุดแลกเหรียญ — เวลาเป็นของร้านวิของชำ ไม่ใช่ของเครื่อง */}
            <div className="rounded-3xl bg-warm p-5 ring-1 ring-leaf/40">
              <p className="font-display text-lg font-bold text-charcoal">🪙 {coinExchange.title}</p>
              <p className="mt-1 text-sm text-charcoal">{coinExchange.text}</p>
              <p className="mt-2 text-sm text-ash">
                {coinExchange.place}เปิด: <span className="font-semibold text-charcoal">🕠 {coinExchange.hours}</span>
              </p>
              <p className="mt-2 rounded-xl bg-caramel/10 px-3 py-2 text-xs leading-relaxed text-ash">⚠️ {coinExchange.warning}</p>
            </div>
          </div>
        </div>

        {/* แจ้งปัญหา 2 ทาง */}
        <div className="mt-6 rounded-3xl bg-warm p-6 ring-1 ring-rice/50">
          <p className="font-display text-lg font-bold text-charcoal">🛠️ หากเครื่องซักผ้ามีปัญหา</p>
          <p className="mt-1 text-sm leading-relaxed text-ash">{support.intro}</p>
          <ol className="mt-4 grid gap-3 sm:grid-cols-2">
            {support.ways.map((w) => (
              <li key={w.step} className="flex gap-3 rounded-2xl bg-cream p-4 ring-1 ring-rice/40">
                <span className="font-display grid h-9 w-9 shrink-0 place-items-center rounded-full bg-pork text-lg font-bold text-cream">{w.step}</span>
                <span className="min-w-0">
                  <span className="font-display block font-bold text-charcoal">{w.title}</span>
                  <span className="block text-sm text-ash">{w.text}</span>
                  {w.step === "2" && (
                    <a href={`tel:${support.owner.phone}`} className="mt-2 inline-flex items-center gap-2 rounded-full bg-caramel px-4 py-2 text-sm font-semibold text-white shadow-md shadow-caramel/30 hover:bg-caramel-deep">
                      📞 {support.owner.name} {support.owner.phoneDisplay}
                    </a>
                  )}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs leading-relaxed text-ash">{support.note}</p>
        </div>
      </div>
    </section>
  );
}
