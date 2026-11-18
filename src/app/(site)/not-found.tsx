import { getSiteContent } from "@/cms/site-content";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default async function NotFound() {
  const { copy } = await getSiteContent();
  return (
    <section className="container not-found section-pad">
      <p className="eyebrow">{copy.notFound.eyebrow}</p>
      <h1>
        {copy.notFound.title}
        <br />
        <em>{copy.notFound.emphasis}</em>
      </h1>
      <p>{copy.notFound.text}</p>
      <Link className="button button-primary" href={copy.notFound.link}>
        {copy.notFound.linkText}
        <ArrowUpRight size={17} />
      </Link>
      <Link className="text-link" href={copy.notFound.link2}>
        {copy.notFound.linkText2}
        <ArrowUpRight size={16} />
      </Link>
    </section>
  );
}
