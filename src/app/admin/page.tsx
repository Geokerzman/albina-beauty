import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { logout } from "@/cms/actions";
import { LoginForm, SectionForm } from "@/cms/admin-forms";
import { fieldOptions, sectionByKey, sections, type Section } from "@/cms/manifest";
import { isCmsConfigured } from "@/cms/payload";
import { getEditorSession } from "@/cms/session";
import { getStoredSections, readSection } from "@/cms/site-content";
import "./admin.css";

export const metadata: Metadata = {
  title: "Редактирование сайта | Albina Beauty Concept",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

const groups = new Map<string, Section[]>();
for (const section of sections) {
  const group = groups.get(section.group);
  if (group) group.push(section);
  else groups.set(section.group, [section]);
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ block?: string }>;
}) {
  const session = await getEditorSession();
  if (!session) {
    return (
      <main lang="ru" className="cms cms-login">
        <Card>
          <CardHeader>
            <CardTitle>Редактирование сайта</CardTitle>
          </CardHeader>
          <CardContent>
            {isCmsConfigured() ? <LoginForm /> : <Alert>CMS не настроена.</Alert>}
          </CardContent>
        </Card>
        <Button variant="ghost" asChild>
          <a href="/" hrefLang="de">
            Перейти на сайт <ArrowUpRight size={16} />
          </a>
        </Button>
      </main>
    );
  }

  const { block } = await searchParams;
  const selected = (block && sectionByKey.get(block)) || sections[0];
  const saved = await getStoredSections();
  return (
    <main lang="ru" className="cms">
      <header className="cms-top">
        <h1>Редактирование сайта</h1>
        <div>
          <Button variant="outline" size="sm" asChild>
            <a href="/" hrefLang="de" target="_blank" rel="noopener">
              Открыть сайт <ArrowUpRight size={15} />
            </a>
          </Button>
          <form action={logout}>
            <Button type="submit" variant="ghost" size="sm">
              Выйти
            </Button>
          </form>
        </div>
      </header>
      <div className="cms-shell">
        <Card className="cms-navigation">
          <CardHeader>
            <CardTitle>Разделы</CardTitle>
          </CardHeader>
          <nav aria-label="Разделы сайта">
            <Accordion type="multiple" key={selected.group} defaultValue={[selected.group]}>
              {[...groups].map(([group, entries]) => (
                <AccordionItem key={group} value={group}>
                  <AccordionTrigger>{group}</AccordionTrigger>
                  <AccordionContent>
                    {entries.map((section) => (
                      <Button key={section.key} asChild variant="ghost" size="sm">
                        <Link
                          href={{ pathname: "/admin/", query: { block: section.key } }}
                          aria-current={section.key === selected.key ? "page" : undefined}
                          scroll={false}
                        >
                          {section.title}
                        </Link>
                      </Button>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </nav>
        </Card>
        <Card className="cms-editor">
          <CardHeader>
            <p>{selected.group}</p>
            <CardTitle>{selected.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <SectionForm
              key={selected.key}
              section={selected}
              options={fieldOptions}
              content={readSection(saved, selected.key, selected.initial)}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
