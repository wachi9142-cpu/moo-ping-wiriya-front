# API — หมูปิ้งวิริญา

สเปกนี้คือ **สิ่งที่ทำงานอยู่จริงแล้ว** ใน `src/app/api/` ของโปรเจกต์ front
(Next.js Route Handlers + SQLite ผ่าน `node:sqlite`)

ถ้าจะย้ายไป backend แยก ให้ทำ endpoint ตามสเปกนี้ให้ครบ แล้วฝั่ง front
แก้แค่ base URL ที่ `src/lib/api.ts` ที่เดียว

---

## การยืนยันตัวตน

- ใช้ **cookie** ชื่อ `wiriya_admin` (`httpOnly`, `sameSite=lax`, `secure` เมื่อ production)
- ค่าใน cookie = `<เวลาหมดอายุ epoch ms>.<HMAC-SHA256 ของเวลานั้น ด้วย ADMIN_SESSION_SECRET>`
- อายุ 12 ชั่วโมง
- มีแอดมินคนเดียว ใช้รหัสผ่านจาก env `ADMIN_PASSWORD` (ยังไม่มีระบบ user หลายคน)

endpoint ที่ต้องเป็นแอดมิน ถ้าไม่ได้ล็อกอินต้องตอบ `401` พร้อม body
`{ "error": "ต้องเข้าสู่ระบบแอดมินก่อน" }`

---

## รีวิว

### `GET /api/reviews`
สาธารณะ — คืนเฉพาะรีวิวที่ `status = approved` เรียงใหม่ → เก่า

```json
{ "reviews": [
  { "id": "uuid", "user": "คุณลูกค้า", "avatar": "🙂",
    "rating": 5, "text": "อร่อยมาก", "date": "2026-09-25" }
] }
```

### `GET /api/reviews?all=1`
**แอดมินเท่านั้น** — คืนทุกสถานะ และมี field `status` เพิ่ม
(`pending` | `approved` | `rejected`)

### `POST /api/reviews`
สาธารณะ — ลูกค้าส่งรีวิว บันทึกเป็น `status = pending` เสมอ

```json
{ "user": "ชื่อ (ไม่บังคับ)", "rating": 5, "text": "ข้อความ", "avatar": "🙂" }
```

กติกาตรวจข้อมูล:
- `text` ต้องไม่ว่าง และยาวไม่เกิน 500 ตัวอักษร
- `user` ยาวไม่เกิน 40 ตัวอักษร ถ้าไม่ส่งมาให้ใช้ `"คุณลูกค้า"`
- `rating` ต้องเป็นจำนวนเต็ม 1–5
- `avatar` รับเฉพาะใน allow-list: `🙂 😋 😍 🐱 🧑 🧔 👵 👩` นอกนั้นใช้ `🙂`

ตอบ `201` → `{ "ok": true, "id": "...", "message": "ขอบคุณค่ะ รีวิวจะแสดงหลังร้านตรวจสอบ" }`
ผิดกติกา → `400` พร้อม `{ "error": "ข้อความภาษาไทยที่แสดงให้ลูกค้าเห็นได้เลย" }`

### `PATCH /api/reviews/:id` — แอดมิน
```json
{ "status": "approved" }
```
รับได้ 3 ค่า: `approved` | `rejected` | `pending` · ไม่พบ id → `404`

### `DELETE /api/reviews/:id` — แอดมิน
ลบถาวร · ไม่พบ id → `404`

---

## รูปหน้าร้าน

รูปผูกกับ **ช่อง (slot)** ที่กำหนดไว้ล่วงหน้าใน `src/data/site.ts` → `photoSlots`
(เช่น `stall`, `pork`, `rice`, `laundry`, `coin`, `sign`, …) หนึ่งช่องมีได้รูปเดียว

### `GET /api/photos`
สาธารณะ — map ของช่องที่มีรูปแล้ว

```json
{ "photos": {
  "coin": { "slot": "coin", "url": "/api/photos/coin/file?v=1790312950709",
            "caption": "ร้านวิของชำ จุดแลกเหรียญ" }
} }
```

