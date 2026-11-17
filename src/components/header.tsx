"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  Smartphone,
  X,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BookButton } from "@/components/booking";
import { services, serviceHref, site, type Category } from "@/content/site";
const categories: Category[] = [
  "Gesicht",
  "Körper & Entspannung",
  "Beauty Essentials",
  "Physiotherapie",
];
export function Wordmark() {
  return (
    <Link className="wordmark" href="/" aria-label="Albina Beauty Concept – Startseite">
      <Image
        src="/images/Albina-Beauty-Concept-Black.svg"
        alt="Albina Beauty Concept"
        width={712}
        height={223}
        unoptimized
        loading="eager"
      />
    </Link>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.5a9 9 0 0 1-13.2 8L3 21l1.5-4.8A9 9 0 1 1 21 11.5Z" />
      <path d="m8.1 7.3-.6 1.4c-.3.8.8 2.9 2.4 4.5s3.7 2.7 4.5 2.4l1.4-.6c.3-.1.5-.5.3-.8l-.9-1.5c-.2-.3-.5-.4-.8-.2l-1 .6c-1.3-.5-2.7-1.9-3.2-3.2l.6-1c.2-.3.1-.6-.2-.8l-1.5-.9c-.3-.2-.7 0-.8.3Z" />
    </svg>
  );
}
const searchPages = [
  ...services.map((service) => ({
    title: service.label || service.title,
    href: serviceHref(service),
    category: service.category,
    description: service.description,
  })),
  {
    title: "Alle Treatments",
    href: "/leistungen/",
    category: "Entdecken",
    description: "Unsere Leistungen und Behandlungen im Überblick",
  },
  {
    title: "Behandlungen & Preise",
    href: "/preisliste/",
    category: "Information",
    description: "Preisliste Kosten Pakete Dauer",
  },
  {
    title: "Unser Studio",
    href: "/ueber-uns/",
    category: "Albina Beauty Concept",
    description: "Unsere Geschichte Philosophie Über uns",
  },
  {
    title: "Unser Team",
    href: "/ueber-uns/team/",
    category: "Albina Beauty Concept",
    description: "Mitarbeiter Spezialisten Albina Alina Evgenia Dominika Irina",
  },
  {
    title: "Kontakt & Anfahrt",
    href: "/kontakt/",
    category: "Ihr Besuch",
    description: "Adresse Telefon E-Mail Route Köln Weiden",
  },
  {
    title: "Einblicke ins Studio",
    href: "/galerie/",
    category: "Entdecken",
    description: "Galerie Fotos Räume",
  },
  {
    title: "Termin vereinbaren",
    href: "/termin-vereinbaren/",
    category: "Ihr Besuch",
    description: "Terminbuchung Anfrage WhatsApp Beratung",
  },
  {
    title: "Karriere",
    href: "/karriere/",
    category: "Unser Team",
    description: "Jobs Bewerbung Stellen offene Positionen",
  },
  {
    title: "Pflege für zu Hause",
    href: "/shop/",
    category: "Produktberatung",
    description: "Shop NOON iS Clinical Produkte",
  },
];
function searchResults(query: string) {
  const term = query.trim().toLocaleLowerCase("de");
  if (!term)
    return [
      searchPages[0],
      ...searchPages.filter((page) =>
        ["/preisliste/", "/kontakt/", "/ueber-uns/team/"].includes(page.href),
      ),
    ];
  return searchPages.filter((page) =>
    `${page.title} ${page.category} ${page.description}`.toLocaleLowerCase("de").includes(term),
  );
}

