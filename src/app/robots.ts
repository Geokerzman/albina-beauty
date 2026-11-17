import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.albina-beauty-concept.de";
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin/", "/api/", "/category/", "/author/"] },
    sitemap: `${base}/sitemap.xml`,
  };
}
