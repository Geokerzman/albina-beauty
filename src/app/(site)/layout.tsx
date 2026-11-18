import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BookingProvider } from "@/components/booking";
import { CookieConsentProvider } from "@/components/ui/cookie-consent";
import { clientSiteContent, getSiteContent } from "@/cms/site-content";
import { SiteContentProvider } from "@/cms/site-content-provider";
import { imagePath } from "@/lib/image-path";
import "../fonts.css";
import "../globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.albina-beauty-concept.de"),
  title: {
    default: "Albina Beauty Concept | Beauty & Wellbeing in Köln",
    template: "%s | Albina Beauty Concept",
  },
  description:
    "Persönliche Hautpflege, Beauty und Wohlbefinden in Köln Weiden. Entdecken Sie Albina Beauty Concept.",
  icons: {
    icon: [{ url: "/images/cropped-v1_bg-192x192.png", type: "image/png", sizes: "192x192" }],
    apple: "/images/cropped-v1_bg-192x192.png",
  },
  openGraph: { type: "website", locale: "de_DE", siteName: "Albina Beauty Concept" },
  twitter: { card: "summary_large_image" },
};
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const content = await getSiteContent();
  const { site, copy } = content;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: site.name,
    url: metadata.metadataBase?.toString(),
    telephone: site.phoneHref.replace(/^tel:/, ""),
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: "Köln",
      postalCode: "50859",
      addressCountry: "DE",
    },
    sameAs: [site.instagram],
    image: imagePath(copy.aboutImage.image),
  };
  return (
    <SiteContentProvider content={clientSiteContent(content)}>
      <a className="skip-link" href="#main-content">
        {copy.siteChrome.skipLink}
      </a>
      <CookieConsentProvider>
        <BookingProvider>
          <Header />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </BookingProvider>
      </CookieConsentProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
    </SiteContentProvider>
  );
}
