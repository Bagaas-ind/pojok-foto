import Link from "next/link";
import TplCanvas from "@/components/TplCanvas";

const FEATS = [
  ["/booth", "Photostrip", "Strip 2–4 foto, kotak 2×2, atau polaroid dengan hitung mundur otomatis."],
  ["/filter", "Filter Cam", "Satu foto dengan filter film: Kodak, Fuji, Tri-X, dan lainnya."],
  ["/frames", "Galeri Frame", "Jelajahi belasan template bingkai, dari tiket merah sampai batik."],
  ["/build", "Buat Bingkai", "Racik warna, pola, dan judul sendiri, lalu pakai di photobooth."],
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div>
          <h1>Photobooth <em>retro</em>, langsung dari HP.</h1>
          <p className="lead">Pilih bingkai, jepret dengan hitung mundur, beri filter film dan stiker, lalu simpan ke galeri atau cetak PDF. Gratis, tanpa aplikasi, dan fotomu tidak pernah diunggah.</p>
          <div className="heroBtns">
            <Link href="/booth" className="cta">Mulai foto</Link>
            <Link href="/frames" className="ghost">Lihat bingkai</Link>
          </div>
        </div>
        <div className="show" aria-hidden="true">
          {["tiket", "kayu", "editorial", "denim"].map((id) => <TplCanvas key={id} id={id} w={104} />)}
        </div>
      </section>

      <section className="cards">
        {FEATS.map(([h, t, d]) => (
          <Link key={h} href={h} className="card"><strong>{t}</strong><span>{d}</span></Link>
        ))}
      </section>

      <section className="how">
        <h3>Tiga langkah, selesai.</h3>
        <div className="steps">
          <div><b>1</b><strong>Pilih gaya</strong><p>Tata letak, bingkai, dan filter ala film.</p></div>
          <div><b>2</b><strong>Jepret</strong><p>Hitung mundur otomatis, atau ambil dari galeri.</p></div>
          <div><b>3</b><strong>Hias dan simpan</strong><p>Tambah stiker, lalu simpan atau cetak PDF.</p></div>
        </div>
      </section>

      <section className="faq">
        <h3>Pertanyaan umum</h3>
        <details><summary>Apakah fotoku diunggah?</summary><p>Tidak. Semua diproses di browser perangkatmu dan tidak dikirim ke server mana pun.</p></details>
        <details><summary>Bisa dipakai di iPhone dan Android?</summary><p>Bisa. Buka lewat Chrome atau Safari, lalu izinkan akses kamera.</p></details>
        <details><summary>Bagaimana cara mencetaknya?</summary><p>Pilih &quot;Unduh PDF&quot; di halaman hasil, lalu cetak di kertas A4 dan gunting stripnya.</p></details>
      </section>
    </>
  );
}
