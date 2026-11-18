"use client";
import { useSiteContent } from "@/cms/site-content-provider";
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
const BookingContext = createContext<(service?: string) => void>(() => {});
export function BookingProvider({ children }: { children: ReactNode }) {
  const { copy } = useSiteContent();
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
          <p className="eyebrow">{copy.bookingDialog.eyebrow}</p>
          <DialogTitle className="dialog-heading">
            {copy.bookingDialog.heading}
            <br />
            <em>{copy.bookingDialog.emphasis}</em>
          </DialogTitle>
          <DialogDescription className="muted">{copy.bookingDialog.description}</DialogDescription>
          <BookingForm initialService={service} />
        </DialogContent>
      </Dialog>
    </BookingContext.Provider>
  );
}
export function BookButton({ service, children, ...props }: ButtonProps & { service?: string }) {
  const { copy } = useSiteContent();
  const open = useContext(BookingContext);
  return (
    <Button onClick={() => open(service)} {...props}>
      {children || (
        <>
          {copy.bookingButton.text}
          <ArrowUpRight size={17} />
        </>
      )}
    </Button>
  );
}
export function BookingForm({ initialService = "" }: { initialService?: string }) {
  const { services, site, copy } = useSiteContent();
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
  const text = [
    copy.bookingForm.messageIntro,
    name.trim() ? `${copy.bookingForm.messageName}${name.trim()}.` : "",
    selected
      ? `${copy.bookingForm.messageService}${selected}.`
      : copy.bookingForm.messageConsultation,
    date ? `${copy.bookingForm.messageDate}${date.split("-").reverse().join(".")}.` : "",
    message.trim() ? ` ${message.trim()}` : "",
  ].join("");
  return (
    <form className="booking-form" onSubmit={submit}>
      <label>
        {copy.bookingForm.label}
        <select
          value={selected}
          onChange={(e) => {
            setSelected(e.target.value);
            setReady(false);
          }}
        >
          <option value="">{copy.bookingForm.option}</option>
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
          {copy.bookingForm.label2}
          <span>{copy.bookingForm.text}</span>
          <input
            autoComplete="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setReady(false);
            }}
            placeholder={copy.bookingForm.placeholder}
            maxLength={80}
          />
        </label>
        <label>
          {copy.bookingForm.label3}
          <span>{copy.bookingForm.text2}</span>
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
        {copy.bookingForm.label4}
        <span>{copy.bookingForm.text3}</span>
        <textarea
          rows={3}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setReady(false);
          }}
          placeholder={copy.bookingForm.placeholder2}
          maxLength={1000}
        />
      </label>
      {ready ? (
        <div className="booking-ready" role="status">
          <div>
            <Check size={17} />
            {copy.bookingForm.text4}
          </div>
          <Button asChild>
            <a
              href={`${site.whatsapp}?text=${encodeURIComponent(text)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.bookingForm.linkText}
              <ArrowUpRight size={17} />
            </a>
          </Button>
          <p>{copy.bookingForm.text5}</p>
        </div>
      ) : (
        <Button type="submit">
          {copy.bookingForm.buttonText}
          <MessageCircle size={17} />
        </Button>
      )}
      <p className="form-note">
        {copy.bookingForm.text6}
        <a href={site.phoneHref}>{site.phone}</a>
        {copy.bookingForm.text7}
      </p>
    </form>
  );
}
