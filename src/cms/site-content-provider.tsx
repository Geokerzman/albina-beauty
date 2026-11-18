"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { ClientSiteContent } from "./site-content";

const SiteContentContext = createContext<ClientSiteContent | null>(null);

export function SiteContentProvider({
  content,
  children,
}: {
  content: ClientSiteContent;
  children: ReactNode;
}) {
  return <SiteContentContext.Provider value={content}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const content = useContext(SiteContentContext);
  if (!content) throw new Error("SiteContentProvider is required");
  return content;
}
