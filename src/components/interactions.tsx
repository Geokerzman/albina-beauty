"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { BookButton } from "./booking";
import { euro } from "@/lib/utils";
import {
  services,
  serviceHref,
  gallery,
  team,
  priceGroups,
  type PriceGroup,
  type Service,
} from "@/content/site";

export function ServiceCard({
  service,
  index = 0,
  eager = false,
}: {
  service: Service;
  index?: number;
  eager?: boolean;
}) {
  return (
    <Link className="service-card" href={serviceHref(service)}>
      <div className="service-card-image">
        <Image
          src={`/images/${service.image}`}
          alt={service.imageAlt}
          fill
          sizes="(max-width: 650px) 90vw, (max-width: 1000px) 45vw, 30vw"
          loading={eager ? "eager" : "lazy"}
        />
        <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
        {service.tag && <span className="image-tag">{service.tag}</span>}
        <span className="card-arrow">
          <ArrowUpRight size={22} />
        </span>
      </div>
      <div className="service-card-heading">
        <h3>{service.label || service.title}</h3>
        <span>{service.duration}</span>
      </div>
      <p>{service.description}</p>
    </Link>
  );
}
export function TreatmentExplorer({ initialCategory = "Alle" }: { initialCategory?: string }) {
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState("");
  const filtered = services.filter(
    (s) =>
      (category === "Alle" || s.category === category) &&
      `${s.title} ${s.description}`.toLocaleLowerCase("de").includes(query.toLocaleLowerCase("de")),
  );
  return (
    <div className="explorer">
      <div className="explorer-controls">
        <div className="filter-tabs" role="group" aria-label="Treatments filtern">
          {["Alle", "Gesicht", "Körper & Entspannung", "Beauty Essentials", "Physiotherapie"].map(
            (c) => (
              <button
                className={category === c ? "selected" : ""}
                onClick={() => setCategory(c)}
                key={c}
                aria-pressed={category === c}
              >
                {c}
              </button>
            ),
          )}
        </div>
        <label className="search-field">
          <Search size={17} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Treatment suchen"
            aria-label="Treatment suchen"
          />
        </label>
      </div>
      <p className="results-count" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "Treatment" : "Treatments"} für Sie
      </p>
      <div className="treatment-grid">
        {filtered.map((s, i) => (
          <ServiceCard key={s.slug} service={s} index={i} eager={i < 3} />
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-results">
          <h3>Ein neuer Suchwunsch?</h3>
          <p>Versuchen Sie einen anderen Begriff oder lassen Sie sich persönlich beraten.</p>
          <button
            className="text-link"
            onClick={() => {
              setQuery("");
              setCategory("Alle");
            }}
          >
            Alle Treatments anzeigen <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
export function PriceList({
  groups,
  compact = false,
}: {
  groups: PriceGroup[];
  compact?: boolean;
}) {
  return (
    <div className={`price-groups ${compact ? "price-groups-compact" : ""}`}>
      {groups.map((g) => (
        <section className="price-group" id={g.id} key={g.id}>
          <div className="price-group-head">
            <span className="eyebrow">Ihre Behandlung</span>
            <h3>{g.title}</h3>
          </div>
          <div className="price-items">
            {g.items.map((item, i) => (
              <div className="price-item" key={`${item.name}-${i}`}>
                <div>
                  <h4>{item.name}</h4>
                  {item.duration && <span className="price-duration">{item.duration}</span>}
                  {item.description && (
                    <details className="price-description">
                      <summary>
                        Details zur Behandlung <ChevronDown size={12} />
                      </summary>
                      <p>{item.description}</p>
                    </details>
                  )}
                </div>
                <div className="price-item-action">
                  <span>{euro(item.price)}</span>
                  <BookButton
                    service={`${g.title} – ${item.name}${item.duration ? ` (${item.duration})` : ""}`}
                    variant="ghost"
                    size="icon"
                    aria-label={`${item.name} anfragen`}
                  >
                    <ArrowUpRight size={18} />
                  </BookButton>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
export function PriceExplorer() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("all");
  const filtered = priceGroups
    .filter((g) => group === "all" || group === g.id)
    .map((g) => ({
      ...g,
      items: g.items.filter((i) =>
        `${g.title} ${i.name} ${i.description}`.toLowerCase().includes(query.toLowerCase()),
      ),
    }))
    .filter((g) => g.items.length);
  return (
    <div className="prices-layout">
      <aside className="prices-sidebar">
        <span className="eyebrow">
          <SlidersHorizontal size={13} /> Behandlungen
        </span>
        <button className={group === "all" ? "selected" : ""} onClick={() => setGroup("all")}>
          Alle Behandlungen <span>{priceGroups.reduce((n, g) => n + g.items.length, 0)}</span>
        </button>
        {priceGroups.map((g) => (
          <button
            key={g.id}
            className={g.id === group ? "selected" : ""}
            onClick={() => setGroup(g.id)}
          >
            {g.title}
            <ArrowUpRight size={13} />
          </button>
        ))}
      </aside>
      <div>
        <label className="search-field price-search">
          <Search size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Behandlung oder Pflegewunsch suchen"
            aria-label="Preisliste durchsuchen"
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="Suche zurücksetzen">
              <X size={16} />
            </button>
          )}
        </label>
        <div aria-live="polite">
          <PriceList groups={filtered} />
          {!filtered.length && (
            <p className="empty-results">
              Keine passende Behandlung gefunden. Versuchen Sie einen anderen Suchbegriff.
            </p>
          )}
        </div>
        <p className="pricing-note">
          Alle Preise in Euro. Den passenden Behandlungsumfang besprechen wir persönlich. Bei Fragen
          sind wir gerne für Sie da.
        </p>
      </div>
    </div>
  );
}
export function StudioGallery({ preview = false }: { preview?: boolean }) {
  const [selected, setSelected] = useState<number | null>(null);
  const items = preview ? gallery.slice(0, 4) : gallery;
  const next = (direction: number) =>
    setSelected((i) => (i === null ? null : (i + direction + gallery.length) % gallery.length));
  useEffect(() => {
    if (selected === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight")
        setSelected((i) => (i === null ? null : (i + 1) % gallery.length));
      if (e.key === "ArrowLeft")
        setSelected((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selected]);
  return (
    <>
      <div className={preview ? "gallery-preview" : "studio-gallery"}>
        {items.map((item, i) => (
          <button
            key={item.src}
            onClick={() => setSelected(i)}
            className="gallery-item"
            aria-label={`${item.alt} vergrößern`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes={preview ? "(max-width:650px) 70vw, 24vw" : "(max-width:650px) 90vw, 45vw"}
              loading={!preview && i < 3 ? "eager" : "lazy"}
            />
            <span>
              <ArrowUpRight size={22} />
            </span>
          </button>
        ))}
      </div>
      <Dialog
        open={selected !== null}
        onOpenChange={(o) => {
          if (!o) setSelected(null);
        }}
      >
        <DialogContent className="gallery-dialog">
          <DialogTitle className="sr-only">Einblicke in unser Studio</DialogTitle>
          <DialogDescription className="sr-only">
            Mit den Pfeiltasten oder den Schaltflächen können Sie zwischen den Fotografien wechseln.
          </DialogDescription>
          {selected !== null && (
            <>
              <div className="lightbox-image">
                <Image src={gallery[selected].src} alt={gallery[selected].alt} fill sizes="90vw" />
              </div>
              <div className="lightbox-caption">
                <span>{gallery[selected].alt}</span>
                <span>
                  {selected + 1} / {gallery.length}
                </span>
              </div>
              <button
                className="lightbox-prev"
                onClick={() => next(-1)}
                aria-label="Vorheriges Foto"
              >
                <ArrowLeft />
              </button>
              <button className="lightbox-next" onClick={() => next(1)} aria-label="Nächstes Foto">
                <ArrowRight />
              </button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
export function TeamGrid() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <>
      <div className="team-grid">
        {team.map((person, i) => (
          <button className="team-card" onClick={() => setSelected(i)} key={person.name}>
            <div className="team-photo">
              <Image
                src={`/images/${person.image}`}
                alt={person.name}
                fill
                sizes="(max-width:650px) 44vw, 20vw"
              />
              <span className="card-arrow">
                <ArrowUpRight size={20} />
              </span>
            </div>
            <h3>{person.name}</h3>
            <p>{person.role}</p>
            <span className="text-link">
              Kennenlernen <ArrowUpRight size={13} />
            </span>
          </button>
        ))}
      </div>
      <Dialog
        open={selected !== null}
        onOpenChange={(o) => {
          if (!o) setSelected(null);
        }}
      >
        <DialogContent className="team-dialog">
          {selected !== null && (
            <>
              <Image
                src={`/images/${team[selected].image}`}
                alt={team[selected].name}
                width={120}
                height={120}
                className="team-dialog-photo"
              />
              <p className="eyebrow">{team[selected].role}</p>
              <DialogTitle className="dialog-heading">{team[selected].name}</DialogTitle>
              <DialogDescription className="team-quote">„{team[selected].bio}“</DialogDescription>
              <p>{team[selected].detail}</p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
export function FAQ({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="faq-list">
      {items.map((item, i) => (
        <details key={item.question}>
          <summary>
            <span className="faq-number">{String(i + 1).padStart(2, "0")}</span>
            <span>{item.question}</span>
            <span className="faq-plus">+</span>
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
