import type { MetadataRoute } from "next";
import { services } from "@/content/site";
import { specialRoutes } from "@/content/pages";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.albina-beauty-concept.de";
  return [
    "",
    ...specialRoutes.filter(
      (s) => !s.startsWith("category/") && !s.startsWith("author/") && s !== "elementor-1142",
    ),
    ...services.map((s) => `leistungen/${s.slug}`),
  ].map((path) => ({
    url: `${base}/${path ? path + "/" : ""}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("leistungen/") ? 0.8 : 0.6,
  }));
}
