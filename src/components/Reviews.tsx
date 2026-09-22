"use client";

import { useEffect, useState } from "react";
import { reviews as seed, type Review } from "@/data/site";

const KEY = "wiriya-reviews";

function Stars({ n }: { n: number }) {
  return (
    <span className="text-rice-deep" aria-label={`${n} ดาว`}>
      {"★".repeat(n)}
      <span className="text-ash/25">{"★".repeat(5 - n)}</span>
    </span>
  );
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "2-digit" });
}

// รีวิวจากลูกค้า — รีวิวที่เขียนใหม่เก็บไว้ในเบราว์เซอร์เครื่องนั้น
export function Reviews() {
  const [mine, setMine] = useState<Review[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [writing, setWriting] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  useEffect(() => {
    const id = setTimeout(() => {
      try {
        setMine(JSON.parse(localStorage.getItem(KEY) ?? "[]"));
      } catch {}
    }, 0);
    return () => clearTimeout(id);
  }, []);

  const all = [...mine, ...seed];
  const shown = showAll ? all : all.slice(0, 2);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    const r: Review = { id: `m${Date.now()}`, user: name.trim() || "คุณลูกค้า", avatar: "🙂", rating, text: text.trim(), date: new Date().toISOString().slice(0, 10) };
    const next = [r, ...mine];
    setMine(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
    setName("");
    setText("");
    setRating(5);
    setWriting(false);
    setShowAll(true);
  };

  return (
    <div id="reviews" className="relative flex flex-col rounded-[2rem] bg-caramel/10 p-6 ring-1 ring-caramel/20">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-pork text-2xl text-cream">⭐</span>
          <div>
            <h2 className="font-display text-2xl font-bold text-pork md:text-3xl">รีวิวจากลูกค้า</h2>
            <p className="text-sm text-ash">ขอบคุณทุกความประทับใจค่ะ</p>
          </div>
        </div>
        {all.length > 2 && (
          <button type="button" onClick={() => setShowAll((v) => !v)} className="shrink-0 text-sm font-semibold text-pork hover:underline">
            {showAll ? "ย่อ ↑" : "ดูทั้งหมด →"}
          </button>
        )}
      </div>

      <p className="font-display pointer-events-none absolute bottom-7 right-8 hidden -rotate-12 text-lg font-bold text-pork md:block">
        ขอบคุณ
        <br />
        ทุกรีวิวเลยค่ะ ♥
      </p>

      <ul className="mt-5 flex-1 space-y-3">
        {shown.map((r) => (
          <li key={r.id} className="flex gap-3 rounded-2xl bg-warm p-4 ring-1 ring-rice/40">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cream text-xl">{r.avatar}</span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-sm font-bold text-charcoal">{r.user}</p>
              <p className="text-sm">
                <Stars n={r.rating} />
              </p>
              <p className="mt-1 text-sm leading-relaxed text-charcoal">{r.text}</p>
              <p className="mt-1 text-xs text-ash">{fmt(r.date)}</p>
            </div>
          </li>
        ))}
      </ul>

      {writing ? (
        <form onSubmit={submit} className="mt-4 space-y-2 rounded-2xl bg-warm p-4 ring-1 ring-rice/40">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="ชื่อของคุณ (ไม่ใส่ก็ได้)" className="w-full rounded-xl border border-rice/60 bg-white px-3 py-2 text-sm outline-none focus:border-caramel" />
          <div className="flex items-center gap-1 text-2xl">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} ดาว`} className={n <= rating ? "text-rice-deep" : "text-ash/30"}>
                ★
              </button>
            ))}
          </div>
          <textarea value={text} onChange={(e) => setText(e.target.value)} required rows={3} placeholder="เล่าให้ฟังหน่อยว่าอร่อยยังไง…" className="w-full rounded-xl border border-rice/60 bg-white px-3 py-2 text-sm outline-none focus:border-caramel" />
          <div className="flex gap-2">
            <button type="submit" className="rounded-full bg-pork px-5 py-2 text-sm font-semibold text-cream hover:bg-pork-deep">ส่งรีวิว</button>
            <button type="button" onClick={() => setWriting(false)} className="rounded-full px-4 py-2 text-sm text-ash hover:underline">ยกเลิก</button>
          </div>
        </form>
      ) : (
        <button type="button" onClick={() => setWriting(true)} className="mt-4 inline-flex items-center justify-center gap-2 self-start rounded-full bg-pork px-6 py-3 text-sm font-semibold text-cream shadow-md shadow-pork/30 transition hover:bg-pork-deep">
          ✏️ เขียนรีวิวให้เราด้วยนะคะ
        </button>
      )}
    </div>
  );
}
