import Image from "next/image";
import { laundry } from "@/data/site";

// การ์ดเครื่องซักผ้าหยอดเหรียญ — โทนฟ้าอ่อนให้แยกจากร้านหมูปิ้งชัด ๆ
export function Laundry() {
  const { coinExchange, support } = laundry;

  return (
    <div id="laundry" className="flex flex-col rounded-[2rem] bg-sky-100/70 p-6 ring-1 ring-sky-200">
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-700 text-2xl text-white">🧺</span>
        <div>
          <h2 className="font-display text-2xl font-bold text-sky-900 md:text-3xl">{laundry.title}</h2>
          <p className="text-sm text-sky-900/70">บริการแยกจากร้านหมูปิ้ง</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-[1.2fr_1fr]">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
          <Image src={laundry.image} alt={laundry.title} fill sizes="(min-width: 768px) 320px, 100vw" className="object-cover" />
        </div>
        <div className="rounded-2xl bg-warm p-4 ring-1 ring-rice/40">
          <p className="font-display text-lg font-bold text-pork">ราคา</p>
          <ul className="mt-2 space-y-1.5 text-sm text-charcoal">
            {laundry.prices.map((p) => (
              <li key={p}>• {p.replace(/^\S+\s/, "")}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-ash">{laundry.hoursNote}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-4 ring-1 ring-sky-200">
          <p className="font-display flex items-center gap-2 text-lg font-bold text-sky-900">🪙 แลกเหรียญ 10 บาท</p>
          <p className="mt-1 text-sm text-charcoal">ได้ที่{coinExchange.place}</p>
          <p className="text-sm text-charcoal">({coinExchange.hours})</p>
          <p className="mt-3 text-xs text-ash">{coinExchange.warning}</p>
        </div>
        <div className="rounded-2xl bg-white p-4 ring-1 ring-sky-200">
          <p className="font-display flex items-center gap-2 text-lg font-bold text-sky-900">⚠️ หากเครื่องซักผ้ามีปัญหา</p>
          <p className="mt-1 text-sm text-charcoal">แจ้งได้ที่{support.ways[0].title.replace("แจ้ง", "")}</p>
          <p className="text-sm text-charcoal">หรือโทรแจ้งเจ้าของบ้านโดยตรง</p>
          <a href={`tel:${support.owner.phone}`} className="mt-3 inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm font-bold text-sky-900 ring-1 ring-sky-300 hover:bg-sky-200">
            📞 {support.owner.name} {support.owner.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}
