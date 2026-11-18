"use client";

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
      localStorage.setItem(storageKey, JSON.stringify({ maps, expiresAt: Date.now() + retentionMs }));
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
            <Cookie size={22} aria-hidden="true" /> Cookie-Einstellungen
          </h2>
          <p>
            Wir speichern Ihre Auswahl auf diesem Gerät. Wenn Sie zustimmen, laden wir Google Maps
            auf der Kontaktseite. Dabei werden Daten an Google übertragen.
          </p>
          <div className="cookie-consent-actions">
            <Button type="button" variant="outline" size="sm" onClick={() => saveConsent(false)}>
              Nur notwendige
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => saveConsent(true)}>
              Alle akzeptieren
            </Button>
          </div>
          <div className="cookie-consent-links">
            <button type="button" onClick={(event) => openSettings(event.currentTarget)}>
              Einstellungen
            </button>
            <Link href="/cookie-richtlinie-eu/">Cookie-Richtlinie</Link>
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
          <DialogTitle>Cookie-Einstellungen</DialogTitle>
          <DialogDescription>
            Legen Sie fest, ob Google Maps auf der Kontaktseite geladen werden darf.
          </DialogDescription>
          <div className="cookie-setting">
            <div>
              <strong>Notwendige Speicherung</strong>
              <p>Speichert Ihre Auswahl auf diesem Gerät.</p>
            </div>
            <span>Immer aktiv</span>
          </div>
          <label className="cookie-setting">
            <span>
              <strong>Google Maps</strong>
              <span id="cookie-maps-description">
                Zeigt die Karte auf der Kontaktseite an und überträgt dabei Daten an Google.
              </span>
            </span>
            <input
              type="checkbox"
              aria-label="Google Maps"
              aria-describedby="cookie-maps-description"
              checked={mapsSelected}
              onChange={(event) => setMapsSelected(event.target.checked)}
            />
          </label>
          <div className="cookie-consent-actions">
            <Button type="button" variant="outline" size="sm" onClick={() => saveConsent(false)}>
              Nur notwendige
            </Button>
            <Button type="button" size="sm" onClick={() => saveConsent(mapsSelected)}>
              Auswahl speichern
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </ConsentContext.Provider>
  );
}

export function CookieSettingsButton() {
  const { openSettings } = useContext(ConsentContext);
  return (
    <button
      type="button"
      className="cookie-settings-link"
      onClick={(event) => openSettings(event.currentTarget)}
    >
      Cookie-Einstellungen
    </button>
  );
}

export function ConsentMap({ src, title }: { src: string; title: string }) {
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
          <span>Google Maps</span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={(event) => openSettings(event.currentTarget)}
          >
            Karte freigeben
          </Button>
        </div>
      )}
    </div>
  );
}
