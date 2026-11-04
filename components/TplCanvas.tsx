"use client";
import { useEffect, useRef } from "react";
import { BGS, L, render } from "@/lib/booth";
import { useFonts } from "@/lib/useFonts";

export default function TplCanvas({ id, w = 120, k = "" }: { id: string; w?: number; k?: string }) {
  const r = useRef<HTMLCanvasElement>(null);
  const f = useFonts();
  useEffect(() => {
    const b = BGS.find((x: any) => x.id === id);
    const c = r.current;
    if (!b || !c) return;
    const l = L(), big = document.createElement("canvas");
    render(big, [], false, b, true);
    c.width = w * 2;
    c.height = Math.round((w * 2 * l.H) / l.W);
    c.getContext("2d")!.drawImage(big, 0, 0, c.width, c.height);
  }, [id, w, k, f]);
  return <canvas ref={r} style={{ width: w, height: "auto", display: "block" }} />;
}
