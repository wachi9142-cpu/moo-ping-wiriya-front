import "server-only";

import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";

// ข้อมูลทั้งหมดเก็บในไฟล์เดียว data/wiriya.db (สำรองข้อมูล = copy โฟลเดอร์ data)
// ใช้ node:sqlite ที่ติดมากับ Node เลย ไม่ต้องลง package เพิ่ม
export const DATA_DIR = path.join(process.cwd(), "data");
export const UPLOAD_DIR = path.join(DATA_DIR, "uploads");

function connect() {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  const db = new DatabaseSync(path.join(DATA_DIR, "wiriya.db"));
  db.exec("PRAGMA journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS reviews (
      id         TEXT PRIMARY KEY,
      user       TEXT NOT NULL,
      avatar     TEXT NOT NULL DEFAULT '🙂',
      rating     INTEGER NOT NULL,
      text       TEXT NOT NULL,
      status     TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS photos (
      slot       TEXT PRIMARY KEY,
      file       TEXT NOT NULL,
      mime       TEXT NOT NULL,
      caption    TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL
    );
  `);
  return db;
}

// dev ของ Next รีโหลดโมดูลบ่อย — เก็บ connection ไว้บน globalThis กันเปิดไฟล์ซ้ำ
const g = globalThis as typeof globalThis & { __wiriyaDb?: DatabaseSync };
export const db = g.__wiriyaDb ?? (g.__wiriyaDb = connect());

export type ReviewStatus = "pending" | "approved" | "rejected";

export type ReviewRow = {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  text: string;
  status: ReviewStatus;
  created_at: string;
};

export type PhotoRow = {
  slot: string;
  file: string;
  mime: string;
  caption: string;
  created_at: string;
};
