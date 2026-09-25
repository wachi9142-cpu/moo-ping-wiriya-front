import fs from "node:fs/promises";
import path from "node:path";
import { db, UPLOAD_DIR } from "@/server/db";
import { requireAdmin } from "@/server/session";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ slot: string }> };

// DELETE /api/photos/:slot → แอดมินลบรูปในช่องนั้น
export async function DELETE(_request: Request, { params }: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { slot } = await params;
  const row = db.prepare("SELECT file FROM photos WHERE slot = ?").get(slot) as { file: string } | undefined;
  if (!row) return Response.json({ error: "ไม่พบรูปในช่องนี้" }, { status: 404 });

  db.prepare("DELETE FROM photos WHERE slot = ?").run(slot);
  await fs.rm(path.join(UPLOAD_DIR, row.file), { force: true });

  return Response.json({ ok: true });
}
