import Image from "next/image";
import { menu } from "@/data/site";

// ป้ายราคาแบบปาดพู่กัน
function PriceBrush({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-display inline-block -rotate-1 rounded-[1.4rem_0.7rem_1.5rem_0.6rem] bg-caramel px-6 py-2 text-2xl font-bold text-white shadow-md shadow-caramel/30">
      {children}
    </span>
  );
}

const icons: Record<string, string> = { หมูปิ้ง: "🍢", ข้าวเหนียว: "🍚" };
const subs: Record<string, string> = { หมูปิ้ง: "หมูหมักสูตรพิเศษ\nย่างสด ๆ ทุกเช้า", ข้าวเหนียว: "ข้าวเหนียวเหนียวนุ่ม\nหอม อร่อย" };
const units: Record<string, string> = { หมูปิ้ง: "ไม้ละ", ข้าวเหนียว: "ห่อละ" };

export function Menu() {
  return (
    <section id="menu" className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-6 md:grid-cols-2">
        {menu.map((m) => (
          <article key={m.name} className="grid gap-5 rounded-[2rem] bg-warm p-4 shadow-lg shadow-pork/10 ring-1 ring-rice/40 sm:grid-cols-[1.1fr_1fr]">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem]">
              <Image src={m.image} alt={m.name} fill sizes="(min-width: 768px) 300px, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center py-2">
              <h3 className="font-display text-4xl font-bold text-pork">{m.name}</h3>
              <div className="mt-3">
                <PriceBrush>
                  {units[m.name]} {m.price} บาท
                </PriceBrush>
              </div>
              <p className="mt-5 flex items-start gap-2 whitespace-pre-line text-sm leading-relaxed text-charcoal">
                <span className="text-2xl">{icons[m.name]}</span>
                {subs[m.name]}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
