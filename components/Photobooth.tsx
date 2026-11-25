"use client";

import { useEffect, useRef, useState } from "react";
import { S, LAYOUTS, BGS, FILTERS, L, render, toCell, exp } from "@/lib/booth";

type Screen = "setup" | "cam" | "res";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function Icon({ l }: { l: any }) {
  const r = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = r.current!.getContext("2d")!;
    const s = Math.min(22 / l.W, 32 / l.H);
    const ox = (26 - l.W * s) / 2, oy = (36 - l.H * s) / 2;
    c.clearRect(0, 0, 26, 36);
    c.fillStyle = "#C44A14";
    for (let i = 0; i < l.n; i++) {
      const [x, y, w, h] = l.cells(i);
      c.fillRect(ox + x * s, oy + y * s, w * s, h * s);
    }
  }, [l]);
  return <canvas ref={r} width={26} height={36} />;
}

function Thumb({ b, on, k, onPick }: { b: any; on: boolean; k: string; onPick: () => void }) {
  const r = useRef<HTMLCanvasElement>(null);
  const l = L();
  const tw = 64, th = Math.round((tw * l.H) / l.W);
  useEffect(() => {
    const big = document.createElement("canvas");
    render(big, [], false, b, true);
    const c = r.current!;
    c.width = tw * 2;
    c.height = th * 2;
    c.getContext("2d")!.drawImage(big, 0, 0, c.width, c.height);
  }, [k]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <button className="sw" aria-pressed={on} aria-label={"Template " + b.name} onClick={onPick}>
      <canvas ref={r} style={{ width: tw, height: th }} />
      <span>{b.name}</span>
    </button>
  );
}

