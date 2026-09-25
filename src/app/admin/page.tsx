"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  adminLogin,
  adminLogout,
  deleteReview,
  fetchAdminSession,
  fetchReviews,
  setReviewStatus,
  type ApiReview,
} from "@/lib/api";

const STATUS_LABEL: Record<string, string> = {
  pending: "⏳ รออนุมัติ",
  approved: "✅ แสดงบนเว็บแล้ว",
  rejected: "🚫 ไม่อนุมัติ",
};

export default function AdminPage() {
  const [admin, setAdmin] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [list, setList] = useState<ApiReview[]>([]);
  const [busy, setBusy] = useState<string | null>(null);

  const load = () => fetchReviews(true).then(setList).catch(() => setList([]));

  useEffect(() => {
    fetchAdminSession()
      .then((ok) => {
        setAdmin(ok);
        if (ok) load();
      })
      .catch(() => setAdmin(false));
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await adminLogin(password);
      setAdmin(true);
      setPassword("");
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "เข้าสู่ระบบไม่สำเร็จ");
    }
  };

  const logout = async () => {
    await adminLogout().catch(() => {});
    setAdmin(false);
    setList([]);
  };

  const act = async (id: string, fn: () => Promise<unknown>) => {
    setBusy(id);
    setError(null);
    try {
      await fn();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "ทำรายการไม่สำเร็จ");
    } finally {
      setBusy(null);
    }
  };

  if (admin === null) {
    return <main className="mx-auto max-w-md px-4 py-20 text-center text-ash">กำลังตรวจสอบ…</main>;
  }

  if (!admin) {
    return (
      <main className="mx-auto max-w-md px-4 py-20">
        <h1 className="font-display text-center text-3xl font-bold leading-[1.6] text-pork">🛡️ สำหรับแอดมิน</h1>
        <p className="mt-2 text-center text-sm text-ash">เข้าสู่ระบบเพื่ออนุมัติรีวิวและอัปโหลดรูปหน้าร้าน</p>
        <form onSubmit={login} className="mt-6 space-y-3 rounded-3xl bg-warm p-6 ring-1 ring-rice/40">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="รหัสผ่านแอดมิน"
            autoFocus
            className="w-full rounded-xl border border-rice/60 bg-white px-4 py-3 outline-none focus:border-caramel"
          />
          {error && <p className="rounded-xl bg-caramel/20 px-3 py-2 text-sm leading-[1.8] text-caramel-deep">⚠️ {error}</p>}
          <button type="submit" className="w-full rounded-full bg-pork py-3 font-semibold text-cream hover:bg-pork-deep">
            เข้าสู่ระบบ
          </button>
        </form>
        <p className="mt-6 text-center text-sm">
          <Link href="/" className="text-pork hover:underline">
            ← กลับหน้าแรก
          </Link>
        </p>
      </main>
    );
  }

  const pending = list.filter((r) => r.status === "pending");
  const rest = list.filter((r) => r.status !== "pending");

  const Card = ({ r }: { r: ApiReview }) => (
    <li className="rounded-2xl bg-warm p-4 ring-1 ring-rice/40">
      <div className="flex flex-wrap items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-cream text-lg">{r.avatar}</span>
        <span className="font-display font-bold leading-[1.8] text-charcoal">{r.user}</span>
        <span className="text-rice-deep">{"★".repeat(r.rating)}</span>
        <span className="text-xs text-ash">{r.date}</span>
        <span className="ml-auto text-xs font-semibold text-ash">{STATUS_LABEL[r.status ?? "pending"]}</span>
      </div>
      <p className="mt-2 text-sm leading-[1.8] text-charcoal">{r.text}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {r.status !== "approved" && (
          <button
            type="button"
            disabled={busy === r.id}
            onClick={() => act(r.id, () => setReviewStatus(r.id, "approved"))}
            className="rounded-full bg-leaf px-4 py-1.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
          >
            ✅ อนุมัติ
          </button>
        )}
        {r.status !== "rejected" && (
          <button
            type="button"
            disabled={busy === r.id}
            onClick={() => act(r.id, () => setReviewStatus(r.id, "rejected"))}
            className="rounded-full bg-cream px-4 py-1.5 text-sm font-semibold text-pork ring-1 ring-rice hover:bg-white disabled:opacity-60"
          >
            🚫 ไม่อนุมัติ
          </button>
        )}
        <button
          type="button"
          disabled={busy === r.id}
          onClick={() => confirm("ลบรีวิวนี้ถาวร?") && act(r.id, () => deleteReview(r.id))}
          className="rounded-full px-3 py-1.5 text-sm text-ash hover:underline disabled:opacity-60"
        >
          ลบถาวร
        </button>
      </div>
    </li>
  );

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-bold leading-[1.6] text-pork">🛡️ หน้าแอดมิน</h1>
        <button type="button" onClick={logout} className="rounded-full bg-cream px-4 py-2 text-sm font-semibold text-pork ring-1 ring-rice hover:bg-white">
          ออกจากระบบ
        </button>
      </div>
      <p className="mt-2 text-sm leading-[1.8] text-ash">
        อนุมัติรีวิวได้ที่นี่ · ส่วนรูปหน้าร้าน กลับไปที่{" "}
        <Link href="/#gallery" className="font-semibold text-pork hover:underline">
          หน้าแรก → ร้านของเรา
        </Link>{" "}
        แล้วกดที่ช่องรูปได้เลย
      </p>

      {error && <p className="mt-4 rounded-2xl bg-caramel/20 px-4 py-3 text-sm leading-[1.8] text-caramel-deep">⚠️ {error}</p>}

      <section className="mt-8">
        <h2 className="font-display text-xl font-bold leading-[1.7] text-charcoal">⏳ รออนุมัติ ({pending.length})</h2>
        {pending.length === 0 ? (
          <p className="mt-2 text-sm text-ash">ไม่มีรีวิวที่รออนุมัติ</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {pending.map((r) => (
              <Card key={r.id} r={r} />
            ))}
          </ul>
        )}
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-bold leading-[1.7] text-charcoal">📋 รีวิวทั้งหมด ({rest.length})</h2>
        {rest.length === 0 ? (
          <p className="mt-2 text-sm text-ash">ยังไม่มี</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {rest.map((r) => (
              <Card key={r.id} r={r} />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
