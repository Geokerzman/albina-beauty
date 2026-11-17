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
import { homePage, type HomeBlock } from "@/content/pages";
import {
  services,
  serviceHref,
  priceGroups,
  categoryDescriptions,
  site,
  jobs,
  type Service,
  type Category,
  type PriceGroup,
} from "@/content/site";
import { euro } from "@/lib/utils";
import legal from "@/content/legal.json";

export function Breadcrumbs({
  current,
  parent,
}: {
  current: string;
  parent?: { label: string; href: string };
}) {
  return (
    <nav className="breadcrumbs container" aria-label="Brotkrumennavigation">
      <Link href="/">Startseite</Link>
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
function HomeHero({ block }: { block: Extract<HomeBlock, { blockType: "hero" }> }) {
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
          <Link href="/leistungen/" className="text-link">
            Treatments entdecken <ArrowDown size={15} />
          </Link>
        </div>
        <div className="hero-footnote">
          <Flower2 size={24} strokeWidth={1} />
          <span>Individuell. Achtsam. Für Sie.</span>
        </div>
      </div>
      <div className="hero-image-wrap">
        <div className="hero-image">
          <Image
            src={`/images/${block.image}`}
            alt="Redaktionelles Beauty-Motiv: ein ruhiger Moment in warmem Sonnenlicht"
            fill
            priority
            sizes="(max-width: 800px) 100vw, 50vw"
          />
        </div>
        <Link
          href="/ueber-uns/"
          className="hero-image-caption"
          aria-label="Unser Studio kennenlernen"
        >
          <span>Weniger Alltag.</span>
          <em>Mehr Sie.</em>
          <ArrowUpRight size={24} strokeWidth={1} />
        </Link>
        <span className="hero-image-side">THE ART OF PERSONAL BEAUTY</span>
      </div>
      <a href="#treatments" className="hero-scroll" aria-label="Treatments entdecken">
        <ArrowDown size={18} />
      </a>
    </section>
  );
}
export function StudioStory({
  block,
}: {
  block: Extract<HomeBlock, { blockType: "studioStory" }>;
}) {
  return (
    <section className="studio-story section-pad container">
      <div className="studio-images">
        <div className="studio-main-image">
          <Image
            src={`/images/${block.image}`}
            alt="Der einladende Empfangsbereich unseres Studios in Köln Weiden"
            fill
            sizes="(max-width:800px) 85vw, 40vw"
          />
        </div>
        <div className="studio-secondary-image">
          <Image
            src={`/images/${block.secondaryImage}`}
            alt="Detail unseres gemütlichen Pedikürebereichs"
            fill
            sizes="(max-width:800px) 45vw, 22vw"
          />
        </div>
        <span className="studio-image-label">KÖLN WEIDEN · SEIT 2019</span>
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
        <Link href="/ueber-uns/" className="text-link">
          Unsere Geschichte kennenlernen <ArrowUpRight size={16} />
        </Link>
        <div className="founder-signature">
          <span>Albina</span>
          <small>INHABERIN & IHRE GASTGEBERIN</small>
        </div>
      </div>
    </section>
  );
}
export function HomeBlockRenderer({ blocks = homePage.layout }: { blocks?: HomeBlock[] }) {
  return (
    <>
      {blocks.map((block) => (
        <div key={block.id} id={block.id} data-block-type={block.blockType}>
          {renderHomeBlock(block)}
        </div>
      ))}
    </>
  );
}
function renderHomeBlock(block: HomeBlock) {
  switch (block.blockType) {
    case "hero":
      return <HomeHero block={block} />;
    case "brands":
      return (
        <section className="brand-strip container" aria-label="Unsere Pflegemarken">
          <span className="brand-strip-label">
            GUTE PFLEGE.
            <br />
            AUSGEWÄHLTE PARTNER.
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
              <Link href="/leistungen/" className="text-link">
                Alle Treatments entdecken <ArrowUpRight size={16} />
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
      return <StudioStory block={block} />;
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
                      ? "/leistungen/kosmetische-behandlungen/"
                      : cat === "Körper & Entspannung"
                        ? "/leistungen/wellness/"
                        : cat === "Physiotherapie"
                          ? "/leistungen/private-physiotherapie/"
                          : "/leistungen/"
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
            <Link className="text-link" href="/galerie/">
              Mehr Einblicke <ArrowUpRight size={16} />
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
              Noch eine Frage?
              <br />
              Wir sind gerne für Sie da.
            </p>
            <Link href="/kontakt/" className="text-link">
              Kontakt aufnehmen <ArrowUpRight size={16} />
            </Link>
          </div>
          <FAQ items={block.items} />
        </section>
      );
    case "invitation":
      return <ClosingInvitation />;
  }
}
export function CatalogPage({ category }: { category?: "Gesicht" | "Körper & Entspannung" }) {
  return (
    <>
      <Breadcrumbs current={category || "Treatments"} />
      <PageIntro
        eyebrow="Ihre persönliche Auszeit"
        title={
          category === "Gesicht"
            ? "Die Kunst schöner Hautpflege."
            : category === "Körper & Entspannung"
              ? "Wohlfühlen beginnt bei Ihnen."
              : "Was tut Ihnen heute gut?"
        }
        description={
          category
            ? categoryDescriptions[category]
            : "Entdecken Sie unsere Welt aus Hautpflege, Beauty und Wohlbefinden. Persönlich ausgewählt. Sorgfältig auf Sie abgestimmt."
        }
      />
      <section className="container catalog-section">
        <h2 className="sr-only">Unsere Treatments im Überblick</h2>
        <TreatmentExplorer key={category || "Alle"} initialCategory={category || "Alle"} />
      </section>
      <section className="consultation-strip container">
        <Flower2 size={34} strokeWidth={1} />
        <div>
          <h2>Noch auf der Suche nach Ihrem Treatment?</h2>
          <p>Wir beraten Sie persönlich und finden gemeinsam Ihre passende Pflege.</p>
        </div>
        <BookButton variant="outline">
          Beratung anfragen <ArrowUpRight size={16} />
        </BookButton>
      </section>
      <ClosingInvitation />
    </>
  );
}
export function groupsForService(service: Service): PriceGroup[] {
  const groups = priceGroups.filter((g) => service.priceIds.includes(g.id));
  if (service.slug === "klassische-gesichtsbehandlung")
    return groups.map((g) => ({
      ...g,
      items: g.items.filter(
        (i) => i.name.includes("Gesichtsreinigung") || i.name.includes("jugendliche Haut"),
      ),
    }));
  if (service.slug === "is-clinical-behandlung")
    return groups.map((g) => ({
      ...g,
      items: g.items.filter((i) => !i.name.includes("Gesichtsreinigung")),
    }));
  return groups;
}
export function ServicePage({ service }: { service: Service }) {
  const groups = groupsForService(service);
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
        parent={{ label: "Treatments", href: "/leistungen/" }}
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
                <span>ab {euro(first.price)}</span>
              </>
            )}
          </div>
          <BookButton service={service.title} />
          <a className="text-link" href="#behandlungen-preise">
            Behandlungen & Preise <ArrowDown size={15} />
          </a>
        </div>
        <div className={`service-hero-image ${service.slug === "exosome" ? "product-image" : ""}`}>
          <Image
            src={`/images/${service.image}`}
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
          <p className="eyebrow">Ein Treatment, so persönlich wie Sie</p>
          <h2>
            {service.category === "Physiotherapie" ? (
              <>
                Für mehr Bewegung.
                <br />
                <em>Für Ihr Wohlbefinden.</em>
              </>
            ) : service.slug === "massage" ? (
              <>
                Ein Moment Ruhe.
                <br />
                <em>Ganz für Sie.</em>
              </>
            ) : service.category === "Beauty Essentials" ? (
              <>
                Für die Details,
                <br />
                <em>die Sie ausmachen.</em>
              </>
            ) : service.slug === "body-fx-by-inmode" ? (
              <>
                Ihr Körper.
                <br />
                <em>Ihr gutes Gefühl.</em>
              </>
            ) : (
              <>
                Für Ihr ganz
                <br />
                <em>eigenes Hautgefühl.</em>
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
          <p className="eyebrow">Ihr Treatment, Schritt für Schritt</p>
          <h2>
            Vier Schritte. <em>Ein Frischemoment.</em>
          </h2>
          <div>
            {["Abtragen", "Peelen", "Ausreinigen", "Hydratisieren"].map((title, i) => (
              <article key={title}>
                <Image
                  src={`/images/${["HydrafacialMD_Schritt_1-1024x576.jpg", "HydrafacialMD_Schritt_2-1024x576.jpg", "HydrafacialMD_Schritt_3.jpg", "HydrafacialMD_Schritt_4-1024x576.jpg"][i]}`}
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
              <p className="eyebrow">Zeit für Ihre Pflege</p>
              <h2>
                Ihr Treatment.
                <br />
                <em>Auf einen Blick.</em>
              </h2>
            </div>
            <Link href="/preisliste/" className="text-link">
              Die gesamte Preisliste <ArrowUpRight size={16} />
            </Link>
          </div>
          <PriceList groups={groups} compact />
        </div>
      </section>
      <section className="container visit-steps section-pad">
        <p className="eyebrow">Bei uns sind Sie in guten Händen</p>
        <h2>
          Ihr Besuch. <em>In aller Ruhe.</em>
        </h2>
        <div>
          {[
            {
              title: "Wir lernen Sie kennen.",
              text: "Ihre Wünsche, Ihr Hautgefühl und Ihre Fragen stehen zuerst. Gemeinsam besprechen wir die passende Behandlung.",
            },
            {
              title: "Ihr persönlicher Moment.",
              text: "Wir stimmen die Anwendung auf Sie ab und nehmen uns die Zeit für eine sorgfältige, achtsame Behandlung.",
            },
            {
              title: "Ein gutes Gefühl für danach.",
              text: "Sie erhalten auf Wunsch passende Pflegeempfehlungen. Weitere Termine planen wir gemeinsam mit Ihnen.",
            },
          ].map((step, i) => (
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
          Ihre Fragen. <em>Unsere Antworten.</em>
        </h2>
        <FAQ
          items={[
            {
              question: "Ist dieses Treatment das richtige für mich?",
              answer:
                "Das klären wir in einem persönlichen Beratungsgespräch. Bitte informieren Sie uns vorab über Besonderheiten Ihrer Haut, aktuelle Behandlungen oder gesundheitliche Fragen.",
            },
            {
              question: "Wie kann ich einen Termin vereinbaren?",
              answer:
                "Über „Termin vereinbaren“ bereiten Sie Ihre Anfrage vor und öffnen sie anschließend in WhatsApp. Alternativ können Sie uns anrufen oder eine E-Mail schreiben. Wir bestätigen Ihren Termin persönlich.",
            },
            {
              question: "Was sollte ich vor meinem Besuch beachten?",
              answer:
                "Die Vorbereitung hängt von der gewählten Behandlung ab. Fragen Sie uns bei der Terminvereinbarung nach den passenden Hinweisen. Wir beraten Sie auch zur Nachpflege.",
            },
          ]}
        />
      </section>
      {related.length > 0 && (
        <section className="container section-pad">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Vielleicht auch etwas für Sie</p>
              <h2>Mehr Wohlfühlmomente.</h2>
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
export function PricesPage() {
  return (
    <>
      <Breadcrumbs current="Behandlungen & Preise" />
      <PageIntro
        eyebrow="Klar. Persönlich. Auf einen Blick."
        title="Ein Moment für Sie.\nEin gutes Gefühl dabei."
        description="Entdecken Sie unsere Behandlungen und Preise. Gerne beraten wir Sie bei der Auswahl Ihres persönlichen Pflegerituals."
      />
      <section className="container section-pad-top">
        <h2 className="sr-only">Die gesamte Preisliste</h2>
        <PriceExplorer />
      </section>
      <ClosingInvitation />
    </>
  );
}
export function AboutPage({ teamOnly = false }: { teamOnly?: boolean }) {
  return (
    <>
      <Breadcrumbs current={teamOnly ? "Unser Team" : "Unser Studio"} />
      <PageIntro
        eyebrow={
          teamOnly
            ? "Die Menschen hinter Ihrem Wohlfühlmoment"
            : "Die Philosophie von Albina Beauty Concept"
        }
        title={
          teamOnly
            ? "Mit Herz. Mit Erfahrung.\nGanz für Sie."
            : "Schönheit ist persönlich.\nUnsere Pflege auch."
        }
        description={
          teamOnly
            ? "Lernen Sie die Menschen kennen, die Ihren Besuch besonders machen."
            : "Wir glauben an Pflege, die mehr kann als nur gut aussehen. An persönliche Begegnungen. Und an kleine Auszeiten mit großer Wirkung."
        }
      />
      {!teamOnly && (
        <>
          <div className="container about-wide-image">
            <Image
              src="/images/photo_2021-10-02_23-07-13-1024x1024.jpg"
              alt="Willkommen im Albina Beauty Concept Studio"
              fill
              priority
              sizes="90vw"
            />
          </div>
          <section className="container founder-story section-pad">
            <div className="founder-portrait">
              <Image
                src="/images/albina_beautyconcept_fotograf_anuanet_studio-1616-604x1024.jpg"
                alt="Albina Letova, Gründerin von Albina Beauty Concept"
                fill
                sizes="(max-width:800px) 80vw, 35vw"
              />
            </div>
            <div>
              <p className="eyebrow">Hallo, ich bin Albina.</p>
              <h2>
                Zwei Berufe.
                <br />
                Eine Leidenschaft.
                <br />
                <em>Ihr Wohlbefinden.</em>
              </h2>
              <p>
                Als Physiotherapeutin und Kosmetikerin betrachte ich Schönheit und Wohlbefinden
                ganzheitlich. Beide Berufe verbindet für mich die Freude daran, Menschen etwas Gutes
                zu tun.
              </p>
              <p>
                Seit 2019 ist Albina Beauty Concept mein Ort dafür. Ein Studio, in dem moderne
                Behandlungen auf persönliche Aufmerksamkeit treffen. Wo wir zuhören, bevor wir
                beginnen – und gemeinsam mit Ihnen einen individuellen Beauty-Plan entwickeln.
              </p>
              <p>Ich freue mich darauf, Sie kennenzulernen.</p>
              <span className="signature">Albina</span>
            </div>
          </section>
          <section className="values-section">
            <div className="container">
              <p className="eyebrow">Was uns wichtig ist</p>
              <div>
                {[
                  {
                    title: "Persönlichkeit",
                    text: "Jede Haut ist anders. Jeder Mensch auch. Deshalb beginnt jede Behandlung mit einem Gespräch.",
                  },
                  {
                    title: "Sorgfalt",
                    text: "Professionelle Produkte, sorgfältige Handarbeit und die passende Technik – für eine Pflege, die zu Ihnen passt.",
                  },
                  {
                    title: "Ganzheitlichkeit",
                    text: "Kosmetik, Wellness und Physiotherapie vereinen wir zu einem Konzept für Schönheit und Wohlbefinden.",
                  },
                ].map((v, i) => (
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
            <p className="eyebrow">Persönlichkeiten mit Leidenschaft</p>
            <h2>
              Schön, Sie <em>kennenzulernen.</em>
            </h2>
          </div>
          <p>
            Ein erfahrenes Team.
            <br />
            Eine gemeinsame Liebe zum Detail.
          </p>
        </div>
        <TeamGrid />
      </section>
      <ClosingInvitation />
    </>
  );
}
export function GalleryPage() {
  return (
    <>
      <Breadcrumbs current="Einblicke" />
      <PageIntro
        centered
        eyebrow="Willkommen bei uns"
        title="Ein Ort.\nViele schöne Momente."
        description="Echte Einblicke in unser Studio, unsere Arbeit und die kleinen Details, die Ihren Besuch besonders machen."
      />
      <section className="container gallery-page">
        <StudioGallery />
      </section>
      <ClosingInvitation />
    </>
  );
}
export function ContactPage() {
  return (
    <>
      <Breadcrumbs current="Kontakt & Anfahrt" />
      <PageIntro
        eyebrow="Wir freuen uns auf Sie"
        title="Ihr Weg zu uns.\nUnd zu sich selbst."
        description="Eine Frage, ein Pflegewunsch oder Ihr nächster Termin – wir sind gerne persönlich für Sie da."
      />
      <section className="container contact-layout">
        <div className="contact-image">
          <Image
            src="/images/photo_2021-10-02_23-02-47-1024x739.jpg"
            alt="Behandlungsraum und professionelle Pflege im Albina Beauty Studio"
            fill
            priority
            sizes="(max-width:800px) 100vw, 45vw"
          />
        </div>
        <div className="contact-details">
          <p className="eyebrow">Albina Beauty Concept</p>
          <h2>
            Besuchen Sie uns
            <br />
            <em>in Köln Weiden.</em>
          </h2>
          <div className="contact-item">
            <MapPin size={19} />
            <div>
              <span>Unser Studio</span>
              <p>
                {site.address}
                <br />
                {site.postal}
              </p>
              <a href={site.map} target="_blank" rel="noopener noreferrer" className="text-link">
                Route planen <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
          <div className="contact-item">
            <Phone size={18} />
            <div>
              <span>Rufen Sie uns an</span>
              <a href={site.phoneHref}>{site.phone}</a>
              <a href="tel:+491723771177">{site.mobile}</a>
            </div>
          </div>
          <div className="contact-item">
            <Mail size={18} />
            <div>
              <span>Schreiben Sie uns</span>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
          </div>
          <p className="contact-timing">Termine nach persönlicher Vereinbarung.</p>
          <BookButton />
        </div>
      </section>
      <section className="container contact-note section-pad">
        <p className="eyebrow">Einfach ankommen</p>
        <h2>
          In Ruhe geplant.
          <br />
          <em>Entspannt angekommen.</em>
        </h2>
        <p>
          Planen Sie Ihre Anfahrt über Google Maps. Bei Fragen zu Ihrem Besuch, einem besonderen
          Anliegen oder einem Hausbesuch für private Physiotherapie sprechen Sie uns gerne vorab an.
        </p>
        <a href={site.map} target="_blank" rel="noopener noreferrer" className="text-link">
          Anfahrt in Google Maps öffnen <ArrowUpRight size={16} />
        </a>
      </section>
      <ClosingInvitation />
    </>
  );
}
export function CareersPage() {
  return (
    <>
      <Breadcrumbs current="Karriere" />
      <PageIntro
        eyebrow="Gemeinsam Schönes schaffen"
        title="Ihre Leidenschaft.\nUnser nächstes Kapitel."
        description="Sie lieben Ihren Beruf und möchten Menschen mit Ihrer Arbeit etwas Gutes tun? Dann lernen wir Sie gerne kennen."
      />
      <div className="container career-intro">
        <p>
          Bei Albina Beauty Concept erwartet Sie ein persönliches Team, hochwertige Produkte, ein
          stilvolles Studio und Raum für Ihre fachliche Weiterentwicklung.
        </p>
        <span className="eyebrow">Unsere offenen Positionen</span>
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
                <h3>Das erwartet Sie</h3>
                <ul>
                  {job.tasks.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Das bringen Sie mit</h3>
                <p>{job.profile}</p>
                <h3>Was wir Ihnen bieten</h3>
                <p>
                  Ein modernes Arbeitsumfeld, hochwertige Ausstattung, Weiterbildungsmöglichkeiten,
                  attraktive Vergütung und ein kollegiales Team.
                </p>
              </div>
              <Button asChild>
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent(`Bewerbung als ${job.title}`)}`}
                >
                  Jetzt per E-Mail bewerben <ArrowUpRight size={16} />
                </a>
              </Button>
            </div>
          </details>
        ))}
      </section>
      <section className="container career-contact section-pad">
        <h2>
          Wir freuen uns auf <em>Ihre Persönlichkeit.</em>
        </h2>
        <p>
          Senden Sie uns Ihren Lebenslauf, Zeugnisse und Zertifikate an{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>. Ihre Bewerbung behandeln wir
          vertraulich.
        </p>
      </section>
      <ClosingInvitation />
    </>
  );
}
export function ShopPage() {
  return (
    <>
      <Breadcrumbs current="Pflege für zu Hause" />
      <section className="container shop-editorial section-pad">
        <div>
          <p className="eyebrow">Ihr Ritual geht weiter</p>
          <h1>
            Ein Stück Pflege.
            <br />
            <em>Für jeden Tag.</em>
          </h1>
          <p>
            Die passende Pflege hört nicht an der Studiotür auf. Wir beraten Sie persönlich zu
            Produkten von iS Clinical und NOON – abgestimmt auf Ihre Haut und Ihre Behandlungen.
          </p>
          <BookButton service="Produktberatung">
            Produktberatung anfragen <ArrowUpRight size={16} />
          </BookButton>
          <Link className="text-link" href="/kontakt/">
            Persönlich Kontakt aufnehmen <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="shop-image">
          <Image
            src="/images/noon.jpg"
            alt="NOON Hautpflegeprodukte für die tägliche Pflegeroutine"
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
export function BookingPage() {
  return (
    <>
      <Breadcrumbs current="Termin vereinbaren" />
      <section className="container booking-page section-pad">
        <div>
          <p className="eyebrow">Zeit für Sie</p>
          <h1>
            Ihr nächster
            <br />
            <em>Wohlfühlmoment.</em>
          </h1>
          <p>
            Bereiten Sie Ihre Anfrage vor. In WhatsApp senden Sie die Nachricht anschließend selbst
            an unser Team. Wir stimmen Ihren Termin persönlich mit Ihnen ab.
          </p>
          <div className="booking-direct">
            <span>Lieber direkt?</span>
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
export function LegalPage({ slug }: { slug: string }) {
  const content = legal[slug as keyof typeof legal];
  if (!content) return null;
  return (
    <>
      <Breadcrumbs current={content.title} />
      <PageIntro eyebrow="Informationen & Transparenz" title={content.title} />
      <section className="container legal-layout">
        <aside>
          <Link href="/impressum/">Impressum</Link>
          <Link href="/datenschutzerklaerung/">Datenschutz</Link>
          <Link href="/cookie-richtlinie-eu/">Cookie-Richtlinie</Link>
          <Link href="/kontakt/">Kontakt</Link>
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
export function ArchivePage({ author = false }: { author?: boolean }) {
  return (
    <>
      <Breadcrumbs current={author ? "Autor: Albina" : "Archiv"} />
      <PageIntro
        eyebrow="Albina Beauty Concept"
        title={author ? "Aus unserem Studio." : "Das Beauty-Archiv."}
        description="Unsere aktuellen Behandlungen und Preise finden Sie in der zentralen Übersicht."
      />
      <section className="container archive-content">
        <Link href="/preisliste/" className="archive-link">
          <div>
            <p className="eyebrow">Behandlungen & Preise</p>
            <h2>Ihre Pflege. Auf einen Blick.</h2>
            <p>Entdecken Sie das aktuelle Angebot unseres Studios.</p>
          </div>
          <ArrowUpRight size={30} />
        </Link>
      </section>
      <ClosingInvitation />
    </>
  );
}
