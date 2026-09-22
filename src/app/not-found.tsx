import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto grid min-h-[60vh] max-w-xl place-items-center px-4 text-center">
      <div>
        <p className="text-6xl">🍢</p>
        <h1 className="font-display mt-4 text-3xl font-bold text-charcoal">ไม่พบหน้านี้</h1>
        <p className="mt-2 text-ash">หมูปิ้งอาจจะหมดแล้ว… ลองกลับไปหน้าแรกนะ</p>
        <Link href="/" className="mt-6 inline-block rounded-full bg-caramel px-6 py-3 font-semibold text-white shadow-lg shadow-caramel/30 hover:bg-caramel-deep">
          🏠 กลับหน้าแรก
        </Link>
      </div>
    </main>
  );
}
