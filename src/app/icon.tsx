import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// favicon: ไม้หมูปิ้งบนพื้นดำ-ทอง ตามป้ายร้าน
export default function Icon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#8b4e2f", borderRadius: 14, fontSize: 40 }}>
      🍢
    </div>,
    size,
  );
}
