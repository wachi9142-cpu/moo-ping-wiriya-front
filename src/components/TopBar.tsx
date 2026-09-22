"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { owners, site } from "@/data/site";
import { LogoMark, LogoText } from "./Logo";

const links = [
  { href: "/#menu", label: "🍢 เมนู" },
  { href: "/#gallery", label: "📸 รูปร้าน" },
  { href: "/#hours", label: "🕟 เวลาขาย" },
  { href: "/#location", label: "📍 ร้านอยู่ที่ไหน" },
  { href: "/#laundry", label: "🧺 ซักผ้าหยอดเหรียญ" },
  { href: "/#reviews", label: "⭐ รีวิว" },
];

type OpenState = { open: boolean } | null;

// ร้านเปิดตี 4 ครึ่ง ขายจนหมด (ประมาณ 9 โมง) — ใช้เวลาไทย
function useOpenNow(): OpenState {
  const [state, setState] = useState<OpenState>(null);
  useEffect(() => {
    const check = () => {
      const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" }));
      const [oh, om] = site.open.split(":").map(Number);
      const [ch, cm] = site.closeApprox.split(":").map(Number);
      const mins = now.getHours() * 60 + now.getMinutes();
      setState({ open: mins >= oh * 60 + om && mins < ch * 60 + cm });
    };
    check();
    const t = setInterval(check, 60_000);
    return () => clearInterval(t);
  }, []);
  return state;
}

export function TopBar() {
  const status = useOpenNow();
  const [menuOpen, setMenuOpen] = useState(false);
  const main = owners[0];

  return (
    <header className="sticky top-0 z-50 border-b border-rice/40 bg-pork text-cream shadow-md shadow-pork/20">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2">
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <LogoMark className="h-11 w-11 shrink-0 drop-shadow" />
          <span className="min-w-0">
            <LogoText onDark />
            <span className="mt-0.5 block text-[11px] text-cream/80">
              {status === null ? "…" : status.open ? "🟢 น่าจะเปิดอยู่ — ขายจนกว่าจะหมด" : `🔴 ปิดอยู่ — เปิดพรุ่งนี้ ${site.open} น.`}
            </span>
          </span>
        </Link>

        <nav className="hidden shrink-0 items-center gap-2 text-sm font-medium lg:flex xl:gap-4">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="whitespace-nowrap transition hover:text-rice">
              {l.label}
            </Link>
          ))}
          <a
            href={`tel:${main.phone}`}
            className="whitespace-nowrap rounded-full bg-caramel px-4 py-2 text-white shadow-md shadow-caramel/30 transition hover:bg-caramel-deep"
          >
            📞 {main.phoneDisplay}
          </a>
        </nav>

        <button
          type="button"
          aria-label="เมนู"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-pork-deep text-xl text-cream ring-1 ring-rice/50 lg:hidden"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-rice/30 bg-pork-deep px-4 py-3 text-cream lg:hidden">
          <ul className="flex flex-col gap-1 text-sm font-medium">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setMenuOpen(false)} className="block rounded-xl px-3 py-3 hover:bg-pork">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={`tel:${main.phone}`} className="mt-1 block rounded-xl bg-caramel px-3 py-3 text-center text-white">
                📞 โทร {main.name} {main.phoneDisplay}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
