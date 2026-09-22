"use client";

import { details, site } from "@/data/site";
import { useOpenNow } from "@/lib/useOpenNow";

export function Hours() {
  const status = useOpenNow();

  return (
    <section id="hours" className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-6 overflow-hidden rounded-[2rem] bg-warm shadow-lg shadow-pork/10 ring-1 ring-rice/40 md:grid-cols-[1fr_1.4fr]">
        <div className="flex flex-col justify-center bg-pork p-8 text-cream">
          <p className="text-sm text-cream/80">🕓 เวลา/สถานะ</p>
          <p className="font-display mt-2 text-3xl font-bold">เริ่มขาย {site.open} น.</p>
          <p className="mt-1 text-cream/85">โดยทั่วไปถึงประมาณ {site.closeApprox} น. — ขายจนกว่าของจะหมด</p>
          <p className={`font-display mt-5 inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-lg font-bold ${status?.open ? "bg-leaf text-white" : "bg-cream text-pork"}`}>
            <span className={`h-3 w-3 rounded-full ${status?.open ? "bg-white" : "bg-caramel"}`} />
            {status === null ? "…" : status.open ? "ตอนนี้กำลังขาย" : "ตอนนี้ปิดแล้ว — เจอกันพรุ่งนี้เช้า"}
          </p>
        </div>
        <ul className="grid gap-2 p-6 sm:grid-cols-2">
          {details.map((d) => (
            <li key={d} className="rounded-2xl bg-cream px-4 py-3 text-sm text-charcoal ring-1 ring-rice/40">
              {d}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
