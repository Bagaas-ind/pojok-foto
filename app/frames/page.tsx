"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BGS, LAYOUTS, S } from "@/lib/booth";
import TplCanvas from "@/components/TplCanvas";

export default function Frames() {
  const router = useRouter();
  const [lay, setLay] = useState<string>(S.layout);
  const pick = (id: string) => {
    S.bg = id;
    S.layout = lay;
    S.items = [];
    router.push("/booth");
  };
  return (
    <section>
      <h1>Galeri <em>frame</em></h1>
      <p className="lead">Pilih tata letak, lalu ketuk template yang kamu suka untuk langsung dipakai.</p>
      <div className="row" style={{ margin: "16px 0" }}>
        {Object.entries(LAYOUTS).map(([id, l]: [string, any]) => (
          <button key={id} className="chip" aria-pressed={id === lay} onClick={() => { setLay(id); S.layout = id; }}>{l.name}</button>
        ))}
      </div>
      <div className="gal">
        {BGS.map((b: any) => (
          <button key={b.id} className="frm" onClick={() => pick(b.id)} aria-label={"Pakai template " + b.name}>
            <TplCanvas id={b.id} w={130} k={lay} />
            <span>{b.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
