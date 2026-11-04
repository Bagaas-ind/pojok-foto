"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  ["/booth", "Photostrip"],
  ["/filter", "Filter Cam"],
  ["/frames", "Galeri Frame"],
  ["/build", "Buat Bingkai"],
  ["/blog", "Blog"],
];

export default function SiteNav() {
  const p = usePathname() || "/";
  return (
    <nav>
      <Link href="/" className="logo">Pojok Foto</Link>
      <div className="navlinks">
        {LINKS.map(([h, t]) => (
          <Link key={h} href={h} aria-current={p.startsWith(h) ? "page" : undefined}>{t}</Link>
        ))}
      </div>
    </nav>
  );
}
