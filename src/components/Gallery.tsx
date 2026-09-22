"use client";

import Image from "next/image";
import { useState } from "react";
import { gallery, type Photo } from "@/data/site";
import { SectionTitle } from "./SectionTitle";

// รูปจริงจากหน้าร้าน แตะเพื่อดูรูปใหญ่
export function Gallery() {
  const [open, setOpen] = useState<Photo | null>(null);

  return (
    <section id="gallery" className="bg-warm py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle sub="รูปจริงจากหน้าร้าน — แตะที่รูปเพื่อดูใกล้ ๆ">📸 บรรยากาศหน้าร้าน</SectionTitle>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {gallery.map((p, i) => (
            <figure key={p.src} className={`overflow-hidden rounded-2xl bg-warm ring-1 ring-rice/40 ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
              <button type="button" onClick={() => setOpen(p)} className="block w-full cursor-zoom-in">
                <Image
                  src={p.src}
                  alt={p.caption}
                  width={i === 0 ? 1200 : 600}
                  height={i === 0 ? 900 : 450}
                  sizes={i === 0 ? "(min-width: 768px) 560px, 100vw" : "(min-width: 768px) 280px, 50vw"}
                  className="aspect-[4/3] w-full object-cover transition hover:scale-[1.03]"
                />
              </button>
              <figcaption className="truncate px-3 py-2 text-xs text-ash">{p.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-charcoal/95 backdrop-blur-sm" onClick={() => setOpen(null)}>
          <button
            type="button"
            onClick={() => setOpen(null)}
            aria-label="ปิด"
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-warm text-lg text-charcoal shadow ring-1 ring-rice"
          >
            ✕
          </button>
          <div className="relative min-h-0 flex-1">
            <Image src={open.src} alt={open.caption} fill sizes="100vw" className="object-contain" />
          </div>
          <p className="bg-warm px-5 py-4 text-center text-sm text-charcoal">{open.caption}</p>
        </div>
      )}
    </section>
  );
}
