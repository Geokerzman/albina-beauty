import { cache } from "react";
import blockCopy from "@/content/block-copy.json";
import { homePage } from "@/content/pages";
import {
  categoryDescriptions,
  gallery,
  jobs,
  priceGroups,
  services,
  site,
  team,
} from "@/content/site";
import legal from "@/content/legal.json";
import { routeTitles, sectionByKey, type Value } from "./manifest";
import { getCms, isCmsConfigured } from "./payload";

export const getStoredSections = cache(async () => {
  if (!isCmsConfigured()) return new Map<string, Value>();
  const cms = await getCms();
  const { docs } = await cms.find({ collection: "site-blocks", pagination: false, depth: 0 });
  return new Map(docs.map((doc) => [doc.key as string, doc.content as Value]));
});

function mergeSection(initial: Value, saved: unknown): Value {
  if (typeof initial === "string") return typeof saved === "string" ? saved : initial;
  if (Array.isArray(initial)) {
    return Array.isArray(saved) && initial.length
      ? saved.map((item, index) => mergeSection(initial[index] ?? initial[0], item))
      : initial;
  }
  if (!saved || typeof saved !== "object" || Array.isArray(saved)) return initial;
  return Object.fromEntries(
    Object.entries(initial).map(([key, value]) => [
      key,
      mergeSection(value, (saved as Record<string, unknown>)[key]),
    ]),
  );
}

export function readSection<T>(saved: Map<string, Value>, key: string, initial: T): T {
  const record = sectionByKey.get(key);
  return record ? (mergeSection(record.initial, saved.get(key)) as T) : initial;
}

export const getSiteContent = cache(async () => {
  const saved = await getStoredSections();
  const read = <T>(key: string, initial: T) => readSection(saved, key, initial);
  return {
    copy: Object.fromEntries(
      Object.entries(blockCopy).map(([key, initial]) => [key, read(`copy/${key}`, initial)]),
    ) as typeof blockCopy,
    site: read("site", site),
    services: services.map((service) => ({
      ...service,
      ...read(`services/${service.slug}`, service),
    })),
    priceGroups: priceGroups.map((group) => ({
      ...group,
      ...read(`prices/${group.id}`, group),
    })),
    categoryDescriptions: read("categories", categoryDescriptions),
    gallery: read("gallery", gallery),
    team: read("team", team),
    jobs: read("jobs", jobs),
    legal: Object.fromEntries(
      Object.entries(legal).map(([slug, content]) => [slug, read(`legal/${slug}`, content)]),
    ) as typeof legal,
    homeBlocks: homePage.layout.map((block) => ({
      ...block,
      ...read(`home/${block.id}`, block),
    })),
    seo: Object.fromEntries(
      Object.entries({ ...routeTitles, home: homePage.title }).map(([path, title]) => [
        path,
        read(`seo/${path}`, { title, description: homePage.description }),
      ]),
    ),
  };
});

type SiteContent = Awaited<ReturnType<typeof getSiteContent>>;
export type BlockCopy = SiteContent["copy"];
export type ClientSiteContent = Pick<
  SiteContent,
  "site" | "services" | "priceGroups" | "gallery" | "team"
> & {
  copy: Pick<
    BlockCopy,
    | "wordmark"
    | "headerTopbar"
    | "headerNavigation"
    | "headerTreatments"
    | "headerSearch"
    | "headerMobile"
    | "bookingDialog"
    | "bookingButton"
    | "bookingForm"
    | "treatmentExplorer"
    | "priceList"
    | "priceExplorer"
    | "galleryControls"
    | "teamControls"
    | "cookieBanner"
    | "cookieSettings"
    | "cookieMap"
  >;
};

export function clientSiteContent({
  copy,
  site,
  services,
  priceGroups,
  gallery,
  team,
}: SiteContent): ClientSiteContent {
  const {
    wordmark,
    headerTopbar,
    headerNavigation,
    headerTreatments,
    headerSearch,
    headerMobile,
    bookingDialog,
    bookingButton,
    bookingForm,
    treatmentExplorer,
    priceList,
    priceExplorer,
    galleryControls,
    teamControls,
    cookieBanner,
    cookieSettings,
    cookieMap,
  } = copy;
  return {
    site,
    services,
    priceGroups,
    gallery,
    team,
    copy: {
      wordmark,
      headerTopbar,
      headerNavigation,
      headerTreatments,
      headerSearch,
      headerMobile,
      bookingDialog,
      bookingButton,
      bookingForm,
      treatmentExplorer,
      priceList,
      priceExplorer,
      galleryControls,
      teamControls,
      cookieBanner,
      cookieSettings,
      cookieMap,
    },
  };
}
