"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  ["/booth", "Photostrip"],
  ["/filter", "Filter Cam"],
  ["/frames", "Galeri Frame"],
  ["/build", "Buat Bingkai"],
];

export default function SiteNav() {
  const p = usePathname() || "/";
  return (
    <nav aria-label="Navigasi utama">
      <Link href="/" className="logo" aria-label="Pojok Foto, halaman utama">Pojok Foto</Link>
      <div className="navlinks">
        {LINKS.map(([h, t]) => (
          <Link key={h} href={h} aria-current={p === h || p.startsWith(h + "/") ? "page" : undefined}>{t}</Link>
        ))}
      </div>
    </nav>
  );
}
