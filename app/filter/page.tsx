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
  const [ready, setReady] = useState(false);

  const stop = () => {
    stream.current?.getTracks().forEach((t) => t.stop());
    stream.current = null;
  };

  useEffect(() => {
    if (photo) return;
    let live = true;
    setReady(false);
    setErr("");
    (async () => {
      try {
        stop();
        if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
          throw new Error("Akses kamera memerlukan HTTPS atau browser yang mendukung kamera.");
        }
        const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: facing }, width: { ideal: 1280 }, height: { ideal: 960 } }, audio: false });
        if (!live) { s.getTracks().forEach((t) => t.stop()); return; }
        stream.current = s;
        s.getVideoTracks()[0]?.addEventListener("ended", () => {
          setReady(false);
          setErr("Koneksi kamera terputus. Putar kamera atau muat ulang halaman untuk mencoba lagi.");
        }, { once: true });
        if (video.current) { video.current.srcObject = s; await video.current.play(); }
        if (live) setErr("");
      } catch (error) {
        if (!live) return;
        const name = error instanceof DOMException ? error.name : "";
        setErr(name === "NotAllowedError" ? "Izin kamera ditolak. Aktifkan izin kamera di pengaturan browser." : error instanceof Error ? error.message : "Kamera tidak bisa dibuka. Periksa izin kamera.");
      }
    })();
    return () => { live = false; stop(); };
  }, [facing, photo]);

  const snap = () => {
    const v = video.current;
    if (!v || !ready || !v.videoWidth || !v.videoHeight) return;
    setPhoto(snapFilter(v, v.videoWidth, v.videoHeight, facing === "user", 3 / 4, fi).toDataURL("image/png"));
  };

  const save = async () => {
    if (!photo) return;
    let url: string | null = null;
    try {
      const b = await (await fetch(photo)).blob();
      const f = new File([b], "filter-cam.png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [f] })) {
        try { await navigator.share({ files: [f], title: "Filter Cam" }); return; }
        catch (error) { if (error instanceof DOMException && error.name === "AbortError") return; }
      }
      const a = document.createElement("a");
      url = URL.createObjectURL(b);
      a.href = url;
      a.download = "filter-cam.png";
      document.body.append(a); a.click(); a.remove();
    } catch {
      setErr("Foto gagal disimpan. Coba lagi atau gunakan browser lain.");
    } finally {
      if (url) window.setTimeout(() => URL.revokeObjectURL(url!), 1000);
    }
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
            <video ref={video} playsInline muted onLoadedMetadata={() => setReady(true)} onCanPlay={() => setReady(true)} style={{ transform: facing === "user" ? "scaleX(-1)" : "none", filter: FILTERS[fi].f }} />
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
              <button className="cta" disabled={!ready} onClick={snap}>Jepret</button>
              <button className="ghost" onClick={() => setFacing((f) => (f === "user" ? "environment" : "user"))}>Putar kamera</button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
