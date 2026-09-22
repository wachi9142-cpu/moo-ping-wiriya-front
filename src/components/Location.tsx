import { owners, site } from "@/data/site";
import { SectionTitle } from "./SectionTitle";

export function Location() {
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.address)}`;

  return (
    <section id="location" className="bg-warm py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle>📍 ร้านอยู่ที่ไหน</SectionTitle>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="min-h-72 overflow-hidden rounded-3xl bg-warm ring-1 ring-rice/40">
            <iframe
              title={`แผนที่ ${site.name}`}
              src={site.mapsEmbed}
              className="h-full min-h-72 w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="flex flex-col justify-center rounded-3xl bg-cream p-8 ring-1 ring-rice/40">
            <p className="font-display text-2xl font-bold text-charcoal">📍 {site.name}</p>
            <p className="mt-2 text-ash">{site.address}</p>
            <p className="mt-2 text-sm text-ash/80">{site.location}</p>
            <div className="mt-5 space-y-2">
              {owners.map((o) => (
                <a key={o.phone} href={`tel:${o.phone}`} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-rice/40 transition hover:bg-rice/10">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-caramel/15 text-2xl">📞</span>
                  <span className="min-w-0">
                    <span className="block text-xs text-ash">{o.name} — เจ้าของร้าน</span>
                    <span className="font-display text-lg font-bold text-pork">{o.phoneDisplay}</span>
                  </span>
                </a>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={site.mapsUrl} target="_blank" rel="noreferrer" className="rounded-full bg-white px-5 py-3 font-semibold text-charcoal ring-1 ring-rice transition hover:bg-rice/10">
                🗺️ เปิดแผนที่
              </a>
              <a href={directions} target="_blank" rel="noreferrer" className="rounded-full bg-caramel px-5 py-3 font-semibold text-white shadow-md shadow-caramel/30 transition hover:bg-caramel-deep">
                🧭 นำทางมาที่ร้าน
              </a>
            </div>
            <div className="mt-6 rounded-2xl bg-caramel/10 p-4 text-sm">
              <p className="font-bold text-charcoal">🚫 ไม่มีบริการ Delivery</p>
              <p className="text-ash">ซื้อได้ที่หน้าร้านเท่านั้น ช่วงเช้าตั้งแต่ตี 4 ครึ่ง</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
