export type CallFirstPhone = { label?: string; phone: string; phoneDisplay: string };

// "📞 แนะนำให้โทรสอบถามก่อนมา" — ร้านขายจนกว่าจะหมด เลยควรโทรเช็คก่อน
export function CallFirst({ text, phones = [], className = "" }: { text: string; phones?: CallFirstPhone[]; className?: string }) {
  return (
    <div className={`rounded-3xl bg-rice/25 p-5 ring-1 ring-rice ${className}`}>
      <p className="font-display text-lg font-bold text-charcoal">📞 แนะนำให้โทรสอบถามก่อนมา</p>
      <p className="mt-1 text-sm leading-relaxed text-ash">{text}</p>
      {phones.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {phones.map((p) => (
            <a
              key={p.phone}
              href={`tel:${p.phone}`}
              className="inline-flex items-center gap-2 rounded-full bg-caramel px-4 py-2 text-sm font-semibold text-white shadow-md shadow-caramel/30 transition hover:bg-caramel-deep"
            >
              📞 {p.label && <span className="font-normal text-white/90">{p.label}</span>} {p.phoneDisplay}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
