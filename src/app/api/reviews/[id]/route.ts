import { db } from "@/server/db";
import { requireAdmin } from "@/server/session";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

// PATCH /api/reviews/:id → แอดมินอนุมัติ / ไม่อนุมัติ
export async function PATCH(request: Request, { params }: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  let body: { status?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "ข้อมูลไม่ถูกต้อง" }, { status: 400 });
  }

  const status = body.status;
  if (status !== "approved" && status !== "rejected" && status !== "pending") {
    return Response.json({ error: "สถานะไม่ถูกต้อง" }, { status: 400 });
  }

  const res = db.prepare("UPDATE reviews SET status = ? WHERE id = ?").run(status, id);
  if (res.changes === 0) return Response.json({ error: "ไม่พบรีวิวนี้" }, { status: 404 });

  return Response.json({ ok: true });
}

// DELETE /api/reviews/:id → แอดมินลบทิ้งถาวร
export async function DELETE(_request: Request, { params }: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const res = db.prepare("DELETE FROM reviews WHERE id = ?").run(id);
  if (res.changes === 0) return Response.json({ error: "ไม่พบรีวิวนี้" }, { status: 404 });

  return Response.json({ ok: true });
}
