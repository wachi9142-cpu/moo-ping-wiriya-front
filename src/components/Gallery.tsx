"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { photoSlots, type PhotoSlot } from "@/data/site";
import { SectionTitle } from "./SectionTitle";

const STORAGE_KEY = "wiriya-photos";

type Custom = { src: string; caption: string };

function readCustom(): Record<string, Custom> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

// ย่อรูปจากมือถือให้เล็กลงก่อนเก็บ (localStorage มีที่จำกัด)
function fileToDataUrl(file: File, max = 1400, quality = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      c.getContext("2d")?.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL("image/jpeg", quality));
    };
    img.onerror = reject;
    img.src = url;
  });
}

// แกลเลอรีแบบมีช่องชื่อ: ช่องที่มีรูปจากร้านแล้วจะโชว์รูป ช่องว่างจะขึ้นปุ่ม "＋ เพิ่มภาพ…"
// รูปที่เพิ่มเองเก็บไว้ในเบราว์เซอร์เครื่องนั้น (localStorage)
export function Gallery() {
  const [custom, setCustom] = useState<Record<string, Custom>>({});
  const [open, setOpen] = useState<Custom | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const target = useRef<PhotoSlot | null>(null);

  useEffect(() => {
    const id = setTimeout(() => setCustom(readCustom()), 0);
    return () => clearTimeout(id);
  }, []);

  const save = (next: Record<string, Custom>) => {
    setCustom(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      alert("พื้นที่เก็บรูปในเบราว์เซอร์เต็ม ลองลบรูปเก่าก่อนนะ");
    }
  };

  const pickFor = (slot: PhotoSlot) => {
    target.current = slot;
    fileRef.current?.click();
  };

  const onFile = async (f?: File) => {
    const slot = target.current;
    if (!f || !slot) return;
    setBusy(slot.id);
    try {
      const src = await fileToDataUrl(f);
      const caption = prompt("คำบรรยายรูป (เว้นว่างได้)", slot.label) ?? slot.label;
      save({ ...custom, [slot.id]: { src, caption: caption.trim() || slot.label } });
    } finally {
      setBusy(null);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const remove = (slot: PhotoSlot) => {
    if (!confirm(`ลบรูป "${slot.label}" ที่เพิ่มไว้?`)) return;
    const next = { ...custom };
    delete next[slot.id];
    save(next);
  };

  return (
    <section id="gallery" className="bg-cream py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle sub="รูปจริงจากหน้าร้าน — แตะที่รูปเพื่อดูใกล้ ๆ หรือกด ＋ เพื่อเพิ่มรูปของคุณเอง">🏪 ร้านของเรา</SectionTitle>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => onFile(e.target.files?.[0])} />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {photoSlots.map((slot) => {
            const up = custom[slot.id];
            const src = up?.src ?? slot.src;
            const caption = up?.caption ?? slot.caption ?? slot.label;
            return (
              <figure key={slot.id} className="group overflow-hidden rounded-2xl bg-warm shadow-sm ring-1 ring-rice/40">
                {src ? (
                  <div className="relative">
                    <button type="button" onClick={() => setOpen({ src, caption })} className="block w-full cursor-zoom-in">
                      {up ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={src} alt="" className="aspect-[4/3] w-full bg-cream object-cover" />
                      ) : (
                        <Image
                          src={src}
                          alt=""
                          width={600}
                          height={450}
                          sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 50vw"
                          className="aspect-[4/3] w-full bg-cream object-cover"
                        />
                      )}
                    </button>
                    {/* ปุ่มจัดการรูป — ลอยมุมขวาบน ไม่เบียดคำบรรยาย */}
                    <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition group-hover:opacity-100 focus-within:opacity-100 max-md:opacity-100">
                      <button
                        type="button"
                        onClick={() => pickFor(slot)}
                        className="rounded-full bg-charcoal/70 px-2.5 py-1 text-[11px] font-semibold text-cream backdrop-blur-sm hover:bg-charcoal"
                      >
                        เปลี่ยน
                      </button>
                      {up && (
                        <button
                          type="button"
                          onClick={() => remove(slot)}
                          className="rounded-full bg-charcoal/70 px-2.5 py-1 text-[11px] font-semibold text-cream backdrop-blur-sm hover:bg-caramel-deep"
                        >
                          ลบ
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => pickFor(slot)}
                    disabled={busy === slot.id}
                    className="grid aspect-[4/3] w-full place-items-center border-2 border-dashed border-caramel/50 bg-caramel/5 px-3 text-center transition hover:bg-caramel/10"
                  >
                    <span>
                      <span className="block text-3xl">{busy === slot.id ? "⏳" : slot.emoji}</span>
                      <span className="mt-1.5 block text-xs font-semibold leading-snug text-pork">＋ เพิ่มภาพ</span>
                    </span>
                  </button>
                )}
                <figcaption className="px-3 py-2.5">
                  <p className="font-display text-sm font-bold leading-[1.9] text-pork">
                    {slot.emoji} {slot.label}
                  </p>
                  <p className="mt-0.5 text-xs leading-[1.8] text-ash">{src ? caption : "ยังไม่มีรูป"}</p>
                </figcaption>
              </figure>
            );
          })}
        </div>
        <p className="mt-5 text-center text-xs text-ash">รูปที่เพิ่มเองจะถูกเก็บไว้ในเครื่องนี้เท่านั้น</p>
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
          <div className="relative min-h-0 flex-1 p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={open.src} alt={open.caption} className="h-full w-full object-contain" />
          </div>
          <p className="bg-warm px-5 py-4 text-center text-sm text-charcoal">{open.caption}</p>
        </div>
      )}
    </section>
  );
}
