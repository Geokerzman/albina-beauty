import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/content/site";
import { homePage, specialRoutes } from "@/content/pages";
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
export const dynamicParams = false;
export function generateStaticParams() {
  return [
    { slug: [] },
    ...specialRoutes.map((s) => ({ slug: s.split("/") })),
    ...services.map((s) => ({ slug: ["leistungen", ...s.slug.split("/")] })),
  ];
}
const routeTitles: Record<string, string> = {
  leistungen: "Unsere Treatments",
  "leistungen/kosmetische-behandlungen": "Kosmetische Behandlungen",
  "leistungen/wellness": "Wellness & Körperpflege",
  preisliste: "Behandlungen & Preise",
  "ueber-uns": "Unser Studio",
  "ueber-uns/team": "Unser Team",
  galerie: "Einblicke ins Studio",
  kontakt: "Kontakt & Anfahrt",
  karriere: "Karriere",
  "elementor-1142": "Karriere",
  impressum: "Impressum",
  datenschutzerklaerung: "Datenschutzerklärung",
  "cookie-richtlinie-eu": "Cookie-Richtlinie",
  shop: "Pflege für zu Hause",
  "termin-vereinbaren": "Termin vereinbaren",
  "category/uncategorized": "Beauty-Archiv",
  "author/albinaletova_ho1055am": "Aus unserem Studio",
};
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug = [] } = await params;
  const path = slug.join("/");
  const service = services.find((s) => `leistungen/${s.slug}` === path);
  const title = path ? service?.title || routeTitles[path] : homePage.title;
  const description = service?.description || homePage.description;
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
      title: `${title} | Albina Beauty Concept`,
      description,
      url: canonical,
      images: [
        {
          url: "/images/beauty-editorial.webp",
          width: 1122,
          height: 1402,
          alt: "Albina Beauty Concept – Beauty & Wellbeing in Köln Weiden",
        },
      ],
    },
  };
}
export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await params;
  const path = slug.join("/");
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
