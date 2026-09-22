import { owners, site } from "@/data/site";
import { LogoMark, LogoText } from "./Logo";

// เตาถ่านวาดเส้น มุมขวาของ footer
function Grill() {
  return (
    <svg viewBox="0 0 80 64" className="h-16 w-20 text-rice/80" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
      <path d="M28 6c-3 4 3 6 0 10M40 4c-3 4 3 6 0 10M52 6c-3 4 3 6 0 10" />
      <ellipse cx="40" cy="30" rx="30" ry="8" />
      <path d="M10 30v10a30 8 0 0 0 60 0V30M20 46l-6 12M60 46l6 12M40 48v12" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="bg-pork-deep pb-24 text-cream lg:pb-0">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-[auto_1fr_auto_auto]">
        <div className="flex items-center gap-3">
          <LogoMark className="h-14 w-14" />
          <LogoText onDark />
        </div>
        <div className="space-y-1 text-sm">
          {owners.map((o) => (
            <p key={o.phone}>
              📞 {o.name}{" "}
              <a href={`tel:${o.phone}`} className="font-semibold text-rice underline-offset-2 hover:underline">
                {o.phoneDisplay}
              </a>
            </p>
          ))}
          <p className="text-cream/70">📍 {site.address}</p>
        </div>
        <p className="font-display -rotate-3 text-lg font-bold text-rice">ขอบคุณที่อุดหนุนค่ะ ♥</p>
        <Grill />
      </div>
      <p className="border-t border-cream/15 py-4 text-center text-xs text-cream/60">
        © {new Date().getFullYear()} {site.name} · {site.nameEn}
      </p>
    </footer>
  );
}
