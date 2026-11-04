import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export", // hasil build statis di folder out/ (cocok untuk GitHub Pages)
  basePath: isProd ? "/pojok-foto" : "",
  images: { unoptimized: true },
};

export default nextConfig;
