// โลโก้ร้าน: ไม้หมูปิ้ง + ควันจากเตา + ข้าวเหนียว แบบเรียบ ๆ (วาดด้วย SVG ใช้สีจากธีม)
export function LogoMark({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <circle cx="32" cy="32" r="31" fill="var(--warm)" stroke="var(--rice)" strokeWidth="2" />
      {/* ควัน */}
      <path d="M22 17c-3-3 1-6-1-9M32 14c-3-3 1-6-1-9M42 17c-3-3 1-6-1-9" fill="none" stroke="var(--caramel)" strokeWidth="2" strokeLinecap="round" opacity=".8" />
      {/* ไม้เสียบ */}
      <path d="M12 52 44 20" stroke="var(--rice-deep)" strokeWidth="3" strokeLinecap="round" />
      {/* ชิ้นหมู 3 ชิ้น */}
      <ellipse cx="38" cy="26" rx="7" ry="5.5" transform="rotate(-45 38 26)" fill="var(--pork)" />
      <ellipse cx="30" cy="34" rx="7" ry="5.5" transform="rotate(-45 30 34)" fill="var(--pork-deep)" />
      <ellipse cx="22" cy="42" rx="7" ry="5.5" transform="rotate(-45 22 42)" fill="var(--pork)" />
      <path d="M35 23l4 4M27 31l4 4M19 39l4 4" stroke="var(--caramel)" strokeWidth="1.5" strokeLinecap="round" />
      {/* ข้าวเหนียวห่อใบตอง */}
      <path d="M40 44h14a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H40a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3z" fill="var(--leaf)" />
      <ellipse cx="47" cy="50" rx="6" ry="3.5" fill="var(--cream)" />
      <circle cx="44" cy="49.5" r=".9" fill="var(--rice)" />
      <circle cx="48" cy="51" r=".9" fill="var(--rice)" />
      <circle cx="50" cy="48.8" r=".9" fill="var(--rice)" />
    </svg>
  );
}

// ชื่อร้านคู่โลโก้ — ไทยตัวใหญ่ อังกฤษสีน้ำตาลแบรนด์ + accent คาราเมล
export function LogoText({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className="min-w-0 leading-tight">
      <span className={`font-display block truncate text-base font-bold sm:text-lg ${onDark ? "text-cream" : "text-pork"}`}>🍢 หมูปิ้งวิริญา</span>
      <span className={`block text-[11px] font-semibold tracking-wide ${onDark ? "text-rice" : "text-pork"}`}>
        Wiriya <span className="text-caramel">Moo Ping</span>
      </span>
    </span>
  );
}