export default function Photobooth() {
  const [, setTick] = useState(0);
  const bump = () => setTick((t) => t + 1);
  const set = (patch: Record<string, any>) => {
    Object.assign(S, patch);
    bump();
  };
  const [screen, setScreen] = useState<Screen>("setup");
  const [commit, setCommit] = useState(0);
  const [busy, setBusy] = useState(false);
  const [cd, setCd] = useState("");
  const [done, setDone] = useState(0);
  const [flash, setFlash] = useState(0);
  const [copies, setCopies] = useState(1);
  const [msg, setMsg] = useState("");
  const [importing, setImporting] = useState(false);
  const [cameraVersion, setCameraVersion] = useState(0);
  const [cameraReady, setCameraReady] = useState(false);
  const runId = useRef(0);

  const prev = useRef<HTMLCanvasElement>(null);
  const out = useRef<HTMLCanvasElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const file = useRef<HTMLInputElement>(null);
  const stream = useRef<MediaStream | null>(null);

  const toast = (m: string) => {
    setMsg(m);
    window.setTimeout(() => setMsg((current) => current === m ? "" : current), 4200);
  };
  const go = (s: Screen) => {
    setScreen(s);
    window.scrollTo(0, 0);
  };
  const stop = () => {
    stream.current?.getTracks().forEach((t) => t.stop());
    stream.current = null;
  };

  // gambar ulang canvas setiap ada perubahan
  useEffect(() => {
    if (screen === "setup" && prev.current) render(prev.current, [], false);
    if (screen === "res" && out.current) {
      render(out.current, S.shots, true);
    }
  });

  // awal: judul kecil bawaan, tunggu huruf termuat, matikan kamera saat keluar
  useEffect(() => {
    set({ sub: "Edisi " + new Date().getFullYear() });
    const f = ['900 40px "Playfair Display"', 'italic 400 40px "Instrument Serif"', '400 40px "Pinyon Script"', '700 20px "DM Sans"'];
    Promise.all(f.map((x) => document.fonts.load(x))).then(() => setCommit((c) => c + 1), () => {});
    return () => {
      runId.current += 1;
      stop();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // pasang aliran kamera ke <video> setelah layar kamera tampil
  useEffect(() => {
    const v = video.current;
    if (screen === "cam" && v && stream.current) {
      v.srcObject = stream.current;
      v.play().catch(() => {});
    }
  }, [screen, cameraVersion]);

  async function openCam() {
    setCameraReady(false);
    if (!window.isSecureContext) {
      toast("Kamera memerlukan koneksi HTTPS atau localhost. Kamu tetap bisa memilih foto dari galeri.");
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      toast("Browser ini tidak mendukung akses kamera. Coba browser versi terbaru atau pilih foto dari galeri.");
      return;
    }
    try {
      stop();
      const nextStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: S.facing }, width: { ideal: 1280 }, height: { ideal: 960 } },
        audio: false,
      });
      stream.current = nextStream;
      setDone(0);
      setCameraVersion((version) => version + 1);
      go("cam");
    } catch (error) {
      stop();
      const name = error instanceof DOMException ? error.name : "";
      const message = name === "NotAllowedError"
        ? "Izin kamera ditolak. Aktifkan izin kamera untuk situs ini di pengaturan browser."
        : name === "NotFoundError"
          ? "Kamera tidak ditemukan pada perangkat ini."
          : name === "NotReadableError"
            ? "Kamera sedang digunakan aplikasi lain. Tutup aplikasi tersebut lalu coba lagi."
            : "Kamera tidak bisa dibuka. Periksa izin kamera atau gunakan foto dari galeri.";
      toast(message);
    }
  }

  async function run() {
    const v = video.current;
    if (busy || !v) return;
    if (!cameraReady || v.readyState < HTMLMediaElement.HAVE_CURRENT_DATA || !v.videoWidth || !v.videoHeight) {
      toast("Kamera belum siap. Tunggu sampai pratinjau muncul, lalu coba lagi.");
      return;
    }
    const activeRun = ++runId.current;
    setBusy(true);
    S.shots = [];
    setDone(0);
    try {
      for (let i = 0; i < L().n; i++) {
        for (let t = S.timer; t > 0; t--) {
          if (runId.current !== activeRun) return;
          setCd(String(t));
          await sleep(1000);
        }
        if (runId.current !== activeRun) return;
        if (!v.videoWidth || !v.videoHeight || v.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
          throw new Error("Kamera terputus sebelum semua foto diambil.");
        }
        setCd("");
        setFlash((f) => f + 1);
        S.shots.push(toCell(v, v.videoWidth, v.videoHeight, S.facing === "user"));
        setDone(i + 1);
        await sleep(700);
      }
      stop();
      go("res");
    } catch (error) {
      S.shots = [];
      toast(error instanceof Error ? error.message : "Gagal mengambil foto. Coba buka kamera kembali.");
    } finally {
      if (runId.current === activeRun) {
        setBusy(false);
        setCd("");
      }
    }
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.currentTarget;
    const selected = Array.from(input.files || []);
    input.value = "";
    if (!selected.length) return;
    const allowed = selected.filter((f) => f.type.startsWith("image/"));
    if (allowed.length !== selected.length) toast("Beberapa file dilewati karena bukan file gambar.");
    const tooLarge = allowed.filter((f) => f.size > 15 * 1024 * 1024);
    if (tooLarge.length) toast("Foto berukuran lebih dari 15 MB dilewati agar browser tetap ringan.");
    const files = allowed.filter((f) => f.size <= 15 * 1024 * 1024).slice(0, L().n);
    if (!files.length) {
      toast("Pilih file gambar yang valid dengan ukuran maksimal 15 MB per foto.");
      return;
    }
    setImporting(true);
    try {
      const results = await Promise.all(files.map((f) => new Promise<HTMLCanvasElement>((resolve, reject) => {
        const url = URL.createObjectURL(f);
        const img = new Image();
        img.onload = () => {
          try {
            if (!img.naturalWidth || !img.naturalHeight) throw new Error("Gambar kosong atau rusak.");
            resolve(toCell(img, img.naturalWidth, img.naturalHeight, false));
          } catch (error) {
            reject(error);
          } finally {
            URL.revokeObjectURL(url);
          }
        };
        img.onerror = () => {
          URL.revokeObjectURL(url);
          reject(new Error("Salah satu foto tidak dapat dibaca."));
        };
        img.src = url;
      })));
      if (!results.length) throw new Error("Tidak ada foto yang berhasil dibaca.");
      S.shots = Array.from({ length: L().n }, (_, i) => results[i % results.length]);
      go("res");
      if (results.length < L().n) toast("Foto kurang dari " + L().n + ", jadi beberapa posisi menggunakan foto yang sama.");
    } catch (error) {
      toast(error instanceof Error ? error.message : "Gagal membaca foto. Coba pilih gambar lain.");
    } finally {
      setImporting(false);
    }
  }

  function save() {
    try {
      exp().toBlob(async (b: Blob | null) => {
      if (!b) { toast("Gagal menyiapkan gambar. Coba simpan sekali lagi."); return; }
      const f = new File([b], "pojok-foto.png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [f] })) {
        try {
          await navigator.share({ files: [f], title: "Pojok Foto" });
          return;
        } catch (e: any) {
          if (e.name === "AbortError") return;
        }
      }
      const a = document.createElement("a");
      const url = URL.createObjectURL(b);
      a.href = url;
      a.download = "pojok-foto.png";
      document.body.append(a);
      a.click();
      a.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast("Jika unduhan tidak dimulai, gunakan browser biasa dan coba lagi.");
      }, "image/png");
    } catch {
      toast("Gagal menyiapkan gambar. Coba muat ulang halaman.");
    }
  }

  async function pdf() {
    try {
      const { jsPDF } = await import("jspdf");
      const k = exp();
      const d = new jsPDF({ unit: "mm", format: "a4" });
      const pw = 210, ph = 297, m = 10, g = 6, n = copies;
      const s = Math.min((pw - 2 * m) / k.width, (ph - 2 * m - g * (n - 1)) / n / k.height);
      const w = k.width * s, h = k.height * s;
      const x0 = (pw - w) / 2, y0 = (ph - (n * h + (n - 1) * g)) / 2;
      const img = k.toDataURL("image/jpeg", 0.92);
      for (let i = 0; i < n; i++) d.addImage(img, "JPEG", x0, y0 + i * (h + g), w, h);
      d.save("pojok-foto.pdf");
      toast("PDF siap dicetak di kertas A4.");
    } catch {
      toast("PDF gagal dibuat. Coba muat ulang halaman.");
    }
  }

  const thumbKey = S.layout + "|" + commit;
  const bgList = (
    <div className="film">
      {BGS.map((b: any) => (
        <Thumb key={b.id} b={b} on={b.id === S.bg} k={thumbKey} onPick={() => set({ bg: b.id })} />
      ))}
    </div>
  );
  const l = L();
  const ar = l.cells(0)[2] / l.cells(0)[3];

  return (
    <>
      {screen === "setup" && (
        <section>
          <div className="grid">
            <div className="wrap">
              <div className="stage">
                <canvas ref={prev} aria-label="Pratinjau hasil foto" />
              </div>
            </div>
            <div>
              <h1>
                Photobooth <em>retro</em> di HP kamu.
              </h1>
              <p className="lead">
                Pilih bingkai, jepret empat kali, lalu simpan atau cetak. Fotomu diproses di perangkat dan tidak diunggah.
              </p>
              <div className="sec">
                <h2>Gaya foto</h2>
                <div className="row">
                  {Object.entries(LAYOUTS).map(([id, ly]: [string, any]) => (
                    <button key={id} className="chip" aria-pressed={id === S.layout} onClick={() => set({ layout: id, items: [], sel: -1 })}>
                      <Icon l={ly} />
                      <div>
                        {ly.name}
                        <small>{ly.n} foto</small>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="sec">
                <h2>Template bingkai</h2>
                {bgList}
              </div>
              <div className="sec">
                <h2>Filter</h2>
                <div className="row">
                  {FILTERS.map((f: any, i: number) => (
                    <button key={f.n} className="chip" aria-pressed={i === S.filter} onClick={() => set({ filter: i })}>
                      <div>{f.n}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="sec">
                <h2>Hitung mundur</h2>
                <div className="row">
                  {[3, 5, 10].map((n) => (
                    <button key={n} className="chip" aria-pressed={n === S.timer} onClick={() => set({ timer: n })}>
                      <div>{n} detik</div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="sec">
                <h2><label htmlFor="cap">Judul bingkai</label></h2>
                <input type="text" id="cap" maxLength={22} value={S.cap} placeholder="Judul bingkai" autoComplete="off" onChange={(e) => set({ cap: e.target.value })} onBlur={() => setCommit((c) => c + 1)} />
                <h2 style={{ marginTop: 14 }}><label htmlFor="sub">Tulisan kecil</label></h2>
                <input type="text" id="sub" maxLength={30} value={S.sub} placeholder="mis. Edisi 2026" autoComplete="off" onChange={(e) => set({ sub: e.target.value })} onBlur={() => setCommit((c) => c + 1)} />
              </div>
              <div className="stack">
                <button className="cta" onClick={openCam}>Masuk ke bilik</button>
                <button className="ghost" disabled={importing} onClick={() => file.current?.click()}>{importing ? "Membaca foto..." : "Pilih dari galeri"}</button>
                <input ref={file} type="file" accept="image/*" multiple hidden onChange={onFile} />
              </div>
            </div>
          </div>
          <div className="how">
            <h3>Tiga langkah, selesai.</h3>
            <div className="steps">
              <div><b>1</b><strong>Pilih gaya</strong><p>Tata letak, bingkai, dan filter ala film.</p></div>
              <div><b>2</b><strong>Jepret</strong><p>Hitung mundur otomatis, atau ambil dari galeri.</p></div>
              <div><b>3</b><strong>Simpan</strong><p>Simpan fotomu atau cetak langsung jadi PDF.</p></div>
            </div>
          </div>
        </section>
      )}

      {screen === "cam" && (
        <section>
          <div className="cam">
            <div className="vf" style={{ ["--ar" as any]: ar }}>
              <video ref={video} playsInline muted onLoadedMetadata={() => setCameraReady(true)} onCanPlay={() => setCameraReady(true)} onError={() => { setCameraReady(false); toast("Pratinjau kamera terputus. Kembali lalu buka kamera lagi."); }} style={{ transform: S.facing === "user" ? "scaleX(-1)" : "none", filter: FILTERS[S.filter].f }} />
              {!cameraReady && <div className="hint" role="status">Menyiapkan kamera...</div>}
              <div className="cd">{cd}</div>
              <div key={flash} className={flash ? "flash go" : "flash"} />
            </div>
            <div className="dots" aria-label="Progres foto">
              {Array.from({ length: l.n }, (_, i) => <b key={i} className={i < done ? "on" : ""} />)}
            </div>
            <div className="camctl">
              <button className="cta" disabled={busy || !cameraReady} onClick={run}>Mulai hitung mundur</button>
              <button className="ghost" disabled={busy} onClick={() => { set({ facing: S.facing === "user" ? "environment" : "user" }); openCam(); }}>Putar kamera</button>
              <button className="ghost" disabled={busy} onClick={() => { stop(); go("setup"); }}>Kembali</button>
            </div>
          </div>
        </section>
      )}

      {screen === "res" && (
        <section>
          <div className="res">
            <div className="wrap">
              <div className="stage">
                <canvas id="outcv" ref={out} aria-label="Hasil photobooth" />
              </div>
            </div>
            <div>
              <h1>Foto siap, <em>simpan</em> sekarang!</h1>
              <p className="hint">Kamu bisa mengganti template di bawah ini jika ingin suasana yang berbeda.</p>
              
              <div className="sec">
                <h2>Ganti template</h2>
                {bgList}
              </div>
              <div className="sec">
                <h2><label htmlFor="sheet">Hasil cetak</label></h2>
                <select id="sheet" value={S.sheet ? "1" : "0"} onChange={(e) => set({ sheet: e.target.value === "1" })}>
                  <option value="1">2 strip berdampingan (cocok cetak 4×6)</option>
                  <option value="0">1 strip saja</option>
                </select>
              </div>
              <div className="sec">
                <h2><label htmlFor="copies">Lembar di satu halaman A4</label></h2>
                <select id="copies" value={copies} onChange={(e) => setCopies(+e.target.value)}>
                  <option value={1}>1 lembar</option>
                  <option value={2}>2 lembar</option>
                </select>
              </div>
              <div className="stack">
                <button className="cta" onClick={save}>Simpan ke galeri</button>
                <button className="ghost" onClick={pdf}>Unduh PDF</button>
                <button className="ghost" onClick={() => { S.shots = []; go("setup"); }}>Foto ulang</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {msg && <div className="toast">{msg}</div>}
    </>
  );
}