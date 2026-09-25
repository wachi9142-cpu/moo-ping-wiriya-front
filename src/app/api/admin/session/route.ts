import { checkPassword, endSession, isAdmin, startSession } from "@/server/session";

export const dynamic = "force-dynamic";

// GET → ตอนนี้ล็อกอินอยู่ไหม
export async function GET() {
  return Response.json({ admin: await isAdmin() });
}

// POST → เข้าสู่ระบบด้วยรหัสผ่านแอดมิน
export async function POST(request: Request) {
  let body: { password?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "ข้อมูลไม่ถูกต้อง" }, { status: 400 });
  }

  const password = typeof body.password === "string" ? body.password : "";
  if (!password || !checkPassword(password)) {
    return Response.json({ error: "รหัสผ่านไม่ถูกต้อง" }, { status: 401 });
  }

  await startSession();
  return Response.json({ ok: true, admin: true });
}

// DELETE → ออกจากระบบ
export async function DELETE() {
  await endSession();
  return Response.json({ ok: true, admin: false });
}
