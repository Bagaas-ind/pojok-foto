import type { Metadata, Viewport } from "next";
import SiteNav from "@/components/SiteNav";
import "./globals.css";

const siteUrl = "https://pojok-fotoo.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pojok Foto — Photobooth Retro Online",
    template: "%s | Pojok Foto",
  },
  description:
    "Bikin photostrip retro langsung dari browser. Pilih frame, gunakan filter film, ambil foto dari kamera atau galeri, lalu simpan sebagai PNG atau PDF.",
  applicationName: "Pojok Foto",
  keywords: [
    "photobooth online",
    "photostrip",
    "photobooth retro",
    "frame foto",
    "filter kamera",
    "photo strip maker",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "Pojok Foto",
    title: "Pojok Foto — Photobooth Retro Online",
    description:
      "Bikin photostrip retro langsung dari browser. Pilih frame, gunakan filter, dan simpan hasilnya.",
  },
  twitter: {
    card: "summary",
    title: "Pojok Foto — Photobooth Retro Online",
    description: "Photobooth retro gratis langsung dari browser.",
  },
  icons: { icon: "/icon.svg", shortcut: "/icon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#C44A14",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Playfair+Display:wght@700;900&family=Pinyon+Script&family=DM+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="app">
          <SiteNav />
          {children}
          <footer className="foot">
            <span>Pojok Foto</span> · Photobooth retro di browser ·{" "}
            <a href="https://github.com/Bagaas-ind/pojok-foto" target="_blank" rel="noreferrer">
              Open source di GitHub
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}
