import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  trailingSlash: true,
  images: { formats: ["image/avif", "image/webp"] },
};
export default nextConfig;
