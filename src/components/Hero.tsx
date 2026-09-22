import Image from "next/image";
import type { CSSProperties } from "react";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-cream">
      {/* ควันจากเตาลอยเบา ๆ */}
      <span className="animate-smoke absolute left-10 top-16 text-2xl text-ash">〰</span>
      <span className="animate-smoke absolute left-16 top-12 text-2xl text-ash" style={{ animationDelay: ".8s" }}>〰</span>
      <span
        className="animate-float absolute bottom-32 left-1/3 text-2xl opacity-60"
        style={{ "--r": "20deg", animationDelay: "1s" } as CSSProperties}
      >
        🍃
      </span>

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-12 md:grid-cols-2 md:pt-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-warm px-3 py-1 text-xs font-semibold text-pork ring-1 ring-rice">
            🕟 เริ่มขายตี 4 ครึ่ง • ขายจนกว่าจะหมด
          </span>
          <h1 className="font-display mt-4 text-4xl font-bold leading-[1.6] text-pork md:text-6xl">
            <span className="block text-5xl leading-[1.5] text-caramel md:text-7xl">หมูปิ้ง</span>
            <span className="mt-2 block">ข้าวเหนียว</span>
            <span className="mt-3 block text-2xl leading-[1.6] text-charcoal md:text-3xl">วิริญา</span>
            <span className="mt-2 block text-base leading-[1.6] font-semibold text-pork">Wiriya <span className="text-caramel">Moo Ping</span></span>
          </h1>
          <p className="font-display mt-4 text-lg font-semibold text-charcoal">ย่างสด ๆ หน้าร้าน หอมควันถ่าน ไม้ละ 5 บาท 🍢🔥</p>
          <p className="mt-3 max-w-md leading-relaxed text-ash">
            หมูหมักสูตรร้าน ย่างบนเตาถ่านทีละไม้ตั้งแต่เช้ามืด กินคู่ข้าวเหนียวร้อน ๆ ห่อละ 5 บาท ซื้อกี่ไม้ก็ได้ อิ่มง่าย ราคาเบา ๆ
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#menu" className="rounded-full bg-caramel px-6 py-3 font-semibold text-white shadow-lg shadow-caramel/40 transition hover:bg-caramel-deep">
              🍢 ดูเมนูและราคา
            </a>
            <a href="#location" className="rounded-full bg-warm px-6 py-3 font-semibold text-pork ring-1 ring-rice transition hover:bg-white">
              📍 ร้านอยู่ที่ไหน
            </a>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-sm">
            <span className="font-display rounded-full bg-pork px-4 py-1.5 text-lg font-bold text-cream shadow">หมูปิ้ง ไม้ละ 5.-</span>
            <span className="font-display rounded-full bg-warm px-4 py-1.5 text-lg font-bold text-charcoal ring-1 ring-rice shadow">ข้าวเหนียว ห่อละ 5.-</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute inset-0 -rotate-6 rounded-[2.5rem] bg-rice/50" />
          <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-warm shadow-2xl ring-4 ring-caramel/50">
            <Image
              src="/images/moo-ping-leaf.jpg"
              alt="หมูปิ้งย่างใหม่ ๆ บนใบตอง"
              fill
              priority
              sizes="(min-width: 768px) 384px, 90vw"
              className="object-cover"
            />
          </div>
          <span className="font-display absolute -bottom-4 -right-2 rotate-6 rounded-2xl bg-caramel px-4 py-2 text-xl font-bold text-white shadow-lg">
            ไม้ละ 5.-
          </span>
        </div>
      </div>

      <span className="sr-only">{site.tagline}</span>
    </section>
  );
}
