import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BookingProvider } from "@/components/booking";
import { CookieNotice } from "@/components/interactions";
import { site } from "@/content/site";
import "./fonts.css";
import "./globals.css";
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
  openGraph: { type: "website", locale: "de_DE", siteName: site.name },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: site.name,
    url: metadata.metadataBase?.toString(),
    telephone: "+4922344303997",
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: "Köln",
      postalCode: "50859",
      addressCountry: "DE",
    },
    sameAs: [site.instagram],
    image: "/images/photo_2021-10-02_23-07-13-1024x1024.jpg",
  };
  return (
    <html lang="de">
      <body>
        <a className="skip-link" href="#main-content">
          Zum Inhalt springen
        </a>
        <BookingProvider>
          <Header />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <CookieNotice />
        </BookingProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
