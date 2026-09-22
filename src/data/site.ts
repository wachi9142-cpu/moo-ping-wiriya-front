export const site = {
  name: "หมูปิ้งวิริญา",
  nameEn: "Wiriya Moo Ping",
  tagline: "ข้าวเหนียวหมูปิ้ง ไม้ละ 5 บาท ย่างสด ๆ ขายทุกเช้า",
  address: "ซ. ลาดกระบัง 7 แขวงลาดกระบัง เขตลาดกระบัง กรุงเทพมหานคร 10520",
  location: "ข้างบ้าน ติดกับหมู่บ้าน/ซอยประเสริฐสุข — บริเวณเดียวกับร้านน้ำเต้าหู้ Pumpkin&Melone และวิของชำ",
  mapsUrl: "https://maps.app.goo.gl/7V3KssWFJXyhYwPL8",
  mapsEmbed:
    "https://www.google.com/maps?q=220/11+ซ.+ลาดกระบัง+7+แขวงลาดกระบัง+เขตลาดกระบัง+กรุงเทพมหานคร+10520&output=embed",
  // เริ่มขายประมาณตี 4 ครึ่ง โดยทั่วไปขายถึงราว 7 โมง แต่ขายจนกว่าจะหมด (บางวันหมดก่อน)
  open: "04:30",
  closeApprox: "07:00",
  callFirst:
    "หมูปิ้งขายในช่วงเช้าและจำนวนมีจำกัด เวลาหมดในแต่ละวันไม่แน่นอน หากต้องการซื้อหมูปิ้ง แนะนำโทรสอบถามก่อนเดินทางมา เพื่อเช็กว่าวันนั้นยังมีของอยู่หรือไม่",
};

export type Owner = { name: string; phone: string; phoneDisplay: string };

// ติดต่อร้านหมูปิ้ง
export const owners: Owner[] = [
  { name: "คุณต๋อง", phone: "0652325188", phoneDisplay: "065-232-5188" },
  { name: "คุณใหม่", phone: "0624314828", phoneDisplay: "062-431-4828" },
];

export type MenuItem = { name: string; price: number; unit: string; desc: string; image: string; badge?: string };

export const menu: MenuItem[] = [
  {
    name: "หมูปิ้ง",
    price: 5,
    unit: "บาท / ไม้",
    desc: "หมูหมักสูตรร้าน ย่างบนเตาถ่านและขายไปพร้อมกันในช่วงเช้า นุ่ม ฉ่ำ หอมควันถ่าน",
    image: "/images/moo-ping-sq.jpg",
    badge: "ขายดี",
  },
  {
    name: "ข้าวเหนียว",
    price: 5,
    unit: "บาท / ห่อ",
    desc: "ข้าวเหนียวนึ่งใหม่ ร้อน ๆ ห่อพอดีคำ กินคู่หมูปิ้งลงตัว",
    image: "/images/sticky-rice-sq.jpg",
  },
];

export const details = [
  "🕟 เริ่มขายประมาณ 04:30 น.",
  "🔥 ย่างและขายไปพร้อมกันในช่วงเช้า",
  "⏰ โดยทั่วไปขายช่วงเช้าประมาณ 04:30–07:00 น.",
  "🍢 เวลาเลิกขายไม่แน่นอน เพราะขายจนกว่าหมูปิ้งจะหมด",
  "⚡ ปกติหมูปิ้งมักหมดค่อนข้างเร็ว บางวันอาจหมดก่อน 07:00 น.",
  "🛵 ไม่มีบริการ Delivery ซื้อที่หน้าร้านเท่านั้น",
];

// ช่องรูปในแกลเลอรี — ช่องที่ยังไม่มีรูปจะขึ้นปุ่ม "＋ เพิ่มภาพ…" ให้เพิ่มเองจากหน้าเว็บ
export type PhotoSlot = { id: string; label: string; emoji: string; src?: string; caption?: string };

