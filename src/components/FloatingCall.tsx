import { owners, site } from "@/data/site";

// แถบโทร/นำทางติดขอบล่างบนมือถือ — ลูกค้ากดโทรเช็คว่าหมูยังไม่หมดได้ทันที
export function FloatingCall() {
  const main = owners[0];
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-rice/40 bg-pork/95 px-4 py-3 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-md gap-2">
        <a href={`tel:${main.phone}`} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-caramel py-3 font-semibold text-white shadow-lg shadow-caramel/40">
          📞 โทรถามว่ายังมีไหม
        </a>
        <a href={site.mapsUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-rice px-5 py-3 font-semibold text-charcoal">
          🗺️
        </a>
      </div>
    </div>
  );
}
