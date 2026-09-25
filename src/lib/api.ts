// ตัวเรียก API ของเว็บ (อยู่ในโปรเจกต์เดียวกัน เลยใช้ path ตรง ๆ ได้)
export type ApiReview = {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
  status?: "pending" | "approved" | "rejected";
};

export type ApiPhoto = { slot: string; url: string; caption: string };

async function json<T>(res: Response): Promise<T> {
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((body as { error?: string }).error ?? "เกิดข้อผิดพลาด ลองใหม่อีกครั้ง");
  return body as T;
}

export async function fetchReviews(all = false) {
  const res = await fetch(`/api/reviews${all ? "?all=1" : ""}`, { cache: "no-store" });
  return (await json<{ reviews: ApiReview[] }>(res)).reviews;
}

export async function submitReview(input: { user: string; rating: number; text: string; avatar?: string }) {
  const res = await fetch("/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return json<{ ok: true; id: string; message: string }>(res);
}

export async function setReviewStatus(id: string, status: "approved" | "rejected" | "pending") {
  const res = await fetch(`/api/reviews/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return json<{ ok: true }>(res);
}

export async function deleteReview(id: string) {
  return json<{ ok: true }>(await fetch(`/api/reviews/${id}`, { method: "DELETE" }));
}

export async function fetchPhotos() {
  const res = await fetch("/api/photos", { cache: "no-store" });
  return (await json<{ photos: Record<string, ApiPhoto> }>(res)).photos;
}

export async function uploadPhoto(slot: string, file: File, caption: string) {
  const form = new FormData();
  form.set("slot", slot);
  form.set("caption", caption);
  form.set("file", file);
  return json<ApiPhoto & { ok: true }>(await fetch("/api/photos", { method: "POST", body: form }));
}

export async function deletePhoto(slot: string) {
  return json<{ ok: true }>(await fetch(`/api/photos/${slot}`, { method: "DELETE" }));
}

export async function fetchAdminSession() {
  return (await json<{ admin: boolean }>(await fetch("/api/admin/session", { cache: "no-store" }))).admin;
}

export async function adminLogin(password: string) {
  const res = await fetch("/api/admin/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  return json<{ ok: true; admin: true }>(res);
}

export async function adminLogout() {
  return json<{ ok: true }>(await fetch("/api/admin/session", { method: "DELETE" }));
}
