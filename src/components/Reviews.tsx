"use client";

import { useEffect, useState } from "react";
import { reviews as seed } from "@/data/site";
import { fetchReviews, submitReview, type ApiReview } from "@/lib/api";

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

// รีวิวจากลูกค้า — ดึงจากเซิร์ฟเวอร์ ทุกคนที่เปิดเว็บเห็นชุดเดียวกัน
// ที่ส่งใหม่จะขึ้นสถานะ "รออนุมัติ" จนกว่าแอดมินจะกดอนุมัติในหน้า /admin
export function Reviews() {
  const [list, setList] = useState<ApiReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [writing, setWriting] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState<{ kind: "ok" | "err"; msg: string } | null>(null);

  useEffect(() => {
    fetchReviews()
      .then(setList)
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  }, []);

  // ยังไม่มีรีวิวจริงในระบบ → โชว์รีวิวตัวอย่างไปก่อน
  const all: ApiReview[] = list.length > 0 ? list : seed;
  const shown = showAll ? all : all.slice(0, 2);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || sending) return;
    setSending(true);
    setNotice(null);
    try {
      const res = await submitReview({ user: name, rating, text });
      setNotice({ kind: "ok", msg: res.message });
      setName("");
      setText("");
      setRating(5);
      setWriting(false);
    } catch (err) {
      setNotice({ kind: "err", msg: err instanceof Error ? err.message : "ส่งรีวิวไม่สำเร็จ" });
    } finally {
      setSending(false);
    }
  };

  return (
    <div id="reviews" className="relative flex flex-col rounded-[2rem] bg-caramel/10 p-6 ring-1 ring-caramel/20">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-pork text-2xl text-cream">⭐</span>
          <div>
            <h2 className="font-display text-2xl font-bold leading-[1.6] text-pork md:text-3xl">รีวิวจากลูกค้า</h2>
            <p className="text-sm text-ash">ขอบคุณทุกความประทับใจค่ะ</p>
          </div>
        </div>
        {all.length > 2 && (
          <button type="button" onClick={() => setShowAll((v) => !v)} className="shrink-0 text-sm font-semibold text-pork hover:underline">
            {showAll ? "ย่อ ↑" : "ดูทั้งหมด →"}
          </button>
        )}
      </div>

      <p className="font-display pointer-events-none absolute bottom-7 right-8 hidden -rotate-12 text-lg font-bold leading-[1.7] text-pork md:block">
        ขอบคุณ
        <br />
        ทุกรีวิวเลยค่ะ ♥
      </p>

      {loading ? (
        <p className="mt-5 flex-1 text-sm text-ash">กำลังโหลดรีวิว…</p>
      ) : (
        <ul className="mt-5 flex-1 space-y-3">
          {shown.map((r) => (
            <li key={r.id} className="flex gap-3 rounded-2xl bg-warm p-4 ring-1 ring-rice/40">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cream text-xl">{r.avatar}</span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-bold leading-[1.8] text-charcoal">{r.user}</p>
                <p className="text-sm">
                  <Stars n={r.rating} />
                </p>
                <p className="mt-1 text-sm leading-[1.8] text-charcoal">{r.text}</p>
                <p className="mt-1 text-xs text-ash">{fmt(r.date)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {notice && (
        <p className={`mt-4 rounded-2xl px-4 py-3 text-sm leading-[1.8] ${notice.kind === "ok" ? "bg-leaf/20 text-leaf-deep" : "bg-caramel/20 text-caramel-deep"}`}>
          {notice.kind === "ok" ? "✅ " : "⚠️ "}
          {notice.msg}
        </p>
      )}

      {writing ? (
        <form onSubmit={submit} className="mt-4 space-y-2 rounded-2xl bg-warm p-4 ring-1 ring-rice/40">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={40}
            placeholder="ชื่อของคุณ (ไม่ใส่ก็ได้)"
            className="w-full rounded-xl border border-rice/60 bg-white px-3 py-2 text-sm outline-none focus:border-caramel"
          />
          <div className="flex items-center gap-1 text-2xl">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} ดาว`} className={n <= rating ? "text-rice-deep" : "text-ash/30"}>
                ★
              </button>
            ))}
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            rows={3}
            maxLength={500}
            placeholder="เล่าให้ฟังหน่อยว่าอร่อยยังไง…"
            className="w-full rounded-xl border border-rice/60 bg-white px-3 py-2 text-sm leading-[1.8] outline-none focus:border-caramel"
          />
          <div className="flex gap-2">
            <button type="submit" disabled={sending} className="rounded-full bg-pork px-5 py-2 text-sm font-semibold text-cream hover:bg-pork-deep disabled:opacity-60">
              {sending ? "กำลังส่ง…" : "ส่งรีวิว"}
            </button>
            <button type="button" onClick={() => setWriting(false)} className="rounded-full px-4 py-2 text-sm text-ash hover:underline">
              ยกเลิก
            </button>
          </div>
          <p className="text-xs text-ash">รีวิวจะแสดงบนเว็บหลังร้านตรวจสอบแล้ว</p>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => {
            setWriting(true);
            setNotice(null);
          }}
          className="mt-4 inline-flex items-center justify-center gap-2 self-start rounded-full bg-pork px-6 py-3 text-sm font-semibold text-cream shadow-md shadow-pork/30 transition hover:bg-pork-deep"
        >
          ✏️ เขียนรีวิวให้เราด้วยนะคะ
        </button>
      )}
    </div>
  );
}
