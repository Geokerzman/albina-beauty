import Link from "next/link";
import { ArrowUpRight, Instagram } from "lucide-react";
import { Wordmark } from "./header";
import { BookButton } from "./booking";
import { CookieSettingsButton } from "./ui/cookie-consent";
import { site } from "@/content/site";
export function ClosingInvitation() {
  return (
    <section className="closing-invitation">
      <div className="container">
        <p className="eyebrow">Wir freuen uns auf Sie</p>
        <h2>
          Ein guter Moment,
          <br />
          <em>an sich zu denken.</em>
        </h2>
        <p>Für Ihre Haut. Für Ihr Wohlbefinden. Ganz für Sie.</p>
        <BookButton variant="light" />
        <span className="closing-line" aria-hidden="true" />
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Wordmark />
            <p>
              Schönheit ist persönlich.
              <br />
              Unsere Pflege auch.
            </p>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Unser Instagram"
            >
              <Instagram size={18} />
            </a>
          </div>
          <div>
            <h2>Entdecken</h2>
            <Link href="/leistungen/">Unsere Treatments</Link>
            <Link href="/preisliste/">Behandlungen & Preise</Link>
            <Link href="/galerie/">Einblicke ins Studio</Link>
            <Link href="/shop/">Pflege für zu Hause</Link>
          </div>
          <div>
            <h2>Albina Beauty Concept</h2>
            <Link href="/ueber-uns/">Unsere Philosophie</Link>
            <Link href="/ueber-uns/team/">Das Team</Link>
            <Link href="/karriere/">
              Karriere <ArrowUpRight size={12} />
            </Link>
            <Link href="/kontakt/">Kontakt & Anfahrt</Link>
          </div>
          <div>
            <h2>Ihr Weg zu uns</h2>
            <a href={site.map} target="_blank" rel="noopener noreferrer">
              {site.address}
              <br />
              {site.postal}
            </a>
            <a href={site.phoneHref}>{site.phone}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <p className="footer-note">Termine nach Vereinbarung</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Albina Beauty Concept</span>
          <span>Mit Liebe zur Schönheit. In Köln.</span>
          <div>
            <Link href="/impressum/">Impressum</Link>
            <Link href="/datenschutzerklaerung/">Datenschutz</Link>
            <Link href="/cookie-richtlinie-eu/">Cookies</Link>
            <CookieSettingsButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
