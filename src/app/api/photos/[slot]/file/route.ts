import fs from "node:fs/promises";
import path from "node:path";
import { db, UPLOAD_DIR, type PhotoRow } from "@/server/db";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ slot: string }> };

// GET /api/photos/:slot/file → ส่งไฟล์รูปจริงออกไป (เก็บไว้นอก public/ เลยต้องมี route นี้)
export async function GET(_request: Request, { params }: Ctx) {
  const { slot } = await params;
  const row = db.prepare("SELECT * FROM photos WHERE slot = ?").get(slot) as unknown as PhotoRow | undefined;
  if (!row) return new Response("ไม่พบรูป", { status: 404 });

  // กัน path traversal: ใช้เฉพาะชื่อไฟล์ และต้องอยู่ใน UPLOAD_DIR เท่านั้น
  const full = path.join(UPLOAD_DIR, path.basename(row.file));
  try {
    const buf = await fs.readFile(full);
    return new Response(new Uint8Array(buf), {
      headers: {
        "Content-Type": row.mime,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("ไม่พบไฟล์รูป", { status: 404 });
  }
}
