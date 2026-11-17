"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown, Instagram, Menu, Phone, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BookButton } from "@/components/booking";
import { services, serviceHref, site, type Category } from "@/content/site";
const categories: Category[] = [
  "Gesicht",
  "Körper & Entspannung",
  "Beauty Essentials",
  "Physiotherapie",
];
export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <Link
      className={`wordmark ${light ? "wordmark-light" : ""}`}
      href="/"
      aria-label="Albina Beauty Concept – Startseite"
    >
      <span>
        ALBINA<span className="wordmark-dot">.</span>
      </span>
      <small>BEAUTY CONCEPT</small>
    </Link>
  );
}
export function Header() {
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const close = () => {
      setMega(false);
      setMobile(false);
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
      <div className="topbar" role="region" aria-label="Studio-Informationen">
        <span>Köln Weiden · Seit 2019</span>
        <span>Ein Ort für Ihre Schönheit. Ein Moment für Sie.</span>
        <a
          href={site.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Albina Beauty Concept auf Instagram"
        >
          <Instagram size={13} />
          <span>Folgen Sie uns</span>
        </a>
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
