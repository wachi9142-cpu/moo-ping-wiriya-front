"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { photoSlots, type PhotoSlot } from "@/data/site";
import { deletePhoto, fetchAdminSession, fetchPhotos, uploadPhoto, type ApiPhoto } from "@/lib/api";
import { SectionTitle } from "./SectionTitle";

// ย่อรูปจากมือถือก่อนอัปโหลด ให้ไฟล์เล็กลงและอัปเร็วขึ้น
function shrink(file: File, max = 1600, quality = 0.82): Promise<File> {
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
      c.toBlob(
        (blob) => (blob ? resolve(new File([blob], "photo.jpg", { type: "image/jpeg" })) : reject(new Error("ย่อรูปไม่สำเร็จ"))),
        "image/jpeg",
        quality,
      );
    };
    img.onerror = reject;
    img.src = url;
  });
}

type Opened = { src: string; caption: string };

// แกลเลอรีแบบมีช่องชื่อ — รูปที่แอดมินอัปโหลดเก็บบนเซิร์ฟเวอร์ ทุกคนที่เปิดเว็บเห็นเหมือนกัน
// ปุ่มเพิ่ม/เปลี่ยน/ลบ จะโผล่เฉพาะตอนล็อกอินแอดมินไว้ (ที่หน้า /admin)
export function Gallery() {
  const [uploaded, setUploaded] = useState<Record<string, ApiPhoto>>({});
  const [admin, setAdmin] = useState(false);
  const [open, setOpen] = useState<Opened | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const target = useRef<PhotoSlot | null>(null);

  useEffect(() => {
    fetchPhotos().then(setUploaded).catch(() => {});
    fetchAdminSession().then(setAdmin).catch(() => {});
  }, []);

  const pickFor = (slot: PhotoSlot) => {
    target.current = slot;
    fileRef.current?.click();
  };

  const onFile = async (f?: File) => {
    const slot = target.current;
    if (!f || !slot) return;
    setBusy(slot.id);
    setError(null);
    try {
      const caption = prompt("คำบรรยายรูป (เว้นว่างได้)", slot.label) ?? slot.label;
      const photo = await uploadPhoto(slot.id, await shrink(f), caption.trim() || slot.label);
      setUploaded((prev) => ({ ...prev, [slot.id]: photo }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "อัปโหลดไม่สำเร็จ");
    } finally {
      setBusy(null);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const remove = async (slot: PhotoSlot) => {
    if (!confirm(`ลบรูป "${slot.label}" ที่อัปโหลดไว้?`)) return;
    setBusy(slot.id);
    setError(null);
    try {
      await deletePhoto(slot.id);
      setUploaded((prev) => {
        const next = { ...prev };
        delete next[slot.id];
        return next;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "ลบไม่สำเร็จ");
    } finally {
      setBusy(null);
    }
  };

  return (
    <section id="gallery" className="bg-cream py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle sub="รูปจริงจากหน้าร้าน — แตะที่รูปเพื่อดูใกล้ ๆ">🏪 ร้านของเรา</SectionTitle>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => onFile(e.target.files?.[0])} />

        {admin && (
          <p className="mx-auto mb-5 w-fit rounded-full bg-pork px-4 py-2 text-xs font-semibold text-cream">
            🛡️ โหมดแอดมิน — กดที่ช่องเพื่อเพิ่มหรือเปลี่ยนรูป รูปจะขึ้นให้ทุกคนเห็น
          </p>
        )}
        {error && <p className="mx-auto mb-5 w-fit rounded-2xl bg-caramel/20 px-4 py-2 text-sm text-caramel-deep">⚠️ {error}</p>}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {photoSlots.map((slot) => {
            const up = uploaded[slot.id];
            const src = up?.url ?? slot.src;
            const caption = up?.caption ?? slot.caption ?? slot.label;
            const working = busy === slot.id;
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
                    {admin && (
                      <div className="absolute right-2 top-2 flex gap-1">
                        <button
                          type="button"
                          onClick={() => pickFor(slot)}
                          disabled={working}
                          className="rounded-full bg-charcoal/70 px-2.5 py-1 text-[11px] font-semibold text-cream backdrop-blur-sm hover:bg-charcoal disabled:opacity-60"
                        >
                          {working ? "…" : "เปลี่ยน"}
                        </button>
                        {up && (
                          <button
                            type="button"
                            onClick={() => remove(slot)}
                            disabled={working}
                            className="rounded-full bg-charcoal/70 px-2.5 py-1 text-[11px] font-semibold text-cream backdrop-blur-sm hover:bg-caramel-deep disabled:opacity-60"
                          >
                            ลบ
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ) : admin ? (
                  <button
                    type="button"
                    onClick={() => pickFor(slot)}
                    disabled={working}
                    className="grid aspect-[4/3] w-full place-items-center border-2 border-dashed border-caramel/50 bg-caramel/5 px-3 text-center transition hover:bg-caramel/10"
                  >
                    <span>
                      <span className="block text-3xl">{working ? "⏳" : slot.emoji}</span>
                      <span className="mt-1.5 block text-xs font-semibold leading-[1.8] text-pork">＋ เพิ่มภาพ</span>
                    </span>
                  </button>
                ) : (
                  <div className="grid aspect-[4/3] w-full place-items-center bg-cream px-3 text-center">
                    <span>
                      <span className="block text-3xl opacity-40">{slot.emoji}</span>
                      <span className="mt-1.5 block text-xs leading-[1.8] text-ash">รอรูปจากร้าน</span>
                    </span>
                  </div>
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
          <p className="bg-warm px-5 py-4 text-center text-sm leading-[1.8] text-charcoal">{open.caption}</p>
        </div>
      )}
    </section>
  );
}
