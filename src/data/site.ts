export const site = {
  name: "ร้านหมูปิ้งวิริญา",
  shortName: "หมูปิ้งวิริญา",
  tagline: "ข้าวเหนียวหมูปิ้ง ไม้ละ 5 บาท ย่างสด ๆ ขายทุกเช้า",
  address: "ซ. ลาดกระบัง 7 แขวงลาดกระบัง เขตลาดกระบัง กรุงเทพมหานคร 10520",
  location: "ข้างบ้าน ติดกับหมู่บ้าน/ซอยประเสริฐสุข — บริเวณเดียวกับร้านน้ำเต้าหู้ Pumpkin&Melone และวิของชำ",
  mapsUrl: "https://maps.app.goo.gl/7V3KssWFJXyhYwPL8",
  mapsEmbed:
    "https://www.google.com/maps?q=220/11+ซ.+ลาดกระบัง+7+แขวงลาดกระบัง+เขตลาดกระบัง+กรุงเทพมหานคร+10520&output=embed",
  // เริ่มขายประมาณตี 4 ครึ่ง ขายจนกว่าจะหมด (โดยทั่วไปเก็บร้านราว 9 โมง)
  open: "04:30",
  closeApprox: "09:00",
  callFirst:
    "ร้านย่างและขายไปพร้อมกัน และขายจนกว่าสินค้าจะหมด หากหมูปิ้งหมดก่อนเวลาที่คาดไว้ ร้านอาจปิดก่อนเวลา",
};

export type Owner = { name: string; phone: string; phoneDisplay: string };

export const owners: Owner[] = [
  { name: "คุณต๋อง", phone: "0652325188", phoneDisplay: "065-232-5188" },
  { name: "คุณนิ", phone: "0991017429", phoneDisplay: "099-101-7429" },
];

export type MenuItem = { name: string; price: number; unit: string; desc: string; image: string; badge?: string };

export const menu: MenuItem[] = [
  {
    name: "หมูปิ้ง",
    price: 5,
    unit: "บาท / ไม้",
    desc: "หมูหมักสูตรร้าน ย่างบนเตาถ่านจนหอม นุ่ม ฉ่ำ ไม่แห้ง",
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
  "🔥 ย่างสด ๆ หน้าร้าน ขายไปย่างไป",
  "⏰ ขายจนกว่าของจะหมด — โดยทั่วไปเก็บร้านราว 09:00 น. แต่ไม่แน่นอน",
  "🛵 ไม่มีบริการ Delivery ซื้อที่หน้าร้านเท่านั้น",
];

export type Photo = { src: string; caption: string };

export const gallery: Photo[] = [
  { src: "/images/storefront.jpg", caption: "หน้าร้าน — ย่างและขายกันตรงนี้เลย" },
  { src: "/images/sign.jpg", caption: "ป้ายร้าน ข้าวเหนียวหมูปิ้ง ไม้ละ 5 บาท" },
  { src: "/images/moo-ping-leaf.jpg", caption: "หมูปิ้งย่างใหม่ ๆ บนใบตอง" },
  { src: "/images/closeup.jpg", caption: "หมูนุ่ม ฉ่ำ ๆ ใกล้ ๆ" },
  { src: "/images/skewers-leaf.jpg", caption: "ไม้ละ 5 บาท ซื้อกี่ไม้ก็ได้" },
  { src: "/images/two-skewers.jpg", caption: "ย่างเสร็จใหม่ ๆ ร้อน ๆ" },
  { src: "/images/sticky-rice.jpg", caption: "ข้าวเหนียวร้อน ๆ" },
  { src: "/images/sticky-rice-pack.jpg", caption: "ข้าวเหนียวห่อละ 5 บาท" },
];

export const laundry = {
  title: "เครื่องซักผ้าหยอดเหรียญ",
  intro: "นอกจากหมูปิ้งแล้ว หน้าร้านยังมีเครื่องซักผ้าหยอดเหรียญให้บริการตลอด 24 ชั่วโมง",
  image: "/images/laundry.jpg",
  details: ["🟢 เปิด 24 ชั่วโมง", "🧺 มี 3 เครื่อง: 30 / 30 / 40 บาทต่อครั้ง", "💰 เริ่มต้น 30 บาท", "🪙 ใช้เหรียญ 10 บาทในการหยอดเครื่อง"],
  coinExchange: {
    place: "วิของชำ (ร้านข้าง ๆ)",
    hours: "05:30–21:00 น.",
    warning: "แลกเหรียญได้เฉพาะช่วงที่ร้านวิของชำเปิด — เครื่องซักผ้าเปิด 24 ชม. แต่หากร้านวิของชำปิด จะไม่สามารถแลกเหรียญที่ร้านได้",
  },
  support: {
    intro: "หากพบปัญหาขณะใช้เครื่องซักผ้า สามารถติดต่อเจ้าของเครื่องได้โดยตรง",
    owners: [
      { name: "คุณต๋อง", phone: "0652325188", phoneDisplay: "065-232-5188" },
      { name: "คุณใหม่", phone: "0990354032", phoneDisplay: "099-035-4032" },
    ] as Owner[],
    fallback: { place: "ร้านวิของชำ", phone: "0959375014", phoneDisplay: "095-937-5014" },
  },
};

export type Review = { id: string; user: string; avatar: string; rating: number; text: string; date: string };

export const reviews: Review[] = [
  { id: "w1", user: "ฟ่าง", avatar: "🐱", rating: 5, text: "หมูปิ้งหอมมาก ตอนเช้าแวะซื้อก่อนออกไปทำงาน อร่อยดีค่ะ", date: "2026-09-18" },
  { id: "w2", user: "ลูกค้าหน้าร้าน", avatar: "🧑", rating: 4, text: "หมูนุ่ม ข้าวเหนียวร้อน ๆ ราคาไม่แพง", date: "2026-09-12" },
  { id: "w3", user: "พี่ต้น", avatar: "🧔", rating: 5, text: "ไม้ละ 5 บาท ซื้อ 10 ไม้ก็แค่ 50 อิ่มทั้งบ้าน ต้องมาเช้า ๆ ไม่งั้นหมด", date: "2026-09-05" },
];
