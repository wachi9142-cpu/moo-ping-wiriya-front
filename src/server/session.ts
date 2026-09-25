import "server-only";

import crypto from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "wiriya_admin";
const MAX_AGE = 60 * 60 * 12; // 12 ชั่วโมง

function secret() {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s) throw new Error("ยังไม่ได้ตั้ง ADMIN_SESSION_SECRET ใน .env");
  return s;
}

export function adminPassword() {
  const p = process.env.ADMIN_PASSWORD;
  if (!p) throw new Error("ยังไม่ได้ตั้ง ADMIN_PASSWORD ใน .env");
  return p;
}

// เปรียบเทียบรหัสผ่านแบบ timing-safe
export function checkPassword(input: string) {
  const a = Buffer.from(crypto.createHash("sha256").update(input).digest());
  const b = Buffer.from(crypto.createHash("sha256").update(adminPassword()).digest());
  return crypto.timingSafeEqual(a, b);
}

// token = <หมดอายุ>.<ลายเซ็น HMAC> — แก้เองไม่ได้เพราะไม่รู้ secret
function sign(expiresAt: number) {
  const mac = crypto.createHmac("sha256", secret()).update(String(expiresAt)).digest("hex");
  return `${expiresAt}.${mac}`;
}

function verify(token: string | undefined) {
  if (!token) return false;
  const [expRaw, mac] = token.split(".");
  const exp = Number(expRaw);
  if (!exp || !mac || Date.now() > exp) return false;
  const expected = crypto.createHmac("sha256", secret()).update(expRaw).digest("hex");
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function startSession() {
  const store = await cookies();
  store.set(COOKIE, sign(Date.now() + MAX_AGE * 1000), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function endSession() {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function isAdmin() {
  const store = await cookies();
  return verify(store.get(COOKIE)?.value);
}

// ใช้ต้นทางของ route ที่แอดมินเท่านั้นเรียกได้
export async function requireAdmin() {
  if (await isAdmin()) return null;
  return Response.json({ error: "ต้องเข้าสู่ระบบแอดมินก่อน" }, { status: 401 });
}
