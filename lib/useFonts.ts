"use client";
import { useEffect, useState } from "react";

// Menunggu huruf Google Fonts termuat supaya canvas tidak memakai huruf cadangan.
export function useFonts() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const f = ['900 40px "Playfair Display"', 'italic 400 40px "Instrument Serif"', '400 40px "Pinyon Script"', '700 20px "DM Sans"'];
    Promise.all(f.map((x) => document.fonts.load(x))).then(() => setN(1), () => {});
  }, []);
  return n;
}
