"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { S, makeCustom, render, setCustom } from "@/lib/booth";
import { useFonts } from "@/lib/useFonts";

const PATS = [["none", "Polos"], ["dots", "Titik"], ["stripes", "Garis"], ["grid", "Kotak"], ["gingham", "Gingham"]];
const TITLES = [["serif", "Serif miring"], ["pf", "Koran tebal"], ["script", "Tulisan tangan"], ["sans", "Sans tebal"]];

export default function Build() {
  const router = useRouter();
  const cv = useRef<HTMLCanvasElement>(null);
  const fonts = useFonts();
  const [o, setO] = useState({ bg: "#F3EADB", pat: "dots", pc: "#6B4F3A", fc: "#FFFFFF", ink: "#5A4636", p: 10, r: 0, title: "serif", tape: false });
  const [cap, setCap] = useState(S.cap);
  const [sub, setSub] = useState(S.sub);
  const up = (patch: Record<string, any>) => setO((x) => ({ ...x, ...patch }));

  useEffect(() => {
    S.cap = cap;
    S.sub = sub;
    if (cv.current) render(cv.current, [], false, makeCustom(o), true);
  }, [o, cap, sub, fonts]);

  const color = (k: string, label: string) => (
    <label className="field">{label}<input type="color" value={(o as any)[k]} onChange={(e) => up({ [k]: e.target.value })} /></label>
  );

  return (
    <section>
      <div className="grid">
        <div className="wrap"><div className="stage"><canvas ref={cv} aria-label="Pratinjau bingkai buatanmu" /></div></div>
        <div>
          <h1>Buat <em>bingkaimu</em></h1>
          <p className="lead">Atur warna, pola, dan judul. Hasilnya langsung bisa dipakai di photobooth.</p>
          <div className="sec"><h2>Warna</h2><div className="colors">{color("bg", "Latar")}{color("pc", "Pola")}{color("fc", "Bingkai foto")}{color("ink", "Teks")}</div></div>
          <div className="sec"><h2>Pola latar</h2><div className="row">{PATS.map(([id, n]) => <button key={id} className="chip" aria-pressed={o.pat === id} onClick={() => up({ pat: id })}>{n}</button>)}</div></div>
          <div className="sec"><h2>Gaya judul</h2><div className="row">{TITLES.map(([id, n]) => <button key={id} className="chip" aria-pressed={o.title === id} onClick={() => up({ title: id })}>{n}</button>)}</div></div>
          <div className="sec">
            <h2><label htmlFor="rp">Tebal tepi foto</label></h2>
            <input id="rp" type="range" min={0} max={24} value={o.p} onChange={(e) => up({ p: +e.target.value })} />
            <h2 style={{ marginTop: 12 }}><label htmlFor="rr">Sudut membulat</label></h2>
            <input id="rr" type="range" min={0} max={40} value={o.r} onChange={(e) => up({ r: +e.target.value })} />
            <div className="row" style={{ marginTop: 12 }}><button className="chip" aria-pressed={o.tape} onClick={() => up({ tape: !o.tape })}>Selotip di atas foto</button></div>
          </div>
          <div className="sec">
            <h2><label htmlFor="bc">Judul</label></h2>
            <input id="bc" type="text" maxLength={22} value={cap} onChange={(e) => setCap(e.target.value)} placeholder="Judul bingkai" />
            <h2 style={{ marginTop: 12 }}><label htmlFor="bs">Tulisan kecil</label></h2>
            <input id="bs" type="text" maxLength={30} value={sub} onChange={(e) => setSub(e.target.value)} placeholder="mis. Edisi 2026" />
          </div>
          <div className="stack"><button className="cta" onClick={() => { setCustom(o); router.push("/booth"); }}>Pakai di photobooth</button></div>
        </div>
      </div>
    </section>
  );
}