### `GET /api/photos/:slot/file`
สาธารณะ — ส่งไฟล์รูปจริง พร้อม `Content-Type` ที่ถูกต้อง
และ `Cache-Control: public, max-age=31536000, immutable`
(URL มี `?v=<timestamp>` กันแคชค้างตอนเปลี่ยนรูป)

### `POST /api/photos` — แอดมิน
`multipart/form-data` · fields: `slot`, `caption`, `file`

- `slot` ต้องตรง `^[a-z0-9_-]{1,40}$`
- ไฟล์ไม่เกิน **6 MB** → เกิน ตอบ `413`
- รับเฉพาะ `image/jpeg`, `image/png`, `image/webp` → นอกนั้น `415`
- อัปทับช่องเดิมได้ (upsert) และต้อง**ลบไฟล์เก่าทิ้ง**
- ฝั่ง front ย่อรูปเหลือด้านยาว 1600px คุณภาพ 0.82 ก่อนส่งอยู่แล้ว

ตอบ `201` → `{ "ok": true, "slot": "...", "url": "...", "caption": "..." }`

### `DELETE /api/photos/:slot` — แอดมิน
ลบทั้ง record และไฟล์ · ไม่พบ → `404`

---

## เข้าสู่ระบบ

| | |
|---|---|
| `GET /api/admin/session` | `{ "admin": true \| false }` |
| `POST /api/admin/session` | body `{ "password": "..." }` → ถูก: ตั้ง cookie + `{ "ok": true, "admin": true }` · ผิด: `401` |
| `DELETE /api/admin/session` | ลบ cookie → `{ "ok": true, "admin": false }` |

---

## ที่เก็บข้อมูล

| อะไร | อยู่ที่ไหน |
|---|---|
| ฐานข้อมูล | `data/wiriya.db` (SQLite) |
| ไฟล์รูป | `data/uploads/` — อยู่นอก `public/` จึงต้องเสิร์ฟผ่าน route |
| ความลับ | `.env.local` → `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` |

โฟลเดอร์ `data/` อยู่ใน `.gitignore` — **สำรองข้อมูล = copy โฟลเดอร์นี้ทั้งอัน**

ตาราง:

```sql
reviews(id TEXT PK, user TEXT, avatar TEXT, rating INT,
        text TEXT, status TEXT, created_at TEXT)

photos(slot TEXT PK, file TEXT, mime TEXT,
       caption TEXT, created_at TEXT)
```

---

## ถ้าย้ายไป backend แยก ต้องได้สิ่งเหล่านี้

1. **Base URL** ของ API (dev + production)
2. **เปิด CORS** ให้โดเมนของ front รวมถึง `http://localhost:3003` ตอน dev
   และต้องตั้ง `Access-Control-Allow-Credentials: true` ถ้ายังใช้ cookie
3. ถ้าเปลี่ยนไปใช้ **JWT ใน header** แทน cookie ต้องบอก เพราะ `src/lib/api.ts`
   ต้องแก้ให้แนบ `Authorization` และเก็บ token เอง
4. **ข้อความ error เป็นภาษาไทย** ใน field `error` — หน้าเว็บเอาไปโชว์ให้ลูกค้าตรง ๆ
5. ถ้ารูปย้ายไปโดเมนอื่น ต้องเพิ่ม `images.remotePatterns` ใน `next.config.ts`

---

## สิ่งที่ยังไม่ได้ทำ (ถ้าจะทำต่อ)

- ข้อมูลร้าน/เมนู/ราคา/เบอร์โทร ยังฮาร์ดโค้ดใน `src/data/site.ts` — ยังไม่มี API
- ปุ่ม "วันนี้ของหมดแล้ว" ให้แอดมินกดเอง (ตอนนี้คำนวณจากเวลาคงที่)
- ระบบแอดมินหลายคน / log ว่าใครอนุมัติอะไร
- กันสแปมรีวิว (rate limit ต่อ IP, captcha)
