import { getSiteContent } from "@/cms/site-content";
import Link from "next/link";
import { ArrowUpRight, Instagram } from "lucide-react";
import { Wordmark } from "./header";
import { BookButton } from "./booking";
import { CookieSettingsButton } from "./ui/cookie-consent";
export async function ClosingInvitation() {
  const { copy } = await getSiteContent();
  return (
    <section className="closing-invitation">
      <div className="container">
        <p className="eyebrow">{copy.closingInvitation.eyebrow}</p>
        <h2>
          {copy.closingInvitation.heading}
          <br />
          <em>{copy.closingInvitation.emphasis}</em>
        </h2>
        <p>{copy.closingInvitation.text}</p>
        <BookButton variant="light" />
        <span className="closing-line" aria-hidden="true" />
      </div>
    </section>
  );
}
export async function Footer() {
  const { site, copy } = await getSiteContent();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Wordmark />
            <p>
              {copy.footer.text}
              <br />
              {copy.footer.text2}
            </p>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={copy.footer.ariaLabel}
            >
              <Instagram size={18} />
            </a>
          </div>
          <div>
            <h2>{copy.footer.heading}</h2>
            <Link href={copy.footer.link}>{copy.footer.linkText}</Link>
            <Link href={copy.footer.link2}>{copy.footer.linkText2}</Link>
            <Link href={copy.footer.link3}>{copy.footer.linkText3}</Link>
            <Link href={copy.footer.link4}>{copy.footer.linkText4}</Link>
          </div>
          <div>
            <h2>{copy.footer.heading2}</h2>
            <Link href={copy.footer.link5}>{copy.footer.linkText5}</Link>
            <Link href={copy.footer.link6}>{copy.footer.linkText6}</Link>
            <Link href={copy.footer.link7}>
              {copy.footer.linkText7}
              <ArrowUpRight size={12} />
            </Link>
            <Link href={copy.footer.link8}>{copy.footer.linkText8}</Link>
          </div>
          <div>
            <h2>{copy.footer.heading3}</h2>
            <a href={site.map} target="_blank" rel="noopener noreferrer">
              {site.address}
              <br />
              {site.postal}
            </a>
            <a href={site.phoneHref}>{site.phone}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <p className="footer-note">{copy.footer.text3}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()}
            {copy.footer.text4}
          </span>
          <span>{copy.footer.text5}</span>
          <div>
            <Link href={copy.footer.link9}>{copy.footer.linkText9}</Link>
            <Link href={copy.footer.link10}>{copy.footer.linkText10}</Link>
            <Link href={copy.footer.link11}>{copy.footer.linkText11}</Link>
            <CookieSettingsButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
