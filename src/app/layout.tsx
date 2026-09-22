import type { Metadata, Viewport } from "next";
import { Mali, Noto_Sans_Thai } from "next/font/google";
import { FloatingCall } from "@/components/FloatingCall";
import { Footer } from "@/components/Footer";
import { TopBar } from "@/components/TopBar";
import { site } from "@/data/site";
import "./globals.css";

const mali = Mali({
  variable: "--font-mali",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
});

const notoThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
});

const title = `${site.name} | ${site.nameEn} — ${site.tagline}`;
const description =
  "หมูปิ้งย่างสดหน้าร้าน ไม้ละ 5 บาท ข้าวเหนียวห่อละ 5 บาท เริ่มขายตี 4 ครึ่ง ขายจนกว่าจะหมด ลาดกระบัง ซอย 7";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3003"),
  title: { default: title, template: `%s — ${site.name}` },
  description,
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: site.name,
    title,
    description,
    images: [{ url: "/images/moo-ping-leaf.jpg", width: 1200, height: 900, alt: site.name }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/images/moo-ping-leaf.jpg"] },
};

export const viewport: Viewport = {
  themeColor: "#8b4e2f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={`${mali.variable} ${notoThai.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <TopBar />
        <FloatingCall />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
