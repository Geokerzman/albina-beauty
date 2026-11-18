import { getSiteContent, type BlockCopy } from "@/cms/site-content";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Flower2,
  MapPin,
  Phone,
  Mail,
  Sparkles,
} from "lucide-react";
import { BookButton, BookingForm } from "./booking";
import { ClosingInvitation } from "./footer";
import {
  ServiceCard,
  TreatmentExplorer,
  PriceExplorer,
  PriceList,
  StudioGallery,
  TeamGrid,
  FAQ,
} from "./interactions";
import { Button } from "./ui/button";
import { ConsentMap, CookieSettingsButton } from "./ui/cookie-consent";
import type { HomeBlock } from "@/content/pages";
import { serviceHref, type Service, type Category, type PriceGroup } from "@/content/site";
import { euro } from "@/lib/utils";
import { imagePath } from "@/lib/image-path";

export async function Breadcrumbs({
  current,
  parent,
}: {
  current: string;
  parent?: { label: string; href: string };
}) {
  const { copy } = await getSiteContent();
  return (
    <nav className="breadcrumbs container" aria-label={copy.breadcrumbs.ariaLabel}>
      <Link href={copy.breadcrumbs.link}>{copy.breadcrumbs.linkText}</Link>
      <span>/</span>
      {parent && (
        <>
          <Link href={parent.href}>{parent.label}</Link>
          <span>/</span>
        </>
      )}
      <span aria-current="page">{current}</span>
    </nav>
  );
}
export function PageIntro({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={`page-intro container ${centered ? "page-intro-centered" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title.replace(/\\n/g, "\n")}</h1>
      {description && <p className="page-description">{description}</p>}
    </div>
  );
}
function HomeHero({
  block,
  copy,
}: {
  block: Extract<HomeBlock, { blockType: "hero" }>;
  copy: BlockCopy;
}) {
  return (
    <section className="home-hero">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="tiny-line" />
          {block.eyebrow}
        </p>
        <h1>
          {block.title[0]}
          <br />
          {block.title[1]}
          <br />
          <em>{block.title[2]}</em>
        </h1>
        <p className="hero-description">{block.description}</p>
        <div className="hero-cta">
          <BookButton />
          <Link href={copy.homeHero.link} className="text-link">
            {copy.homeHero.linkText}
            <ArrowDown size={15} />
          </Link>
        </div>
        <div className="hero-footnote">
          <Flower2 size={24} strokeWidth={1} />
          <span>{copy.homeHero.text}</span>
        </div>
      </div>
      <div className="hero-image-wrap">
        <div className="hero-image">
          <Image
            src={imagePath(block.image)}
            alt={copy.homeHero.imageAlt}
            fill
            priority
            sizes="(max-width: 800px) 100vw, 50vw"
          />
        </div>
        <Link
          href={copy.homeHero.link2}
          className="hero-image-caption"
          aria-label={copy.homeHero.ariaLabel}
        >
          <span>{copy.homeHero.text2}</span>
          <em>{copy.homeHero.emphasis}</em>
          <ArrowUpRight size={24} strokeWidth={1} />
        </Link>
        <span className="hero-image-side">{copy.homeHero.text3}</span>
      </div>
      <a href={copy.homeHero.link3} className="hero-scroll" aria-label={copy.homeHero.ariaLabel2}>
        <ArrowDown size={18} />
      </a>
    </section>
  );
}
export function StudioStory({
  block,
  copy,
}: {
  block: Extract<HomeBlock, { blockType: "studioStory" }>;
  copy: BlockCopy;
}) {
  return (
    <section className="studio-story section-pad container">
      <div className="studio-images">
        <div className="studio-main-image">
          <Image
            src={imagePath(block.image)}
            alt={copy.studioStory.imageAlt}
            fill
            sizes="(max-width:800px) 85vw, 40vw"
          />
        </div>
        <div className="studio-secondary-image">
          <Image
            src={imagePath(block.secondaryImage)}
            alt={copy.studioStory.imageAlt2}
            fill
            sizes="(max-width:800px) 45vw, 22vw"
          />
        </div>
        <span className="studio-image-label">{copy.studioStory.text}</span>
      </div>
      <div className="studio-story-copy">
        <p className="eyebrow">{block.eyebrow}</p>
        <h2>
          {block.title.split("\n").map((line, i) => (
            <span key={line}>
              {i === block.title.split("\n").length - 1 ? <em>{line}</em> : line}
              <br />
            </span>
          ))}
        </h2>
        <p>{block.text}</p>
        <Link href={copy.studioStory.link} className="text-link">
          {copy.studioStory.linkText}
          <ArrowUpRight size={16} />
        </Link>
        <div className="founder-signature">
          <span>{copy.studioStory.text2}</span>
          <small>{copy.studioStory.text3}</small>
        </div>
      </div>
    </section>
  );
}
export async function HomeBlockRenderer({ blocks }: { blocks?: HomeBlock[] }) {
  const { homeBlocks, copy, services, categoryDescriptions } = await getSiteContent();
  return (
    <>
      {(blocks ?? homeBlocks).map((block) => (
        <div key={block.id} id={block.id} data-block-type={block.blockType}>
          {renderHomeBlock(block, copy, services, categoryDescriptions)}
        </div>
      ))}
    </>
  );
}
function renderHomeBlock(
  block: HomeBlock,
  copy: BlockCopy,
  services: Service[],
  categoryDescriptions: Record<Category, string>,
) {
  switch (block.blockType) {
    case "hero":
      return <HomeHero block={block} copy={copy} />;
    case "brands":
      return (
        <section className="brand-strip container" aria-label={copy.homeBrands.ariaLabel}>
          <span className="brand-strip-label">
            {copy.homeBrands.text}
            <br />
            {copy.homeBrands.text2}
          </span>
          {block.brands.map((brand) => (
            <span
              className={`brand-name ${brand === "HydraFacial" ? "brand-hydra" : ""}`}
              key={brand}
            >
              {brand}
            </span>
          ))}
        </section>
      );
    case "featuredTreatments":
      return (
        <section className="section-pad container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{block.eyebrow}</p>
              <h2>
                {block.title.split("\n").map((line, i) => (
                  <span key={line}>
                    {i === 1 ? <em>{line}</em> : line}
                    <br />
                  </span>
                ))}
              </h2>
            </div>
            <div>
              <p>{block.description}</p>
              <Link href={copy.homeTreatments.link} className="text-link">
                {copy.homeTreatments.linkText}
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
          <div className="featured-grid">
            {block.serviceSlugs.map((slug, i) => {
              const s = services.find((s) => s.slug === slug);
              return s ? <ServiceCard service={s} key={slug} index={i} /> : null;
            })}
          </div>
        </section>
      );
    case "studioStory":
      return <StudioStory block={block} copy={copy} />;
    case "philosophy":
      return (
        <section className="philosophy-section section-pad">
          <div className="container philosophy-inner">
            <div>
              <p className="eyebrow">{block.eyebrow}</p>
              <h2>
                {block.title.split("\n").map((line, i) => (
                  <span key={line}>
                    {i === 2 ? <em>{line}</em> : line}
                    <br />
                  </span>
                ))}
              </h2>
              <p>{block.text}</p>
              <Flower2 size={60} strokeWidth={0.65} />
            </div>
            <div className="philosophy-links">
              {(
                [
                  "Gesicht",
                  "Beauty Essentials",
                  "Körper & Entspannung",
                  "Physiotherapie",
                ] as Category[]
              ).map((cat, i) => (
                <Link
                  key={cat}
                  href={
                    cat === "Gesicht"
                      ? copy.homePhilosophy.link
                      : cat === "Körper & Entspannung"
                        ? copy.homePhilosophy.link2
                        : cat === "Physiotherapie"
                          ? copy.homePhilosophy.link3
                          : copy.homePhilosophy.link4
                  }
                >
                  <span className="eyebrow">0{i + 1}</span>
                  <div>
                    <h3>{cat}</h3>
                    <p>{categoryDescriptions[cat]}</p>
                  </div>
                  <ArrowUpRight size={24} strokeWidth={1} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      );
    case "gallery":
      return (
        <section className="section-pad gallery-section">
          <div className="container section-heading">
            <div>
              <p className="eyebrow">{block.eyebrow}</p>
              <h2>
                {block.title.split("\n")[0]}
                <br />
                <em>{block.title.split("\n")[1]}</em>
              </h2>
            </div>
            <Link className="text-link" href={copy.homeGallery.link}>
              {copy.homeGallery.linkText}
              <ArrowUpRight size={16} />
            </Link>
          </div>
          <StudioGallery preview />
        </section>
      );
    case "faq":
      return (
        <section className="section-pad container home-faq">
          <div>
            <p className="eyebrow">{block.eyebrow}</p>
            <h2>{block.title}</h2>
            <p>
              {copy.homeFaq.text}
              <br />
              {copy.homeFaq.text2}
            </p>
            <Link href={copy.homeFaq.link} className="text-link">
              {copy.homeFaq.linkText}
              <ArrowUpRight size={16} />
            </Link>
          </div>
          <FAQ items={block.items} />
        </section>
      );
    case "invitation":
      return <ClosingInvitation />;
  }
}
export async function CatalogPage({ category }: { category?: "Gesicht" | "Körper & Entspannung" }) {
  const { categoryDescriptions, copy } = await getSiteContent();
  return (
    <>
      <Breadcrumbs current={category || copy.catalogIntro.text} />
      <PageIntro
        eyebrow={copy.catalogIntro.eyebrow}
        title={
          category === "Gesicht"
            ? copy.catalogIntro.title
            : category === "Körper & Entspannung"
              ? copy.catalogIntro.title2
              : copy.catalogIntro.title3
        }
        description={category ? categoryDescriptions[category] : copy.catalogIntro.description}
      />
      <section className="container catalog-section">
        <h2 className="sr-only">{copy.catalogResults.heading}</h2>
        <TreatmentExplorer key={category || "Alle"} initialCategory={category || "Alle"} />
      </section>
      <section className="consultation-strip container">
        <Flower2 size={34} strokeWidth={1} />
        <div>
          <h2>{copy.catalogConsultation.heading}</h2>
          <p>{copy.catalogConsultation.text}</p>
        </div>
        <BookButton variant="outline">
          {copy.catalogConsultation.buttonText}
          <ArrowUpRight size={16} />
        </BookButton>
      </section>
      <ClosingInvitation />
    </>
  );
}
function groupsForService(service: Service, priceGroups: PriceGroup[]): PriceGroup[] {
  return priceGroups
    .filter((group) => service.priceIds.includes(group.id))
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => !item.treatment || item.treatment === service.slug),
    }))
    .filter((group) => group.items.length > 0);
}
export async function ServicePage({ service }: { service: Service }) {
  const { services, priceGroups, copy } = await getSiteContent();
  const groups = groupsForService(service, priceGroups);
  const first =
    service.slug === "klassische-gesichtsbehandlung"
      ? groups.find((g) => g.id === "klassische-gesichtspflege")?.items[0]
      : groups[0]?.items[0];
  const related = services
    .filter((s) => s.category === service.category && s.slug !== service.slug)
    .slice(0, 3);
  return (
    <>
      <Breadcrumbs
        current={service.label || service.title}
        parent={{ label: copy.serviceHero.text, href: "/leistungen/" }}
      />
      <section className="container service-hero">
        <div className="service-hero-copy">
          <p className="eyebrow">
            {service.category} · {service.eyebrow}
          </p>
          <h1>{service.title}</h1>
          <p>{service.description}</p>
          <div className="service-meta">
            <span>{service.duration}</span>
            {first && (
              <>
                <span className="meta-divider" />
                <span>
                  {copy.serviceHero.text2}
                  {euro(first.price)}
                </span>
              </>
            )}
          </div>
          <BookButton service={service.title} />
          <a className="text-link" href={copy.serviceHero.link}>
            {copy.serviceHero.linkText}
            <ArrowDown size={15} />
          </a>
        </div>
        <div className={`service-hero-image ${service.slug === "exosome" ? "product-image" : ""}`}>
          <Image
            src={imagePath(service.image)}
            alt={service.imageAlt}
            fill
            priority
            sizes="(max-width:800px) 100vw, 48vw"
          />
          {service.tag && <span className="image-tag">{service.tag}</span>}
        </div>
      </section>
      <div className="benefit-strip container">
        {service.benefits.map((b) => (
          <span key={b}>
            <Check size={15} />
            {b}
          </span>
        ))}
      </div>
      <section className="container treatment-story section-pad">
        <div>
          <p className="eyebrow">{copy.serviceStory.eyebrow}</p>
          <h2>
            {service.category === "Physiotherapie" ? (
              <>
                {copy.serviceStory.text}
                <br />
                <em>{copy.serviceStory.emphasis}</em>
              </>
            ) : service.slug === "massage" ? (
              <>
                {copy.serviceStory.text2}
                <br />
                <em>{copy.serviceStory.emphasis2}</em>
              </>
            ) : service.category === "Beauty Essentials" ? (
              <>
                {copy.serviceStory.text3}
                <br />
                <em>{copy.serviceStory.emphasis3}</em>
              </>
            ) : service.slug === "body-fx-by-inmode" ? (
              <>
                {copy.serviceStory.text4}
                <br />
                <em>{copy.serviceStory.emphasis4}</em>
              </>
            ) : (
              <>
                {copy.serviceStory.text5}
                <br />
                <em>{copy.serviceStory.emphasis5}</em>
              </>
            )}
          </h2>
        </div>
        <div>
          <p className="lead-text">{service.intro}</p>
          {service.details.map((detail) => (
            <div className="treatment-detail" key={detail.title}>
              <h3>{detail.title}</h3>
              <p>{detail.text}</p>
            </div>
          ))}
        </div>
      </section>
      {service.slug === "kosmetische-behandlungen/hydrafacial" && (
        <section className="container hydra-steps">
          <p className="eyebrow">{copy.serviceHydraSteps.eyebrow}</p>
          <h2>
            {copy.serviceHydraSteps.heading}
            <em>{copy.serviceHydraSteps.emphasis}</em>
          </h2>
          <div>
            {copy.serviceHydraSteps.steps.map(({ title, image }, i) => (
              <article key={title}>
                <Image
                  src={imagePath(image)}
                  alt={`HydraFacial Schritt ${i + 1}: ${title}`}
                  width={400}
                  height={225}
                />
                <span className="eyebrow">0{i + 1}</span>
                <h3>{title}</h3>
              </article>
            ))}
          </div>
        </section>
      )}
      <section className="treatment-prices section-pad" id="behandlungen-preise">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{copy.servicePrices.eyebrow}</p>
              <h2>
                {copy.servicePrices.heading}
                <br />
                <em>{copy.servicePrices.emphasis}</em>
              </h2>
            </div>
            <Link href={copy.servicePrices.link} className="text-link">
              {copy.servicePrices.linkText}
              <ArrowUpRight size={16} />
            </Link>
          </div>
          <PriceList groups={groups} compact />
        </div>
      </section>
      <section className="container visit-steps section-pad">
        <p className="eyebrow">{copy.serviceVisit.eyebrow}</p>
        <h2>
          {copy.serviceVisit.heading}
          <em>{copy.serviceVisit.emphasis}</em>
        </h2>
        <div>
          {copy.serviceVisit.steps.map((step, i) => (
            <article key={step.title}>
              <span>0{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="container service-faq section-pad">
        <h2>
          {copy.serviceFaq.heading}
          <em>{copy.serviceFaq.emphasis}</em>
        </h2>
        <FAQ items={copy.serviceFaq.questions} />
      </section>
      {related.length > 0 && (
        <section className="container section-pad">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{copy.serviceRelated.eyebrow}</p>
              <h2>{copy.serviceRelated.heading}</h2>
            </div>
          </div>
          <div className="featured-grid">
            {related.map((s, i) => (
              <ServiceCard service={s} index={i} key={s.slug} />
            ))}
          </div>
        </section>
      )}
      <ClosingInvitation />
    </>
  );
}
export async function PricesPage() {
  const { copy } = await getSiteContent();
  return (
    <>
      <Breadcrumbs current={copy.pricesIntro.current} />
      <PageIntro
        eyebrow={copy.pricesIntro.eyebrow}
        title={copy.pricesIntro.title}
        description={copy.pricesIntro.description}
      />
      <section className="container section-pad-top">
        <h2 className="sr-only">{copy.pricesResults.heading}</h2>
        <PriceExplorer />
      </section>
      <ClosingInvitation />
    </>
  );
}
export async function AboutPage({ teamOnly = false }: { teamOnly?: boolean }) {
  const { copy } = await getSiteContent();
  return (
    <>
      <Breadcrumbs current={teamOnly ? copy.aboutIntro.current : copy.aboutIntro.current2} />
      <PageIntro
        eyebrow={teamOnly ? copy.aboutIntro.eyebrow : copy.aboutIntro.eyebrow2}
        title={teamOnly ? copy.aboutIntro.title : copy.aboutIntro.title2}
        description={teamOnly ? copy.aboutIntro.description : copy.aboutIntro.description2}
      />
      {!teamOnly && (
        <>
          <div className="container about-wide-image">
            <Image
              src={imagePath(copy.aboutImage.image)}
              alt={copy.aboutImage.imageAlt}
              fill
              priority
              sizes="90vw"
            />
          </div>
          <section className="container founder-story section-pad">
            <div className="founder-portrait">
              <Image
                src={imagePath(copy.aboutFounder.image)}
                alt={copy.aboutFounder.imageAlt}
                fill
                sizes="(max-width:800px) 80vw, 35vw"
              />
            </div>
            <div>
              <p className="eyebrow">{copy.aboutFounder.eyebrow}</p>
              <h2>
                {copy.aboutFounder.heading}
                <br />
                {copy.aboutFounder.heading2}
                <br />
                <em>{copy.aboutFounder.emphasis}</em>
              </h2>
              <p>{copy.aboutFounder.text}</p>
              <p>{copy.aboutFounder.text2}</p>
              <p>{copy.aboutFounder.text3}</p>
              <span className="signature">{copy.aboutFounder.text4}</span>
            </div>
          </section>
          <section className="values-section">
            <div className="container">
              <p className="eyebrow">{copy.aboutValues.eyebrow}</p>
              <div>
                {copy.aboutValues.values.map((v, i) => (
                  <article key={v.title}>
                    <span className="eyebrow">0{i + 1}</span>
                    <h3>{v.title}</h3>
                    <p>{v.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
      <section className="container section-pad">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{copy.aboutTeam.eyebrow}</p>
            <h2>
              {copy.aboutTeam.heading}
              <em>{copy.aboutTeam.emphasis}</em>
            </h2>
          </div>
          <p>
            {copy.aboutTeam.text}
            <br />
            {copy.aboutTeam.text2}
          </p>
        </div>
        <TeamGrid />
      </section>
      <ClosingInvitation />
    </>
  );
}
export async function GalleryPage() {
  const { copy } = await getSiteContent();
  return (
    <>
      <Breadcrumbs current={copy.galleryIntro.current} />
      <PageIntro
        centered
        eyebrow={copy.galleryIntro.eyebrow}
        title={copy.galleryIntro.title}
        description={copy.galleryIntro.description}
      />
      <section className="container gallery-page">
        <StudioGallery />
      </section>
      <ClosingInvitation />
    </>
  );
}
export async function ContactPage() {
  const { site, copy } = await getSiteContent();
  return (
    <>
      <Breadcrumbs current={copy.contactIntro.current} />
      <PageIntro
        eyebrow={copy.contactIntro.eyebrow}
        title={copy.contactIntro.title}
        description={copy.contactIntro.description}
      />
      <section className="container contact-layout">
        <div className="contact-image">
          <Image
            src={imagePath(copy.contactDetails.image)}
            alt={copy.contactDetails.imageAlt}
            fill
            priority
            sizes="(max-width:800px) 100vw, 45vw"
          />
        </div>
        <div className="contact-details">
          <p className="eyebrow">{copy.contactDetails.eyebrow}</p>
          <h2>
            {copy.contactDetails.heading}
            <br />
            <em>{copy.contactDetails.emphasis}</em>
          </h2>
          <div className="contact-item contact-location">
            <div className="contact-location-body">
              <div className="contact-location-address">
                <MapPin size={19} aria-hidden="true" />
                <div className="contact-location-copy">
                  <span>{copy.contactDetails.text}</span>
                  <p>
                    {site.address}
                    <br />
                    {site.postal}
                  </p>
                  <a
                    href={site.map}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                  >
                    {copy.contactDetails.linkText}
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
              <ConsentMap
                src={site.mapEmbed}
                title={`Albina Beauty Concept – ${site.address}, ${site.postal}`}
              />
            </div>
          </div>
          <div className="contact-item">
            <Phone size={18} />
            <div>
              <span>{copy.contactDetails.text2}</span>
              <a href={site.phoneHref}>{site.phone}</a>
              <a href={site.mobileHref}>{site.mobile}</a>
            </div>
          </div>
          <div className="contact-item">
            <Mail size={18} />
            <div>
              <span>{copy.contactDetails.text3}</span>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
          </div>
          <p className="contact-timing">{copy.contactDetails.text4}</p>
          <BookButton />
        </div>
      </section>
      <ClosingInvitation />
    </>
  );
}
export async function CareersPage() {
  const { site, jobs, copy } = await getSiteContent();
  return (
    <>
      <Breadcrumbs current={copy.careersIntro.current} />
      <PageIntro
        eyebrow={copy.careersIntro.eyebrow}
        title={copy.careersIntro.title}
        description={copy.careersIntro.description}
      />
      <div className="container career-intro">
        <p>{copy.careersOverview.text}</p>
        <span className="eyebrow">{copy.careersOverview.eyebrow}</span>
      </div>
      <section className="container jobs-list">
        {jobs.map((job, i) => (
          <details key={job.title} id={`position-${i + 1}`}>
            <summary>
              <span className="eyebrow">0{i + 1}</span>
              <div>
                <h2>{job.title}</h2>
                <span>{job.type}</span>
              </div>
              <span className="faq-plus">+</span>
            </summary>
            <div className="job-content">
              <div>
                <h3>{copy.careersJobs.subheading}</h3>
                <ul>
                  {job.tasks.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>{copy.careersJobs.subheading2}</h3>
                <p>{job.profile}</p>
                <h3>{copy.careersJobs.subheading3}</h3>
                <p>{copy.careersJobs.text}</p>
              </div>
              <Button asChild>
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent(`Bewerbung als ${job.title}`)}`}
                >
                  {copy.careersJobs.linkText}
                  <ArrowUpRight size={16} />
                </a>
              </Button>
            </div>
          </details>
        ))}
      </section>
      <section className="container career-contact section-pad">
        <h2>
          {copy.careersContact.heading}
          <em>{copy.careersContact.emphasis}</em>
        </h2>
        <p>
          {copy.careersContact.text} <a href={`mailto:${site.email}`}>{site.email}</a>
          {copy.careersContact.text2}
        </p>
      </section>
      <ClosingInvitation />
    </>
  );
}
export async function ShopPage() {
  const { copy } = await getSiteContent();
  return (
    <>
      <Breadcrumbs current={copy.shopIntro.current} />
      <section className="container shop-editorial section-pad">
        <div>
          <p className="eyebrow">{copy.shopIntro.eyebrow}</p>
          <h1>
            {copy.shopIntro.title}
            <br />
            <em>{copy.shopIntro.emphasis}</em>
          </h1>
          <p>{copy.shopIntro.text}</p>
          <BookButton service={copy.shopIntro.service}>
            {copy.shopIntro.buttonText}
            <ArrowUpRight size={16} />
          </BookButton>
          <Link className="text-link" href={copy.shopIntro.link}>
            {copy.shopIntro.linkText}
            <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="shop-image">
          <Image
            src={imagePath(copy.shopIntro.image)}
            alt={copy.shopIntro.imageAlt}
            fill
            priority
            sizes="(max-width:800px) 100vw, 45vw"
          />
        </div>
      </section>
      <ClosingInvitation />
    </>
  );
}
export async function BookingPage() {
  const { site, copy } = await getSiteContent();
  return (
    <>
      <Breadcrumbs current={copy.bookingPage.current} />
      <section className="container booking-page section-pad">
        <div>
          <p className="eyebrow">{copy.bookingPage.eyebrow}</p>
          <h1>
            {copy.bookingPage.title}
            <br />
            <em>{copy.bookingPage.emphasis}</em>
          </h1>
          <p>{copy.bookingPage.text}</p>
          <div className="booking-direct">
            <span>{copy.bookingPage.text2}</span>
            <a href={site.phoneHref}>{site.phone}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>
        <div className="booking-page-form">
          <BookingForm />
        </div>
      </section>
    </>
  );
}
export async function LegalPage({ slug }: { slug: string }) {
  const { legal, copy } = await getSiteContent();
  const content = legal[slug as keyof typeof legal];
  if (!content) return null;
  return (
    <>
      <Breadcrumbs current={content.title} />
      <PageIntro eyebrow={copy.legalLayout.eyebrow} title={content.title} />
      <section className="container legal-layout">
        <aside>
          <Link href={copy.legalLayout.link}>{copy.legalLayout.linkText}</Link>
          <Link href={copy.legalLayout.link2}>{copy.legalLayout.linkText2}</Link>
          <Link href={copy.legalLayout.link3}>{copy.legalLayout.linkText3}</Link>
          {slug === "cookie-richtlinie-eu" && <CookieSettingsButton />}
          <Link href={copy.legalLayout.link4}>{copy.legalLayout.linkText4}</Link>
        </aside>
        <div className="legal-copy">
          {content.body
            .split("\n\n")
            .map((p, i) =>
              p.length < 100 && !p.includes("\n") ? <h2 key={i}>{p}</h2> : <p key={i}>{p}</p>,
            )}
        </div>
      </section>
    </>
  );
}
export async function ArchivePage({ author = false }: { author?: boolean }) {
  const { copy } = await getSiteContent();
  return (
    <>
      <Breadcrumbs current={author ? copy.archiveIntro.current : copy.archiveIntro.current2} />
      <PageIntro
        eyebrow={copy.archiveIntro.eyebrow}
        title={author ? copy.archiveIntro.title : copy.archiveIntro.title2}
        description={copy.archiveIntro.description}
      />
      <section className="container archive-content">
        <Link href={copy.archiveLink.link} className="archive-link">
          <div>
            <p className="eyebrow">{copy.archiveLink.eyebrow}</p>
            <h2>{copy.archiveLink.heading}</h2>
            <p>{copy.archiveLink.text}</p>
          </div>
          <ArrowUpRight size={30} />
        </Link>
      </section>
      <ClosingInvitation />
    </>
  );
}
