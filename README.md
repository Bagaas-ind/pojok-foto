<div align="center">
  <img src="public/logo.svg" alt="Pojok Foto" width="112" />
  <h1>Pojok Foto</h1>
  <p><strong>Photobooth retro. Langsung dari browser.</strong></p>
  <p>Bikin photostrip, pilih frame, tambahkan nuansa film, lalu simpan hasilnya — tanpa memasang aplikasi.</p>
  <p>
    <a href="https://pojok-fotoo.vercel.app/"><strong>Buka Pojok Foto</strong></a>
    ·
    <a href="#cara-menjalankan">Cara menjalankan</a>
    ·
    <a href="#kontribusi">Kontribusi</a>
  </p>
  <p>
    <img src="https://img.shields.io/badge/Next.js-16.4.5-111111?logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-7-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/License-MIT-3DAA73" alt="MIT License" />
  </p>
</div>

---

## Tentang proyek

**Pojok Foto** adalah photobooth berbasis web untuk membuat foto bergaya studio retro dari HP, tablet, atau laptop. Pilih tata letak, atur bingkai dan filter, ambil foto menggunakan kamera atau galeri, kemudian ekspor hasilnya.

Tidak perlu akun dan tidak perlu mengunggah foto ke layanan penyimpanan. Pengolahan foto dilakukan secara lokal di browser.

## Fitur

| Fitur | Yang bisa dilakukan |
| --- | --- |
| Photostrip | Buat strip 2, 3, atau 4 foto, layout 2×2, dan polaroid |
| Kamera browser | Ambil foto dengan kamera depan atau belakang dan hitung mundur |
| Impor foto | Gunakan foto yang sudah ada di perangkat |
| Filter film | Pilih tampilan seperti Kodak, Fuji, Tri-X, dan efek retro lainnya |
| Galeri bingkai | Pilih berbagai tema, termasuk editorial, denim, batik, dan lainnya |
| Pembuat bingkai | Atur warna, pola, tipografi, dan detail bingkai sendiri |
| Stiker dan dekorasi | Hias hasil foto sebelum disimpan |
| Ekspor | Simpan sebagai PNG atau siapkan PDF untuk dicetak |

## Coba langsung

**[pojok-fotoo.vercel.app](https://pojok-fotoo.vercel.app/)**

Untuk pengalaman kamera terbaik, buka melalui browser modern dan izinkan akses kamera saat diminta. Akses kamera browser umumnya memerlukan HTTPS atau localhost.

## Cara menjalankan

### Persyaratan

- Node.js 20.9 atau lebih baru
- npm
- Browser modern

### Instalasi

```bash
git clone https://github.com/Bagaas-ind/pojok-foto.git
cd pojok-foto
npm install
npm run dev
```

Buka **http://localhost:3000** di browser.

### Perintah yang tersedia

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Menjalankan server pengembangan |
| `npm run build` | Membuat build produksi |
| `npm run start` | Menjalankan hasil build produksi |

## Teknologi

- **Next.js App Router** — kerangka aplikasi web.
- **React** — antarmuka interaktif.
- **TypeScript** — pengembangan dengan tipe data.
- **Tailwind CSS 4** — fondasi styling.
- **Canvas API** — komposisi foto, frame, filter, dan ekspor gambar.
- **MediaDevices API** — akses kamera melalui browser.
- **jsPDF** — pembuatan dokumen PDF.

## Privasi

Pojok Foto tidak memiliki backend untuk mengunggah atau menyimpan foto pengguna. Foto diproses di browser dan hasil ekspor dibuat di perangkat pengguna. Akses kamera hanya diminta ketika fitur kamera digunakan.

Font antarmuka dimuat dari Google Fonts, sehingga browser dapat melakukan koneksi ke layanan tersebut. Jangan gunakan perangkat bersama jika hasil foto bersifat pribadi, dan tutup tab setelah selesai.

## Struktur proyek

```text
app/
  booth/       # Alur photobooth
  build/       # Pembuat bingkai
  filter/      # Filter kamera
  frames/      # Galeri bingkai
  layout.tsx   # Metadata dan layout utama
  page.tsx     # Halaman depan
components/    # Komponen antarmuka
lib/           # Mesin canvas dan utilitas
public/        # Logo dan aset statis
```

## Kontribusi

Kontribusi terbuka untuk siapa saja. Kamu bisa membantu dengan:

1. Membuka issue untuk melaporkan bug atau mengusulkan fitur.
2. Fork repository dan buat branch untuk perubahanmu.
3. Jalankan aplikasi dan uji perubahan di browser desktop maupun mobile.
4. Kirim pull request dengan ringkasan perubahan dan langkah pengujian.

Mohon sertakan tangkapan layar untuk perubahan antarmuka dan langkah reproduksi untuk perbaikan bug.

## Lisensi

Didistribusikan di bawah [MIT License](LICENSE).

---

<div align="center">
  <strong>Pojok Foto</strong><br />
  Made for moments worth keeping.
</div>
