import Image from "next/image";
import { menu } from "@/data/site";
import { SectionTitle } from "./SectionTitle";

const tips = [
  { emoji: "🧮", title: "ตัวอย่างราคา", text: "หมูปิ้ง 10 ไม้ + ข้าวเหนียว 2 ห่อ = 60 บาท" },
  { emoji: "🧾", title: "จ่ายง่าย", text: "รับเงินสดและสแกนจ่ายที่หน้าร้าน" },
  { emoji: "🛍️", title: "ซื้อฝากได้", text: "ใส่ถุงพร้อมกิน ซื้อไปฝากที่ทำงานหรือใส่บาตรตอนเช้า" },
];

export function Menu() {
  return (
    <section id="menu" className="mx-auto max-w-6xl px-4 py-20">
      <SectionTitle sub="ร้านขายหลัก ๆ แค่ 2 อย่าง — ย่างสดหน้าร้านทุกเช้า">🍢 เมนูและราคา</SectionTitle>
      <div className="grid gap-6 md:grid-cols-2">
        {menu.map((m) => (
          <article key={m.name} className="flex gap-5 overflow-hidden rounded-3xl bg-warm p-4 shadow-md ring-1 ring-rice/40">
            <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl sm:h-40 sm:w-40">
              <Image src={m.image} alt={m.name} fill sizes="160px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-2xl font-bold text-charcoal">{m.name}</h3>
                {m.badge && <span className="rounded-full bg-caramel px-2.5 py-0.5 text-xs font-semibold text-white">{m.badge}</span>}
              </div>
              <p className="font-display mt-1 text-3xl font-bold text-pork">
                {m.price} <span className="text-base font-semibold text-ash">{m.unit}</span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ash">{m.desc}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {tips.map((t) => (
          <div key={t.title} className="rounded-2xl bg-warm p-4 ring-1 ring-rice/40">
            <p className="font-display font-bold text-charcoal">
              {t.emoji} {t.title}
            </p>
            <p className="mt-1 text-sm text-ash">{t.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