export const photoSlots: PhotoSlot[] = [
  { id: "stall", label: "ร้าน/รถเข็นหมูปิ้ง", emoji: "🏠", src: "/images/storefront.jpg", caption: "หน้าร้าน — ย่างและขายกันตรงนี้เลย" },
  { id: "pork", label: "หมูปิ้ง", emoji: "🥩", src: "/images/moo-ping-leaf.jpg", caption: "หมูปิ้งย่างใหม่ ๆ บนใบตอง" },
  { id: "rice", label: "ข้าวเหนียว", emoji: "🍚", src: "/images/sticky-rice.jpg", caption: "ข้าวเหนียวร้อน ๆ" },
  { id: "laundry", label: "เครื่องซักผ้า", emoji: "🧺", src: "/images/laundry.jpg", caption: "เครื่องซักผ้าหยอดเหรียญ ถัง 30 / 40 บาท" },
  { id: "coin", label: "บริเวณจุดแลกเหรียญ", emoji: "🪙" },
  { id: "sign", label: "ป้ายร้าน", emoji: "🪧", src: "/images/sign.jpg", caption: "ป้ายร้าน ข้าวเหนียวหมูปิ้ง ไม้ละ 5 บาท" },
  { id: "closeup", label: "หมูปิ้งใกล้ ๆ", emoji: "🔍", src: "/images/closeup.jpg", caption: "หมูนุ่ม ฉ่ำ ๆ ใกล้ ๆ" },
  { id: "skewers", label: "หมูปิ้งหลายไม้", emoji: "🍢", src: "/images/skewers-leaf.jpg", caption: "ไม้ละ 5 บาท ซื้อกี่ไม้ก็ได้" },
  { id: "fresh", label: "ย่างเสร็จใหม่ ๆ", emoji: "🔥", src: "/images/two-skewers.jpg", caption: "ย่างเสร็จใหม่ ๆ ร้อน ๆ" },
  { id: "ricepack", label: "ข้าวเหนียวห่อ", emoji: "🛍️", src: "/images/sticky-rice-pack.jpg", caption: "ข้าวเหนียวห่อละ 5 บาท" },
  { id: "morning", label: "บรรยากาศตอนเช้า", emoji: "🌅" },
  { id: "extra", label: "รูปอื่น ๆ", emoji: "📷" },
];

export const laundry = {
  title: "เครื่องซักผ้าหยอดเหรียญ",
  intro: "นอกจากหมูปิ้งแล้ว บริเวณร้านยังมีเครื่องซักผ้าหยอดเหรียญให้บริการ",
  separateNote: "📌 เครื่องซักผ้าหยอดเหรียญเป็นบริการแยกจากร้านหมูปิ้ง",
  hoursNote: "สามารถใช้บริการได้ตามเวลาที่เครื่องเปิดให้บริการ",
  image: "/images/laundry.jpg",
  prices: ["🪙 เริ่มต้น 30 บาท", "🧺 ถัง 30 บาท", "🧺 ถัง 40 บาท", "🪙 ใช้เหรียญ 10 บาท"],
  coinExchange: {
    title: "จุดแลกเหรียญ 10 บาท",
    text: "สามารถนำเงินมาแลกเป็นเหรียญ 10 บาทได้ที่ร้านวิของชำ",
    place: "ร้านวิของชำ",
    hours: "05:30–21:00 น.",
    warning: "แลกเหรียญได้เฉพาะช่วงเวลาที่ร้านวิของชำเปิดเท่านั้น",
  },
  support: {
    intro: "หากพบปัญหาขณะใช้เครื่องซักผ้าหยอดเหรียญ สามารถแจ้งได้ 2 ทาง",
    ways: [
      { step: "1", title: "แจ้งร้านวิของชำ", text: "สามารถบอกทางร้านวิของชำให้ช่วยรับเรื่องได้" },
      { step: "2", title: "ติดต่อเจ้าของบ้าน/เจ้าของเครื่องโดยตรง", text: "สามารถโทรแจ้งปัญหาได้โดยตรงเพื่อให้ช่วยตรวจสอบเครื่อง" },
    ],
    owner: { name: "คุณต๋อง", phone: "0652325188", phoneDisplay: "065-232-5188" } as Owner,
    note: "📌 หากเครื่องมีปัญหา สามารถแจ้งร้านวิของชำได้ หรือโทรแจ้งเจ้าของบ้านโดยตรง",
  },
};

export type Review = { id: string; user: string; avatar: string; rating: number; text: string; date: string };

export const reviews: Review[] = [
  { id: "w1", user: "ฟ่าง", avatar: "🐱", rating: 5, text: "หมูปิ้งหอมมาก ตอนเช้าแวะซื้อก่อนออกไปทำงาน อร่อยดีค่ะ", date: "2026-09-18" },
  { id: "w2", user: "ลูกค้าหน้าร้าน", avatar: "🧑", rating: 4, text: "หมูนุ่ม ข้าวเหนียวร้อน ๆ ราคาไม่แพง", date: "2026-09-12" },
  { id: "w3", user: "พี่ต้น", avatar: "🧔", rating: 5, text: "ไม้ละ 5 บาท ซื้อ 10 ไม้ก็แค่ 50 อิ่มทั้งบ้าน ต้องมาเช้า ๆ ไม่งั้นหมด", date: "2026-09-05" },
];
