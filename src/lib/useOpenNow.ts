"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

export type OpenState = { open: boolean } | null;

// ร้านเปิดตี 4 ครึ่ง ขายจนหมด (โดยทั่วไปราว 7 โมง) — เช็คตามเวลาไทย
export function useOpenNow(): OpenState {
  const [state, setState] = useState<OpenState>(null);
  useEffect(() => {
    const check = () => {
      const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" }));
      const [oh, om] = site.open.split(":").map(Number);
      const [ch, cm] = site.closeApprox.split(":").map(Number);
      const mins = now.getHours() * 60 + now.getMinutes();
      setState({ open: mins >= oh * 60 + om && mins < ch * 60 + cm });
    };
    check();
    const t = setInterval(check, 60_000);
    return () => clearInterval(t);
  }, []);
  return state;
}
