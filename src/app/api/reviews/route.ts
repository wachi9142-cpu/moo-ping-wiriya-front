import { db, type ReviewRow } from "@/server/db";
import { isAdmin } from "@/server/session";

export const dynamic = "force-dynamic";

const AVATARS = ["🙂", "😋", "😍", "🐱", "🧑", "🧔", "👵", "👩"];

export type ReviewDTO = {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
  status?: string;
};

function toDTO(r: ReviewRow, withStatus = false): ReviewDTO {
  return {
    id: r.id,
    user: r.user,
    avatar: r.avatar,
    rating: r.rating,
    text: r.text,
    date: r.created_at.slice(0, 10),
    ...(withStatus ? { status: r.status } : {}),
  };
}

// GET /api/reviews         → เฉพาะรีวิวที่อนุมัติแล้ว (ลูกค้าทุกคนเห็นเหมือนกัน)
// GET /api/reviews?all=1   → ทุกสถานะ (แอดมินเท่านั้น ใช้ในหน้าอนุมัติ)
export async function GET(request: Request) {
  const wantAll = new URL(request.url).searchParams.get("all") === "1";
  const admin = await isAdmin();

  if (wantAll && !admin) {
    return Response.json({ error: "ต้องเข้าสู่ระบบแอดมินก่อน" }, { status: 401 });
  }

  const rows = wantAll
    ? (db.prepare("SELECT * FROM reviews ORDER BY created_at DESC").all() as unknown as ReviewRow[])
    : (db.prepare("SELECT * FROM reviews WHERE status = 'approved' ORDER BY created_at DESC").all() as unknown as ReviewRow[]);

  return Response.json({ reviews: rows.map((r) => toDTO(r, wantAll)) });
}

// POST /api/reviews → ลูกค้าส่งรีวิว เข้าคิวรออนุมัติ
export async function POST(request: Request) {
  let body: { user?: unknown; rating?: unknown; text?: unknown; avatar?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "ข้อมูลไม่ถูกต้อง" }, { status: 400 });
  }

  const text = typeof body.text === "string" ? body.text.trim() : "";
  const user = typeof body.user === "string" && body.user.trim() ? body.user.trim() : "คุณลูกค้า";
  const rating = Math.round(Number(body.rating));
  const avatar = typeof body.avatar === "string" && AVATARS.includes(body.avatar) ? body.avatar : "🙂";

  if (!text) return Response.json({ error: "กรุณาเขียนข้อความรีวิว" }, { status: 400 });
  if (text.length > 500) return Response.json({ error: "ข้อความยาวเกินไป (ไม่เกิน 500 ตัวอักษร)" }, { status: 400 });
  if (user.length > 40) return Response.json({ error: "ชื่อยาวเกินไป" }, { status: 400 });
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return Response.json({ error: "กรุณาให้คะแนน 1–5 ดาว" }, { status: 400 });
  }

  const id = crypto.randomUUID();
  db.prepare(
    "INSERT INTO reviews (id, user, avatar, rating, text, status, created_at) VALUES (?, ?, ?, ?, ?, 'pending', ?)",
  ).run(id, user, avatar, rating, text, new Date().toISOString());

  return Response.json({ ok: true, id, message: "ขอบคุณค่ะ รีวิวจะแสดงหลังร้านตรวจสอบ" }, { status: 201 });
}
