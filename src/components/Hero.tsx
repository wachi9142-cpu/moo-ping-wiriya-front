"use client";

import Image from "next/image";
import { owners, site } from "@/data/site";
import { useOpenNow } from "@/lib/useOpenNow";

// ขีดเล่น ๆ ข้างชื่อร้าน (แบบวาดมือ)
function Sparks({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={`h-10 w-10 text-caramel ${className}`} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden>
      <path d="M6 20h12M10 8l8 8M10 32l8-8" />
    </svg>
  );
}

export function Hero() {
  const status = useOpenNow();
  const main = owners[0];

  return (
    <section id="top" className="relative overflow-hidden bg-cream">
      {/* แถบครีมอ่อนเฉียง ๆ ด้านหลัง */}
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-[130%] -rotate-6 rounded-full bg-rice/15" />

      <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-10 md:pt-14">
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* ชื่อร้าน */}
          <div className="relative">
            <Sparks className="absolute -left-12 top-36 hidden rotate-180 lg:block" />
            <h1 className="font-display relative">
              <span className="block text-6xl font-bold leading-[1.4] text-pork md:text-7xl lg:text-8xl">หมูปิ้ง</span>
              <span className="block text-6xl font-bold leading-[1.4] text-caramel md:text-7xl lg:text-8xl">วิริญา</span>
              <Sparks className="absolute right-4 top-6 hidden md:block" />
            </h1>
            <p className="font-display mt-2 text-2xl font-bold text-caramel md:text-3xl">Wiriya Moo Ping</p>
            <p className="font-display mt-4 text-xl font-bold text-charcoal md:text-2xl">หมูปิ้งไม้ละ 5 บาท ข้าวเหนียวห่อละ 5 บาท</p>
            <p className="mt-1 text-ash">ย่างร้อน ๆ หอม ๆ อร่อยแบบบ้าน ๆ</p>
          </div>

          {/* รูปหมูปิ้ง */}
          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-warm shadow-2xl ring-8 ring-warm">
              <Image src="/images/moo-ping-leaf.jpg" alt="หมูปิ้งย่างใหม่ ๆ บนใบตอง" fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-charcoal/45 via-transparent to-transparent" />
              <p className="font-display absolute left-5 top-5 max-w-[60%] text-lg font-bold leading-relaxed text-cream drop-shadow md:text-xl">
                หมูปิ้งร้อน ๆ
                <br />
                ข้าวเหนียวเหนียว ๆ
                <br />
                อร่อยลงตัว ♥
              </p>
            </div>
            <Sparks className="absolute -right-2 -top-6 hidden -rotate-45 md:block" />
          </div>
        </div>

        {/* สถานะร้าน */}
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl bg-leaf/15 px-5 py-4 text-sm text-charcoal ring-1 ring-leaf/30">
          <span className="font-display flex items-center gap-2 text-lg font-bold text-leaf">
            <span className={`h-3 w-3 rounded-full ${status?.open ? "bg-leaf" : "bg-caramel"}`} />
            {status === null ? "…" : status.open ? "กำลังขาย" : "ปิดแล้ววันนี้"}
          </span>
          <span className="hidden h-5 w-px bg-leaf/30 sm:block" />
          <span>🕓 เริ่มประมาณ {site.open} น.</span>
          <span className="hidden h-5 w-px bg-leaf/30 sm:block" />
          <span>🧺 ขายจนกว่าของจะหมด</span>
        </div>

        {/* โทรก่อนมา */}
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href={`tel:${main.phone}`}
            className="font-display inline-flex items-center justify-center gap-3 rounded-full bg-caramel px-8 py-4 text-2xl font-bold text-white shadow-lg shadow-caramel/40 transition hover:bg-caramel-deep"
          >
            📞 โทรสอบถามก่อนมา
          </a>
          <p className="text-sm leading-relaxed text-pork">
            หมูปิ้งมักหมดเร็วในแต่ละวัน
            <br />
            แนะนำให้โทรสอบถามก่อนเดินทางมานะคะ
          </p>
        </div>
      </div>
    </section>
  );
}
