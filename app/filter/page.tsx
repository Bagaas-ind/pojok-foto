"use client";
import { useEffect, useRef, useState } from "react";
import { FILTERS, snapFilter } from "@/lib/booth";

export default function FilterCam() {
  const video = useRef<HTMLVideoElement>(null);
  const stream = useRef<MediaStream | null>(null);
  const [fi, setFi] = useState(1);
  const [facing, setFacing] = useState<"user" | "environment">("user");
  const [photo, setPhoto] = useState<string | null>(null);
  const [err, setErr] = useState("");

  const stop = () => {
    stream.current?.getTracks().forEach((t) => t.stop());
    stream.current = null;
  };

  useEffect(() => {
    if (photo) return;
    let live = true;
    (async () => {
      try {
        stop();
        const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 960 } }, audio: false });
        if (!live) { s.getTracks().forEach((t) => t.stop()); return; }
        stream.current = s;
        if (video.current) { video.current.srcObject = s; await video.current.play(); }
        setErr("");
      } catch {
        setErr("Kamera tidak bisa dibuka. Izinkan akses kamera di browser.");
      }
    })();
    return () => { live = false; stop(); };
  }, [facing, photo]);

  const snap = () => {
    const v = video.current;
    if (!v || !v.videoWidth) return;
    setPhoto(snapFilter(v, v.videoWidth, v.videoHeight, facing === "user", 3 / 4, fi).toDataURL("image/png"));
  };

  const save = async () => {
    if (!photo) return;
    const b = await (await fetch(photo)).blob();
    const f = new File([b], "filter-cam.png", { type: "image/png" });
    if (navigator.canShare && navigator.canShare({ files: [f] })) {
      try { await navigator.share({ files: [f], title: "Filter Cam" }); return; } catch (e: any) { if (e.name === "AbortError") return; }
    }
    const a = document.createElement("a");
    a.href = URL.createObjectURL(b);
    a.download = "filter-cam.png";
    document.body.append(a); a.click(); a.remove();
  };

  return (
    <section>
      <h1>Filter <em>cam</em></h1>
      <p className="lead">Satu foto dengan filter film. Pilih filter, lalu jepret.</p>
      <div className="cam" style={{ marginTop: 16 }}>
        <div className="vf" style={{ ["--ar" as any]: 3 / 4 }}>
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo} alt="Hasil Filter Cam" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <video ref={video} playsInline muted style={{ transform: facing === "user" ? "scaleX(-1)" : "none", filter: FILTERS[fi].f }} />
          )}
        </div>
        {err && <p className="hint" style={{ color: "#F5EEE6" }}>{err}</p>}
        {!photo && (
          <div className="row" style={{ justifyContent: "center" }}>
            {FILTERS.map((f: any, i: number) => <button key={f.n} className="chip" aria-pressed={i === fi} onClick={() => setFi(i)}>{f.n}</button>)}
          </div>
        )}
        <div className="camctl">
          {photo ? (
            <>
              <button className="cta" onClick={save}>Simpan foto</button>
              <button className="ghost" onClick={() => setPhoto(null)}>Ulangi</button>
            </>
          ) : (
            <>
              <button className="cta" onClick={snap}>Jepret</button>
              <button className="ghost" onClick={() => setFacing((f) => (f === "user" ? "environment" : "user"))}>Putar kamera</button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
