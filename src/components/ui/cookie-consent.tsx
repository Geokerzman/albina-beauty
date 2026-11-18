"use client";
import { useSiteContent } from "@/cms/site-content-provider";

import Link from "next/link";
import { Cookie, MapPin } from "lucide-react";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "./button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./dialog";

const storageKey = "albina-cookie-consent-v1";
const retentionMs = 180 * 24 * 60 * 60 * 1000;

function readConsent(): boolean | null {
  try {
    const value = localStorage.getItem(storageKey);
    if (value) {
      const { maps, expiresAt } = JSON.parse(value);
      if (typeof maps === "boolean" && typeof expiresAt === "number" && expiresAt > Date.now()) {
        return maps;
      }
    }
  } catch {
    // If storage is unavailable or invalid, require an explicit choice.
  }
  return null;
}

const ConsentContext = createContext<{
  mapsAllowed: boolean;
  openSettings: (trigger: HTMLButtonElement) => void;
}>({ mapsAllowed: false, openSettings: () => {} });

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const { copy } = useSiteContent();
  const [consent, setConsent] = useState<boolean | null>();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mapsSelected, setMapsSelected] = useState(false);
  const settingsTrigger = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function syncConsent(event?: StorageEvent) {
      if (!event || event.key === storageKey || event.key === null) {
        setConsent(readConsent());
      }
    }
    syncConsent();
    window.addEventListener("storage", syncConsent);
    return () => window.removeEventListener("storage", syncConsent);
  }, []);

  function saveConsent(maps: boolean) {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ maps, expiresAt: Date.now() + retentionMs }),
      );
    } catch {
      // Apply the choice in this tab even when the browser blocks storage.
    }
    setConsent(maps);
    setSettingsOpen(false);
  }

  function openSettings(trigger: HTMLButtonElement) {
    settingsTrigger.current = trigger;
    setMapsSelected(consent === true);
    setSettingsOpen(true);
  }

  return (
    <ConsentContext.Provider value={{ mapsAllowed: consent === true, openSettings }}>
      {children}
      {consent === null && (
        <aside className="cookie-consent" aria-labelledby="cookie-consent-title">
          <h2 id="cookie-consent-title">
            <Cookie size={22} aria-hidden="true" />
            {copy.cookieBanner.heading}
          </h2>
          <p>{copy.cookieBanner.text}</p>
          <div className="cookie-consent-actions">
            <Button type="button" variant="outline" size="sm" onClick={() => saveConsent(false)}>
              {copy.cookieBanner.buttonText}
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => saveConsent(true)}>
              {copy.cookieBanner.buttonText2}
            </Button>
          </div>
          <div className="cookie-consent-links">
            <button type="button" onClick={(event) => openSettings(event.currentTarget)}>
              {copy.cookieBanner.buttonText3}
            </button>
            <Link href={copy.cookieBanner.link}>{copy.cookieBanner.linkText}</Link>
          </div>
        </aside>
      )}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent
          className="cookie-settings"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            const trigger = settingsTrigger.current;
            const target = trigger?.isConnected ? trigger : document.getElementById("main-content");
            target?.focus({ preventScroll: true });
          }}
        >
          <DialogTitle>{copy.cookieBanner.heading2}</DialogTitle>
          <DialogDescription>{copy.cookieBanner.description}</DialogDescription>
          <div className="cookie-setting">
            <div>
              <strong>{copy.cookieBanner.text2}</strong>
              <p>{copy.cookieBanner.text3}</p>
            </div>
            <span>{copy.cookieBanner.text4}</span>
          </div>
          <label className="cookie-setting">
            <span>
              <strong>{copy.cookieBanner.text5}</strong>
              <span id="cookie-maps-description">{copy.cookieBanner.text6}</span>
            </span>
            <input
              type="checkbox"
              aria-label={copy.cookieBanner.ariaLabel}
              aria-describedby="cookie-maps-description"
              checked={mapsSelected}
              onChange={(event) => setMapsSelected(event.target.checked)}
            />
          </label>
          <div className="cookie-consent-actions">
            <Button type="button" variant="outline" size="sm" onClick={() => saveConsent(false)}>
              {copy.cookieBanner.buttonText4}
            </Button>
            <Button type="button" size="sm" onClick={() => saveConsent(mapsSelected)}>
              {copy.cookieBanner.buttonText5}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </ConsentContext.Provider>
  );
}

export function CookieSettingsButton() {
  const { copy } = useSiteContent();
  const { openSettings } = useContext(ConsentContext);
  return (
    <button
      type="button"
      className="cookie-settings-link"
      onClick={(event) => openSettings(event.currentTarget)}
    >
      {copy.cookieSettings.buttonText}
    </button>
  );
}

export function ConsentMap({ src, title }: { src: string; title: string }) {
  const { copy } = useSiteContent();
  const { mapsAllowed, openSettings } = useContext(ConsentContext);
  return (
    <div className="contact-mini-map">
      {mapsAllowed ? (
        <iframe
          src={src}
          title={title}
          width="220"
          height="150"
          loading="lazy"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <div className="contact-map-placeholder">
          <MapPin size={19} aria-hidden="true" />
          <span>{copy.cookieMap.text}</span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={(event) => openSettings(event.currentTarget)}
          >
            {copy.cookieMap.buttonText}
          </Button>
        </div>
      )}
    </div>
  );
}
