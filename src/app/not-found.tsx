import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function NotFound() {
  return (
    <section className="container not-found section-pad">
      <p className="eyebrow">404 · Ein kleiner Umweg</p>
      <h1>
        Dieser Weg führt
        <br />
        <em>gerade nicht weiter.</em>
      </h1>
      <p>Aber Ihr nächster Wohlfühlmoment wartet schon auf Sie.</p>
      <Link className="button button-primary" href="/">
        Zur Startseite <ArrowUpRight size={17} />
      </Link>
      <Link className="text-link" href="/leistungen/">
        Treatments entdecken <ArrowUpRight size={16} />
      </Link>
    </section>
  );
}
