"use client";
import { useSiteContent } from "@/cms/site-content-provider";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import { imagePath } from "@/lib/image-path";
import { serviceHref, type Category } from "@/content/site";
const categories: Category[] = [
  "Gesicht",
  "Körper & Entspannung",
  "Beauty Essentials",
  "Physiotherapie",
];
export function Wordmark() {
  const { copy } = useSiteContent();
  return (
    <Link className="wordmark" href={copy.wordmark.link} aria-label={copy.wordmark.ariaLabel}>
      <Image
        src={imagePath(copy.wordmark.image)}
        alt={copy.wordmark.imageAlt}
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

function searchResults(
  query: string,
  searchPages: { title: string; href: string; category: string; description: string }[],
) {
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
  const { site, services, copy } = useSiteContent();
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const topbarRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const treatmentsButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const searchPages = [
    ...services.map((service) => ({
      title: service.label || service.title,
      href: serviceHref(service),
      category: service.category,
      description: service.description,
    })),
    ...copy.headerSearch.pages,
  ];
  const results = searchResults(searchQuery, searchPages);
  useEffect(() => {
    const close = () => {
      setMega(false);
      setMobile(false);
      setSearchOpen(false);
    };
    close();
  }, [pathname]);
  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!mega || !header) return;

    const mobileViewport = window.matchMedia("(max-width: 800px)");
    const closeOnMobile = () => {
      if (mobileViewport.matches) setMega(false);
    };
    const updatePosition = () => {
      header.style.setProperty("--header-bottom", `${header.getBoundingClientRect().bottom}px`);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      setMega(false);
      treatmentsButtonRef.current?.focus({ preventScroll: true });
    };

    updatePosition();
    closeOnMobile();
    const observer = new ResizeObserver(updatePosition);
    observer.observe(header);
    if (topbarRef.current) observer.observe(topbarRef.current);
    window.addEventListener("scroll", updatePosition, { passive: true });
    mobileViewport.addEventListener("change", closeOnMobile);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updatePosition);
      mobileViewport.removeEventListener("change", closeOnMobile);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mega]);
  return (
    <>
      <div
        ref={topbarRef}
        className="topbar"
        role="region"
        aria-label={copy.headerTopbar.ariaLabel}
      >
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
                setMega(false);
                setSearchQuery("");
                setSearchOpen(true);
              }}
              aria-label={copy.headerTopbar.ariaLabel2}
              aria-haspopup="dialog"
              title={copy.headerTopbar.title}
            >
              <Search size={15} aria-hidden="true" />
            </button>
            <span className="topbar-divider" aria-hidden="true" />
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={copy.headerTopbar.ariaLabel3}
              title={copy.headerTopbar.title2}
            >
              <Instagram size={15} aria-hidden="true" />
            </a>
            <a
              href={site.whatsappSocial}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={copy.headerTopbar.ariaLabel4}
              title={copy.headerTopbar.title3}
            >
              <WhatsAppIcon />
            </a>
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={copy.headerTopbar.ariaLabel5}
              title={copy.headerTopbar.title4}
            >
              <Facebook size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <header ref={headerRef} className="site-header">
        <div className="header-inner">
          <Wordmark />
          <nav
            aria-label={copy.headerNavigation.ariaLabel}
            className="desktop-nav"
            onBlur={(event) => {
              if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) {
                setMega(false);
              }
            }}
          >
            <button
              ref={treatmentsButtonRef}
              type="button"
              className={mega || pathname.startsWith("/leistungen") ? "active" : ""}
              aria-expanded={mega}
              aria-controls={mega ? "treatment-menu" : undefined}
              onClick={() => setMega((open) => !open)}
            >
              {copy.headerNavigation.buttonText}
              <ChevronDown size={12} className={mega ? "rotate" : ""} />
            </button>
            {mega && (
              <div className="mega-menu" id="treatment-menu">
                <div className="mega-menu-inner">
                  <div className="mega-intro">
                    <p className="eyebrow">{copy.headerTreatments.eyebrow}</p>
                    <h2>
                      {copy.headerTreatments.heading}
                      <br />
                      <em>{copy.headerTreatments.emphasis}</em>
                    </h2>
                    <Link
                      className="text-link"
                      href={copy.headerTreatments.link}
                      onNavigate={() => setMega(false)}
                    >
                      {copy.headerTreatments.linkText}
                      <ArrowUpRight size={15} />
                    </Link>
                  </div>
                  {categories.map((cat) => (
                    <div className="mega-column" key={cat}>
                      <span className="eyebrow">{cat}</span>
                      {services
                        .filter((s) => s.category === cat)
                        .map((s) => (
                          <Link
                            key={s.slug}
                            href={serviceHref(s)}
                            onNavigate={() => setMega(false)}
                          >
                            {s.label || s.title}
                          </Link>
                        ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <Link
              href={copy.headerNavigation.link}
              aria-current={pathname === "/preisliste/" ? "page" : undefined}
            >
              {copy.headerNavigation.linkText}
            </Link>
            <Link
              href={copy.headerNavigation.link2}
              aria-current={pathname === "/ueber-uns/" ? "page" : undefined}
            >
              {copy.headerNavigation.linkText2}
            </Link>
            <Link
              href={copy.headerNavigation.link3}
              aria-current={pathname === "/galerie/" ? "page" : undefined}
            >
              {copy.headerNavigation.linkText3}
            </Link>
            <Link
              href={copy.headerNavigation.link4}
              aria-current={pathname === "/kontakt/" ? "page" : undefined}
            >
              {copy.headerNavigation.linkText4}
            </Link>
          </nav>
          <div className="header-actions">
            <BookButton className="header-book" size="sm" />
            <button
              className="mobile-menu-button"
              onClick={() => setMobile(true)}
              aria-label={copy.headerNavigation.ariaLabel2}
            >
              <Menu size={23} />
            </button>
          </div>
        </div>
        {mega && (
          <button
            type="button"
            className="mega-backdrop"
            onPointerDown={(event) => event.preventDefault()}
            onClick={() => {
              setMega(false);
              treatmentsButtonRef.current?.focus({ preventScroll: true });
            }}
            tabIndex={-1}
            aria-label={copy.headerTreatments.ariaLabel}
          />
        )}
      </header>
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="site-search-dialog">
          <p className="eyebrow">{copy.headerSearch.eyebrow}</p>
          <DialogTitle className="dialog-heading">{copy.headerSearch.heading}</DialogTitle>
          <DialogDescription className="site-search-description">
            {copy.headerSearch.description}
          </DialogDescription>
          <label className="site-search-input">
            <Search size={18} aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={copy.headerSearch.placeholder}
              aria-label={copy.headerSearch.ariaLabel}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label={copy.headerSearch.ariaLabel2}
              >
                <X size={16} />
              </button>
            )}
          </label>
          <p className="site-search-count" role="status">
            {searchQuery.trim()
              ? `${results.length}${copy.headerSearch.results}`
              : copy.headerSearch.text}
          </p>
          <div className="site-search-results">
            {results.map((result) => (
              <Link href={result.href} key={result.href} onClick={() => setSearchOpen(false)}>
                <span>
                  <small>{result.category}</small>
                  <span>{result.title}</span>
                </span>
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            ))}
            {results.length === 0 && (
              <div className="site-search-empty">
                <p>{copy.headerSearch.text2}</p>
                <Link
                  href={copy.headerSearch.link}
                  className="text-link"
                  onClick={() => setSearchOpen(false)}
                >
                  {copy.headerSearch.linkText}
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={mobile} onOpenChange={setMobile}>
        <DialogContent className="mobile-navigation">
          <DialogTitle className="sr-only">{copy.headerMobile.heading}</DialogTitle>
          <DialogDescription className="sr-only">{copy.headerMobile.description}</DialogDescription>
          <Wordmark />
          <nav aria-label={copy.headerMobile.ariaLabel}>
            <Link href={copy.headerMobile.link} onClick={() => setMobile(false)}>
              {copy.headerMobile.linkText}
              <ArrowUpRight />
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
            {copy.headerMobile.links.map(({ title, link: url }) => (
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
            href={copy.headerMobile.link2}
            className="button button-primary"
            onClick={() => setMobile(false)}
          >
            {copy.headerMobile.linkText2}
            <ArrowUpRight size={17} />
          </Link>
        </DialogContent>
      </Dialog>
    </>
  );
}
