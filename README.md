# 📸 Pojok Foto

**Pojok Foto** adalah aplikasi photobooth retro berbasis web yang memungkinkan pengguna mengambil foto langsung dari browser (HP atau laptop) tanpa perlu mengunduh aplikasi tambahan. Cukup pilih bingkai, jepret dengan hitung mundur, beri filter, lalu simpan hasilnya ke galeri atau cetak sebagai PDF.

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?logo=next.js&style=flat-square)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript&style=flat-square)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel&style=flat-square)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

---

## ✨ Fitur Utama

- **🖼️ Photostrip & Layout** — Pilih dari berbagai layout klasik (2-4 foto, grid 2x2, atau polaroid).
- **🎞️ Filter Kamera** — Terapkan filter film retro seperti Kodak, Fuji, Tri-X, dan lainnya secara real-time.
- **🖌️ Kustomisasi Bingkai** — Rancang bingkai sendiri dengan warna, pola, dan judul sesuai keinginan.
- **⏱️ Hitung Mundur** — Pengalaman photobooth otentik dengan hitung mundur otomatis sebelum jepretan.
- **💾 Ekspor & Simpan** — Simpan hasil foto langsung ke galeri perangkat atau unduh sebagai file PDF.
- **🔒 Privasi Terjaga** — Foto tidak pernah diunggah ke server; semua proses terjadi langsung di browser.
- **📱 Responsif** — Dapat diakses dengan nyaman dari HP, tablet, maupun desktop.

---

## 🚀 Demo Langsung

Kunjungi aplikasi yang sudah di-deploy di Vercel:

👉 **[https://pojok-fotoo.vercel.app/](https://pojok-fotoo.vercel.app/)**

---

## 🛠️ Teknologi yang Digunakan

| Teknologi | Kegunaan |
| :--- | :--- |
| **Next.js 16 (App Router)** | Framework React untuk rendering dan routing |
| **TypeScript** | Bahasa pemrograman dengan type safety |
| **Tailwind CSS** | Styling utility-first untuk UI yang responsif |
| **React Webcam** | Akses kamera langsung dari browser |
| **html-to-image** | Konversi elemen DOM menjadi gambar (PNG) |
| **Vercel** | Platform hosting dan deployment |

---

## 📁 Struktur Proyek

```text
pojok-foto/
├── app/                  # Direktori utama Next.js App Router
│   ├── page.tsx          # Halaman landing (hero, fitur, dll.)
│   ├── booth/            # Halaman utama photobooth
│   ├── build/            # Halaman pembuatan bingkai kustom
│   ├── filter/           # Halaman galeri filter
│   ├── frames/           # Halaman galeri bingkai
│   ├── layout.tsx        # Root layout aplikasi
│   └── globals.css       # Styling global & variabel CSS
├── components/           # Komponen UI yang dapat digunakan ulang
│   ├── Photobooth.tsx    # Komponen inti kamera & pengambilan foto
│   ├── SiteNav.tsx       # Navigasi situs
│   └── TplCanvas.tsx     # Komponen kanvas untuk template
├── lib/                  # Logika bisnis & utilitas
│   ├── booth.ts          # Logika pengambilan foto & state
│   └── useFonts.ts       # Hook untuk manajemen font
├── public/               # Aset statis (gambar, ikon, dll.)
├── next.config.ts        # Konfigurasi Next.js
├── package.json          # Dependensi & skrip proyek
└── tsconfig.json         # Konfigurasi TypeScript