export function Header() {
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  useEffect(() => {
    const close = () => {
      setMega(false);
      setMobile(false);
      setSearchOpen(false);
    };
    close();
  }, [pathname]);
  useEffect(() => {
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMega(false);
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, []);
  return (
    <>
      <div className="topbar" role="region" aria-label="Kontakt & soziale Netzwerke">
        <div className="topbar-inner container">
          <div className="topbar-contacts">
            <a href={site.phoneHref}>
              <Phone size={12} aria-hidden="true" />
              <span>{site.phone}</span>
            </a>
            <a href={site.mobileHref}>
              <Smartphone size={12} aria-hidden="true" />
              <span>{site.mobile}</span>
            </a>
            <a href={`mailto:${site.email}`}>
              <Mail size={13} aria-hidden="true" />
              <span>{site.email}</span>
            </a>
            <a href={site.headerMap} target="_blank" rel="noopener noreferrer">
              <MapPin size={13} aria-hidden="true" />
              <span>
                {site.address} · {site.postal}
              </span>
            </a>
          </div>
          <div className="topbar-actions">
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSearchOpen(true);
              }}
              aria-label="Website durchsuchen"
              aria-haspopup="dialog"
              title="Suche"
            >
              <Search size={15} aria-hidden="true" />
            </button>
            <span className="topbar-divider" aria-hidden="true" />
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Albina Beauty Concept auf Instagram"
              title="Instagram"
            >
              <Instagram size={15} aria-hidden="true" />
            </a>
            <a
              href={site.whatsappSocial}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Albina Beauty Concept auf WhatsApp"
              title="WhatsApp"
            >
              <WhatsAppIcon />
            </a>
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Albina Beauty Concept auf Facebook"
              title="Facebook"
            >
              <Facebook size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="header-inner">
          <Wordmark />
          <nav aria-label="Hauptnavigation" className="desktop-nav">
            <button
              className={mega || pathname.startsWith("/leistungen") ? "active" : ""}
              aria-expanded={mega}
              aria-controls="treatment-menu"
              onClick={() => setMega(!mega)}
            >
              Treatments <ChevronDown size={12} className={mega ? "rotate" : ""} />
            </button>
            <Link
              href="/preisliste/"
              aria-current={pathname === "/preisliste/" ? "page" : undefined}
            >
              Preise
            </Link>
            <Link href="/ueber-uns/" aria-current={pathname === "/ueber-uns/" ? "page" : undefined}>
              Unser Studio
            </Link>
            <Link href="/galerie/" aria-current={pathname === "/galerie/" ? "page" : undefined}>
              Einblicke
            </Link>
            <Link href="/kontakt/" aria-current={pathname === "/kontakt/" ? "page" : undefined}>
              Kontakt
            </Link>
          </nav>
          <div className="header-actions">
            <BookButton className="header-book" size="sm" />
            <button
              className="mobile-menu-button"
              onClick={() => setMobile(true)}
              aria-label="Menü öffnen"
            >
              <Menu size={23} />
            </button>
          </div>
        </div>
        {mega && (
          <>
            <button
              className="mega-backdrop"
              onClick={() => setMega(false)}
              tabIndex={-1}
              aria-label="Treatments-Menü schließen"
            />
            <div className="mega-menu" id="treatment-menu">
              <div className="mega-intro">
                <p className="eyebrow">Ihr persönliches Ritual</p>
                <h2>
                  Was tut Ihnen
                  <br />
                  <em>heute gut?</em>
                </h2>
                <Link className="text-link" href="/leistungen/">
                  Alle Treatments <ArrowUpRight size={15} />
                </Link>
              </div>
              {categories.map((cat) => (
                <div className="mega-column" key={cat}>
                  <span className="eyebrow">{cat}</span>
                  {services
                    .filter((s) => s.category === cat)
                    .map((s) => (
                      <Link key={s.slug} href={serviceHref(s)}>
                        {s.label || s.title}
                      </Link>
                    ))}
                </div>
              ))}
            </div>
          </>
        )}
      </header>
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="site-search-dialog">
          <p className="eyebrow">Albina Beauty Concept</p>
          <DialogTitle className="dialog-heading">Was suchen Sie?</DialogTitle>
          <DialogDescription className="site-search-description">
            Entdecken Sie unsere Treatments, Preise und Informationen rund um Ihren Besuch.
          </DialogDescription>
          <label className="site-search-input">
            <Search size={18} aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Treatment oder Thema suchen"
              aria-label="Website durchsuchen"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Suchbegriff löschen"
              >
                <X size={16} />
              </button>
            )}
          </label>
          <p className="site-search-count" role="status">
            {searchQuery.trim()
              ? `${searchResults(searchQuery).length} Ergebnisse`
              : "Direkt zu Ihrem Wunsch"}
          </p>
          <div className="site-search-results">
            {searchResults(searchQuery).map((result) => (
              <Link href={result.href} key={result.href} onClick={() => setSearchOpen(false)}>
                <span>
                  <small>{result.category}</small>
                  <span>{result.title}</span>
                </span>
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            ))}
            {searchResults(searchQuery).length === 0 && (
              <div className="site-search-empty">
                <p>
                  Keine passenden Ergebnisse. Versuchen Sie einen anderen Begriff oder sprechen Sie
                  uns persönlich an.
                </p>
                <Link href="/kontakt/" className="text-link" onClick={() => setSearchOpen(false)}>
                  Kontakt aufnehmen <ArrowUpRight size={15} />
                </Link>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={mobile} onOpenChange={setMobile}>
        <DialogContent className="mobile-navigation">
          <DialogTitle className="sr-only">Hauptnavigation</DialogTitle>
          <DialogDescription className="sr-only">
            Entdecken Sie unsere Treatments, das Studio und die Kontaktmöglichkeiten.
          </DialogDescription>
          <Wordmark />
          <nav aria-label="Mobile Navigation">
            <Link href="/leistungen/" onClick={() => setMobile(false)}>
              Alle Treatments <ArrowUpRight />
            </Link>
            {categories.map((cat) => (
              <details key={cat}>
                <summary>
                  {cat}
                  <ChevronDown size={18} />
                </summary>
                <div>
                  {services
                    .filter((s) => s.category === cat)
                    .map((s) => (
                      <Link key={s.slug} href={serviceHref(s)} onClick={() => setMobile(false)}>
                        {s.label || s.title}
                      </Link>
                    ))}
                </div>
              </details>
            ))}
            {[
              ["Preise", "/preisliste/"],
              ["Unser Studio", "/ueber-uns/"],
              ["Einblicke", "/galerie/"],
              ["Kontakt", "/kontakt/"],
              ["Karriere", "/karriere/"],
            ].map(([title, url]) => (
              <Link key={url} href={url} onClick={() => setMobile(false)}>
                {title}
              </Link>
            ))}
          </nav>
          <a className="mobile-phone" href={site.phoneHref}>
            <Phone size={16} />
            {site.phone}
          </a>
          <Link
            href="/termin-vereinbaren/"
            className="button button-primary"
            onClick={() => setMobile(false)}
          >
            Termin anfragen <ArrowUpRight size={17} />
          </Link>
        </DialogContent>
      </Dialog>
    </>
  );
}
