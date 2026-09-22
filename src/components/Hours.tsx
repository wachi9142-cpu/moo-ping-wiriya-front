import { details, site } from "@/data/site";

export function Hours() {
  return (
    <section id="hours" className="mx-auto max-w-6xl px-4 pb-6 pt-20">
      <div className="mx-auto max-w-2xl overflow-hidden rounded-[2rem] bg-warm shadow-xl ring-4 ring-rice/50">
        <div className="bg-pork px-6 py-6 text-center text-cream">
          <p className="font-display text-2xl font-bold text-cream">🕟 เริ่มขายตั้งแต่ตี 4 ครึ่ง</p>
          <p className="mt-1 text-sm text-cream/85">
            โดยทั่วไปขายช่วงเช้าประมาณ {site.open}–{site.closeApprox} น. — ขายจนกว่าหมูปิ้งจะหมด
          </p>
        </div>
        <ul className="divide-y divide-rice/30 px-6 py-2">
          {details.map((d) => (
            <li key={d} className="py-3 text-sm text-charcoal">
              {d}
            </li>
          ))}
        </ul>
        <div className="space-y-1 bg-warm px-6 py-5 text-center">
          <p className="font-display font-bold text-pork">🔥 ย่างไปขายไป หมดแล้วหมดเลยน้า</p>
          <p className="text-xs text-ash">หมูปิ้งมีจำนวนจำกัดและอาจหมดเร็วกว่าปกติ หากต้องการความแน่นอนควรโทรถามร้านก่อนมา</p>
        </div>
      </div>
    </section>
  );
}
