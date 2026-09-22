// โลโก้ร้าน: ไม้หมูปิ้งเฉียง ๆ บนวงกลมครีม + ควันจากเตา แบบเรียบ ๆ
export function LogoMark({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <circle cx="32" cy="32" r="31" fill="var(--warm)" />
      {/* ควัน */}
      <path d="M26 16c-2-3 2-5 0-8M36 14c-2-3 2-5 0-8" fill="none" stroke="var(--caramel)" strokeWidth="2" strokeLinecap="round" opacity=".8" />
      {/* ไม้เสียบ */}
      <path d="M12 54 50 18" stroke="var(--rice-deep)" strokeWidth="3.5" strokeLinecap="round" />
      {/* ชิ้นหมู 3 ชิ้น */}
      <ellipse cx="42" cy="26" rx="8" ry="6" transform="rotate(-43 42 26)" fill="var(--pork)" />
      <ellipse cx="32" cy="35" rx="8" ry="6" transform="rotate(-43 32 35)" fill="var(--pork-deep)" />
      <ellipse cx="22" cy="44" rx="8" ry="6" transform="rotate(-43 22 44)" fill="var(--pork)" />
      <path d="M39 22l5 5M29 31l5 5M19 40l5 5" stroke="var(--caramel)" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// ชื่อร้านคู่โลโก้ — ไทยตัวใหญ่ อังกฤษสีน้ำตาลแบรนด์ + accent คาราเมล
export function LogoText({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className="min-w-0 leading-tight">
      <span className={`font-display block truncate text-lg font-bold sm:text-xl ${onDark ? "text-cream" : "text-pork"}`}>หมูปิ้งวิริญา</span>
      <span className={`font-display block text-xs font-bold tracking-wide ${onDark ? "text-rice" : "text-pork"}`}>
        Wiriya <span className="text-caramel">Moo Ping</span>
      </span>
    </span>
  );
}
