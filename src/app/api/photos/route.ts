import fs from "node:fs/promises";
import path from "node:path";
import { db, UPLOAD_DIR, type PhotoRow } from "@/server/db";
import { requireAdmin } from "@/server/session";

export const dynamic = "force-dynamic";

const MAX_BYTES = 6 * 1024 * 1024; // 6 MB
const ALLOWED: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

export type PhotoDTO = { slot: string; url: string; caption: string };

// GET /api/photos → รูปที่แอดมินอัปโหลดไว้ ทุกคนเห็นเหมือนกัน
export async function GET() {
  const rows = db.prepare("SELECT * FROM photos").all() as unknown as PhotoRow[];
  const photos: Record<string, PhotoDTO> = {};
  for (const r of rows) {
    photos[r.slot] = { slot: r.slot, url: `/api/photos/${r.slot}/file?v=${Date.parse(r.created_at)}`, caption: r.caption };
  }
  return Response.json({ photos });
}

// POST /api/photos → แอดมินอัปโหลดรูปลงช่อง (multipart: slot, caption, file)
export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const form = await request.formData();
  const slot = String(form.get("slot") ?? "").trim();
  const caption = String(form.get("caption") ?? "").trim().slice(0, 120);
  const file = form.get("file");

  if (!/^[a-z0-9_-]{1,40}$/i.test(slot)) return Response.json({ error: "ช่องรูปไม่ถูกต้อง" }, { status: 400 });
  if (!(file instanceof File)) return Response.json({ error: "ไม่พบไฟล์รูป" }, { status: 400 });
  if (file.size > MAX_BYTES) return Response.json({ error: "ไฟล์ใหญ่เกิน 6 MB" }, { status: 413 });

  const ext = ALLOWED[file.type];
  if (!ext) return Response.json({ error: "รองรับเฉพาะ JPG / PNG / WebP" }, { status: 415 });

  const filename = `${slot}-${Date.now()}${ext}`;
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, filename), Buffer.from(await file.arrayBuffer()));

  // ลบไฟล์เก่าของช่องนี้ ไม่ให้ค้างกินพื้นที่
  const old = db.prepare("SELECT file FROM photos WHERE slot = ?").get(slot) as { file: string } | undefined;
  db.prepare(
    `INSERT INTO photos (slot, file, mime, caption, created_at) VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(slot) DO UPDATE SET file = excluded.file, mime = excluded.mime, caption = excluded.caption, created_at = excluded.created_at`,
  ).run(slot, filename, file.type, caption, new Date().toISOString());
  if (old?.file && old.file !== filename) {
    await fs.rm(path.join(UPLOAD_DIR, old.file), { force: true });
  }

  return Response.json({ ok: true, slot, url: `/api/photos/${slot}/file?v=${Date.now()}`, caption }, { status: 201 });
}
