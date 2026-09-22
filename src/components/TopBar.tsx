"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoMark, LogoText } from "./Logo";

const links = [
  { href: "#top", label: "หน้าแรก", icon: "🏠" },
  { href: "#menu", label: "เมนู", icon: "🍢" },
  { href: "#shop", label: "ร้าน", icon: "🏪" },
  { href: "#hours", label: "เวลา/สถานะ", icon: "🕓" },
  { href: "#reviews", label: "รีวิว", icon: "⭐" },
  { href: "#laundry", label: "เครื่องซักผ้าหยอดเหรียญ", icon: "🧺" },
  { href: "#contact", label: "ติดต่อ", icon: "📞" },
];

export function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#top");

  // ขีดเส้นใต้เมนูตาม section ที่กำลังดูอยู่
  useEffect(() => {
    const els = links.map((l) => document.getElementById(l.href.slice(1))).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(`#${hit.target.id}`);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.5] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-pork text-cream shadow-md shadow-pork/20">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2">
        <Link href="#top" className="flex min-w-0 items-center gap-3">
          <LogoMark className="h-12 w-12 shrink-0 drop-shadow" />
          <LogoText onDark />
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-medium lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`whitespace-nowrap px-2.5 py-2 transition hover:text-rice xl:px-3 ${
                active === l.href ? "border-b-2 border-rice text-rice" : "border-b-2 border-transparent"
              }`}
            >
              <span className="mr-1">{l.icon}</span>
              {l.label}
            </a>
          ))}
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
                <a href={l.href} onClick={() => setMenuOpen(false)} className="block rounded-xl px-3 py-3 hover:bg-pork">
                  <span className="mr-2">{l.icon}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
