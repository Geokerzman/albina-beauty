"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Maximize2 } from "lucide-react";
import { useSiteContent } from "@/cms/site-content-provider";
import { imagePath } from "@/lib/image-path";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";

export function StudioGallery({ preview = false }: { preview?: boolean }) {
  const { gallery, copy } = useSiteContent();
  const labels = copy.galleryControls;
  const [activeIndex, setActiveIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const active = Math.min(activeIndex, gallery.length - 1);
  const photo = selected === null ? undefined : gallery[selected];
  const hasSeveralPhotos = gallery.length > 1;

  useEffect(() => {
    const strip = thumbnailsRef.current;
    const thumbnail = strip?.children[active] as HTMLElement | undefined;
    if (!strip || !thumbnail) return;

    const start = thumbnail.offsetLeft;
    const end = start + thumbnail.offsetWidth;
    if (start < strip.scrollLeft) strip.scrollLeft = start;
    if (end > strip.scrollLeft + strip.clientWidth) strip.scrollLeft = end - strip.clientWidth;
  }, [active]);

  if (!gallery.length) return null;

  const openPhoto = (index: number, opener: HTMLButtonElement) => {
    openerRef.current = opener;
    touchStart.current = null;
    setSelected(index);
  };

  const moveLightbox = (step: number) => {
    setSelected((index) =>
      index === null ? null : (index + step + gallery.length) % gallery.length,
    );
  };

  const scrollToSlide = (index: number, behavior: ScrollBehavior = "instant") => {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (track && slide) track.scrollTo({ left: slide.offsetLeft, behavior });
  };

  const handleTrackKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const indexByKey = {
      ArrowLeft: Math.max(active - 1, 0),
      ArrowRight: Math.min(active + 1, gallery.length - 1),
      Home: 0,
      End: gallery.length - 1,
    };
    if (!Object.hasOwn(indexByKey, event.key)) return;
    const index = indexByKey[event.key as keyof typeof indexByKey];

    event.preventDefault();
    scrollToSlide(index);
    (trackRef.current?.children[index] as HTMLElement | undefined)?.focus({ preventScroll: true });
  };

  return (
    <>
      {preview ? (
        <div className="gallery-preview">
          {gallery.slice(0, 4).map((item, index) => (
            <button
              key={`${item.src}-${index}`}
              type="button"
              onClick={(event) => openPhoto(index, event.currentTarget)}
              className="gallery-item"
              aria-label={`${item.alt} vergrößern`}
              aria-haspopup="dialog"
            >
              <Image
                src={imagePath(item.src)}
                alt={item.alt}
                fill
                sizes="(max-width: 650px) 70vw, 24vw"
              />
              <span aria-hidden="true">
                <ArrowUpRight size={22} />
              </span>
            </button>
          ))}
        </div>
      ) : (
        <section className="studio-gallery" aria-label={labels.heading}>
          <div
            ref={trackRef}
            className="studio-gallery-track"
            data-single={!hasSeveralPhotos || undefined}
            onScroll={(event) => {
              const track = event.currentTarget;
              const secondSlide = track.children[1] as HTMLElement | undefined;
              if (secondSlide) {
                const index = Math.round(track.scrollLeft / secondSlide.offsetLeft);
                setActiveIndex(Math.max(0, Math.min(index, gallery.length - 1)));
              }
            }}
          >
            {gallery.map((item, index) => (
              <button
                key={`${item.src}-${index}`}
                type="button"
                className="studio-gallery-slide"
                aria-label={`${item.alt} vergrößern`}
                aria-haspopup="dialog"
                tabIndex={index === active ? 0 : -1}
                onKeyDown={handleTrackKey}
                onClick={(event) => openPhoto(index, event.currentTarget)}
              >
                <span className="studio-gallery-photo">
                  <Image
                    src={imagePath(item.src)}
                    alt=""
                    fill
                    sizes="(max-width: 700px) 90vw, (max-width: 1250px) 45vw, 480px"
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : undefined}
                  />
                </span>
                <span className="studio-gallery-details">
                  <span className="studio-gallery-caption">{item.alt}</span>
                  <span className="studio-gallery-enlarge">
                    <Maximize2 size={16} aria-hidden="true" />
                    <span>Foto vergrößern</span>
                  </span>
                </span>
              </button>
            ))}
          </div>
          {hasSeveralPhotos && (
            <div className="studio-gallery-toolbar">
              <div
                ref={thumbnailsRef}
                className="studio-gallery-thumbnails"
                role="group"
                aria-label="Foto auswählen"
              >
                {gallery.map((item, index) => (
                  <button
                    key={`${item.src}-${index}`}
                    type="button"
                    aria-label={`Foto ${index + 1} von ${gallery.length}: ${item.alt}`}
                    aria-current={index === active ? "true" : undefined}
                    onClick={() => scrollToSlide(index)}
                  >
                    <span>
                      <Image src={imagePath(item.src)} alt="" fill sizes="64px" />
                    </span>
                  </button>
                ))}
              </div>
              <div className="studio-gallery-navigation">
                <button
                  type="button"
                  aria-label={labels.ariaLabel}
                  aria-disabled={active === 0}
                  onClick={() => scrollToSlide(active - 1, "auto")}
                >
                  <ArrowLeft size={20} aria-hidden="true" />
                </button>
                <span className="studio-gallery-count" role="status">
                  <span aria-hidden="true">
                    {active + 1} / {gallery.length}
                  </span>
                  <span className="sr-only">{`Foto ${active + 1} von ${gallery.length}: ${gallery[active].alt}`}</span>
                </span>
                <button
                  type="button"
                  aria-label={labels.ariaLabel2}
                  aria-disabled={active === gallery.length - 1}
                  onClick={() => scrollToSlide(active + 1, "auto")}
                >
                  <ArrowRight size={20} aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </section>
      )}
      <Dialog open={!!photo} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent
          className="gallery-dialog"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            openerRef.current?.focus({ preventScroll: true });
          }}
          onKeyDown={(event) => {
            if (!hasSeveralPhotos || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
            event.preventDefault();
            moveLightbox(event.key === "ArrowLeft" ? -1 : 1);
          }}
        >
          <DialogTitle className="sr-only">{labels.heading}</DialogTitle>
          <DialogDescription className="sr-only">{labels.description}</DialogDescription>
          {selected !== null && photo && (
            <>
              <div
                className="lightbox-image"
                onTouchStart={(event) => {
                  const finger = event.touches.length === 1 ? event.touches[0] : null;
                  touchStart.current = finger ? { x: finger.clientX, y: finger.clientY } : null;
                }}
                onTouchCancel={() => {
                  touchStart.current = null;
                }}
                onTouchEnd={(event) => {
                  const start = touchStart.current;
                  const finger = event.changedTouches[0];
                  touchStart.current = null;
                  if (!hasSeveralPhotos || !start || !finger || event.touches.length) return;

                  const dx = finger.clientX - start.x;
                  const dy = finger.clientY - start.y;
                  if (Math.abs(dx) > 45 && Math.abs(dx) > 1.5 * Math.abs(dy)) {
                    moveLightbox(dx < 0 ? 1 : -1);
                  }
                }}
              >
                <Image
                  src={imagePath(photo.src)}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 650px) 100vw, 60vw"
                />
              </div>
              <div className="lightbox-caption" role="status">
                <span>{photo.alt}</span>
                <span>
                  {selected + 1} / {gallery.length}
                </span>
              </div>
              {hasSeveralPhotos && (
                <>
                  <button
                    className="lightbox-prev"
                    type="button"
                    onClick={() => moveLightbox(-1)}
                    aria-label={labels.ariaLabel}
                  >
                    <ArrowLeft aria-hidden="true" />
                  </button>
                  <button
                    className="lightbox-next"
                    type="button"
                    onClick={() => moveLightbox(1)}
                    aria-label={labels.ariaLabel2}
                  >
                    <ArrowRight aria-hidden="true" />
                  </button>
                </>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
