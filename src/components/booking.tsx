"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type FormEvent,
} from "react";
import { ArrowUpRight, Check, MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button, type ButtonProps } from "@/components/ui/button";
import { services, site } from "@/content/site";
const BookingContext = createContext<(service?: string) => void>(() => {});
export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState("");
  return (
    <BookingContext.Provider
      value={(value = "") => {
        setService(value);
        setOpen(true);
      }}
    >
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="booking-dialog">
          <p className="eyebrow">Zeit für Sie</p>
          <DialogTitle className="dialog-heading">
            Ihr nächster
            <br />
            <em>Wohlfühlmoment.</em>
          </DialogTitle>
          <DialogDescription className="muted">
            Erzählen Sie uns von Ihrem Wunsch. Gemeinsam finden wir Ihren passenden Termin.
          </DialogDescription>
          <BookingForm initialService={service} />
        </DialogContent>
      </Dialog>
    </BookingContext.Provider>
  );
}
export function BookButton({ service, children, ...props }: ButtonProps & { service?: string }) {
  const open = useContext(BookingContext);
  return (
    <Button onClick={() => open(service)} {...props}>
      {children || (
        <>
          Termin vereinbaren <ArrowUpRight size={17} />
        </>
      )}
    </Button>
  );
}
export function BookingForm({ initialService = "" }: { initialService?: string }) {
  const [selected, setSelected] = useState(initialService);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);
  const [today, setToday] = useState<string>();
  useEffect(() => {
    setToday(new Date().toISOString().slice(0, 10));
  }, []);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setReady(true);
  }
  const text = `Guten Tag, ich möchte gerne einen Termin vereinbaren.${name.trim() ? ` Mein Name ist ${name.trim()}.` : ""}${selected ? ` Ich interessiere mich für ${selected}.` : " Ich wünsche mir eine persönliche Beratung."}${date ? ` Mein Wunschtermin: ${date.split("-").reverse().join(".")}.` : ""}${message.trim() ? ` ${message.trim()}` : ""}`;
  return (
    <form className="booking-form" onSubmit={submit}>
      <label>
        Ihr Treatment
        <select
          value={selected}
          onChange={(e) => {
            setSelected(e.target.value);
            setReady(false);
          }}
        >
          <option value="">Ich wünsche mir eine Beratung</option>
          {selected && !services.some((s) => s.title === selected) && (
            <option value={selected}>{selected}</option>
          )}
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
      </label>
      <div className="form-grid">
        <label>
          Ihr Name <span>(optional)</span>
          <input
            autoComplete="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setReady(false);
            }}
            placeholder="Wie dürfen wir Sie ansprechen?"
            maxLength={80}
          />
        </label>
        <label>
          Wunschtag <span>(optional)</span>
          <input
            type="date"
            min={today}
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setReady(false);
            }}
          />
        </label>
      </div>
      <label>
        Ihre Wünsche <span>(optional)</span>
        <textarea
          rows={3}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setReady(false);
          }}
          placeholder="Was können wir für Sie tun?"
          maxLength={1000}
        />
      </label>
      {ready ? (
        <div className="booking-ready" role="status">
          <div>
            <Check size={17} /> Ihre Anfrage ist vorbereitet.
          </div>
          <Button asChild>
            <a
              href={`${site.whatsapp}?text=${encodeURIComponent(text)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              In WhatsApp öffnen <ArrowUpRight size={17} />
            </a>
          </Button>
          <p>
            Sie senden die Nachricht anschließend selbst in WhatsApp. Ihr Termin ist erst nach
            unserer Bestätigung verbindlich.
          </p>
        </div>
      ) : (
        <Button type="submit">
          Anfrage vorbereiten <MessageCircle size={17} />
        </Button>
      )}
      <p className="form-note">
        Lieber persönlich sprechen? <a href={site.phoneHref}>{site.phone}</a>. Ihre Eingaben werden
        hier nicht gespeichert. Mit dem Öffnen von WhatsApp gelten dessen Datenschutzbedingungen.
      </p>
    </form>
  );
}
