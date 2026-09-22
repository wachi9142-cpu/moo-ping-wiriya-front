import { reviews } from "@/data/site";
import { SectionTitle } from "./SectionTitle";

function Stars({ n }: { n: number }) {
  return (
    <span className="text-rice-deep" aria-label={`${n} ดาว`}>
      {"★".repeat(n)}
      <span className="text-ash/30">{"★".repeat(5 - n)}</span>
    </span>
  );
}

export function Reviews() {
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  return (
    <section id="reviews" className="mx-auto max-w-6xl px-4 py-20">
      <SectionTitle sub={`คะแนนเฉลี่ย ${avg.toFixed(1)} จาก ${reviews.length} รีวิว`}>⭐ ลูกค้าว่าไง</SectionTitle>
      <div className="grid gap-4 md:grid-cols-3">
        {reviews.map((r) => (
          <article key={r.id} className="rounded-3xl bg-warm p-5 shadow-sm ring-1 ring-rice/40">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-warm text-2xl">{r.avatar}</span>
              <div className="min-w-0">
                <p className="font-display truncate font-bold text-charcoal">{r.user}</p>
                <p className="text-xs text-ash">{new Date(r.date).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" })}</p>
              </div>
            </div>
            <p className="mt-3">
              <Stars n={r.rating} />
            </p>
            <p className="mt-2 text-sm leading-relaxed text-charcoal">{r.text}</p>
          </article>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-ash">อยากรีวิว? แวะมาชิมแล้วบอกต่อเพื่อน ๆ ได้เลย 💛</p>
    </section>
  );
}
