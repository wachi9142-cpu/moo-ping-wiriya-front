import { LogoMark } from "./Logo";
import { owners, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-charcoal pb-24 text-warm lg:pb-0">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <LogoMark className="mb-3 h-18 w-18" />
          <p className="font-display text-2xl font-bold text-rice">🍢 หมูปิ้งวิริญา</p>
          <p className="text-sm font-semibold text-cream/80">Wiriya <span className="text-caramel">Moo Ping</span></p>
          <p className="mt-2 text-sm text-warm/85">🍢 {site.tagline}</p>
        </div>
        <div className="space-y-1 text-sm">
          <p>📍 {site.address}</p>
          {owners.map((o) => (
            <p key={o.phone}>
              📞 {o.name}{" "}
              <a href={`tel:${o.phone}`} className="font-semibold text-rice underline-offset-2 hover:underline">
                {o.phoneDisplay}
              </a>
            </p>
          ))}
        </div>
        <div className="space-y-1 text-sm">
          <p>🕟 เริ่มขาย {site.open} น. ทุกวัน</p>
          <p>🔥 ขายจนกว่าจะหมด (ประมาณ {site.closeApprox} น.)</p>
          <p className="mt-2 inline-block rounded-full bg-warm/10 px-3 py-1 text-xs font-semibold">🚫 ไม่มีบริการ Delivery</p>
        </div>
      </div>
      <p className="border-t border-warm/15 py-4 text-center text-xs text-warm/60">
        © {new Date().getFullYear()} {site.name} • ย่างด้วยใจทุกเช้า 🔥
      </p>
    </footer>
  );
}
