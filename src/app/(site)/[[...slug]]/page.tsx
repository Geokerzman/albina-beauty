import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteContent } from "@/cms/site-content";
import { imagePath } from "@/lib/image-path";
import {
  HomeBlockRenderer,
  CatalogPage,
  ServicePage,
  PricesPage,
  AboutPage,
  GalleryPage,
  ContactPage,
  CareersPage,
  ShopPage,
  BookingPage,
  LegalPage,
  ArchivePage,
} from "@/components/page-sections";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug = [] } = await params;
  const path = slug.join("/");
  const { services, legal, seo, copy, site } = await getSiteContent();
  const service = services.find((s) => `leistungen/${s.slug}` === path);
  const page = seo[path || "home"];
  const title = service?.title || legal[path as keyof typeof legal]?.title || page?.title;
  const description = service?.description || page?.description || seo.home.description;
  const canonical = path === "elementor-1142" ? "/karriere/" : path ? `/${path}/` : "/";
  return {
    title,
    description,
    alternates: { canonical },
    robots:
      path.startsWith("category/") || path.startsWith("author/")
        ? { index: false, follow: true }
        : undefined,
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: canonical,
      siteName: site.name,
      images: [
        {
          url: imagePath(copy.siteChrome.shareImage),
          alt: copy.siteChrome.shareImageAlt,
        },
      ],
    },
  };
}
export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await params;
  const path = slug.join("/");
  const { services } = await getSiteContent();
  const service = services.find((s) => `leistungen/${s.slug}` === path);
  if (service) return <ServicePage service={service} />;
  switch (path) {
    case "":
      return <HomeBlockRenderer />;
    case "leistungen":
      return <CatalogPage />;
    case "leistungen/kosmetische-behandlungen":
      return <CatalogPage category="Gesicht" />;
    case "leistungen/wellness":
      return <CatalogPage category="Körper & Entspannung" />;
    case "preisliste":
      return <PricesPage />;
    case "ueber-uns":
      return <AboutPage />;
    case "ueber-uns/team":
      return <AboutPage teamOnly />;
    case "galerie":
      return <GalleryPage />;
    case "kontakt":
      return <ContactPage />;
    case "karriere":
    case "elementor-1142":
      return <CareersPage />;
    case "shop":
      return <ShopPage />;
    case "termin-vereinbaren":
      return <BookingPage />;
    case "impressum":
    case "datenschutzerklaerung":
    case "cookie-richtlinie-eu":
      return <LegalPage slug={path} />;
    case "category/uncategorized":
      return <ArchivePage />;
    case "author/albinaletova_ho1055am":
      return <ArchivePage author />;
    default:
      notFound();
  }
}
