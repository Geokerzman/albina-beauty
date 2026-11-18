import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  trailingSlash: true,
  serverExternalPackages: ["payload", "@payloadcms/db-sqlite", "@payloadcms/drizzle"],
  experimental: { serverActions: { bodySizeLimit: "9mb" } },
  images: { formats: ["image/avif", "image/webp"] },
};
export default nextConfig;
