"use client";
import { useSiteContent } from "@/cms/site-content-provider";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { BookButton } from "./booking";
import { euro } from "@/lib/utils";
import { imagePath } from "@/lib/image-path";
import { serviceHref, type PriceGroup, type Service } from "@/content/site";

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
          src={imagePath(service.image)}
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
  const { services, copy } = useSiteContent();
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
        <div className="filter-tabs" role="group" aria-label={copy.treatmentExplorer.ariaLabel}>
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
            placeholder={copy.treatmentExplorer.placeholder}
            aria-label={copy.treatmentExplorer.ariaLabel2}
          />
        </label>
      </div>
      <p className="results-count" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "Treatment" : "Treatments"}
        {copy.treatmentExplorer.text}
      </p>
      <div className="treatment-grid">
        {filtered.map((s, i) => (
          <ServiceCard key={s.slug} service={s} index={i} eager={i < 3} />
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-results">
          <h3>{copy.treatmentExplorer.subheading}</h3>
          <p>{copy.treatmentExplorer.text2}</p>
          <button
            className="text-link"
            onClick={() => {
              setQuery("");
              setCategory("Alle");
            }}
          >
            {copy.treatmentExplorer.buttonText}
            <ArrowRight size={16} />
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
  const { copy } = useSiteContent();
  return (
    <div className={`price-groups ${compact ? "price-groups-compact" : ""}`}>
      {groups.map((g) => (
        <section className="price-group" id={g.id} key={g.id}>
          <div className="price-group-head">
            <span className="eyebrow">{copy.priceList.eyebrow}</span>
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
                        {copy.priceList.text}
                        <ChevronDown size={12} />
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
  const { priceGroups, copy } = useSiteContent();
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
          <SlidersHorizontal size={13} />
          {copy.priceExplorer.eyebrow}
        </span>
        <button className={group === "all" ? "selected" : ""} onClick={() => setGroup("all")}>
          {copy.priceExplorer.buttonText}
          <span>{priceGroups.reduce((n, g) => n + g.items.length, 0)}</span>
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
            placeholder={copy.priceExplorer.placeholder}
            aria-label={copy.priceExplorer.ariaLabel}
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label={copy.priceExplorer.ariaLabel2}>
              <X size={16} />
            </button>
          )}
        </label>
        <div aria-live="polite">
          <PriceList groups={filtered} />
          {!filtered.length && <p className="empty-results">{copy.priceExplorer.text}</p>}
        </div>
        <p className="pricing-note">{copy.priceExplorer.text2}</p>
      </div>
    </div>
  );
}
export function TeamGrid() {
  const { team, copy } = useSiteContent();
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <>
      <div className="team-grid">
        {team.map((person, i) => (
          <button className="team-card" onClick={() => setSelected(i)} key={person.name}>
            <div className="team-photo">
              <Image
                src={imagePath(person.image)}
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
              {copy.teamControls.text}
              <ArrowUpRight size={13} />
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
                src={imagePath(team[selected].image)}
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
