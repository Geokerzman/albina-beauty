import blockCopy from "@/content/block-copy.json";
import { homePage, specialRoutes } from "@/content/pages";
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
import { priceGroupLabels, serviceLabels } from "./fields";

export type Value = string | Value[] | { [key: string]: Value };

export const routeTitles: Record<string, string> = {
  leistungen: "Unsere Treatments",
  "leistungen/kosmetische-behandlungen": "Kosmetische Behandlungen",
  "leistungen/wellness": "Wellness & Körperpflege",
  preisliste: "Behandlungen & Preise",
  "ueber-uns": "Unser Studio",
  "ueber-uns/team": "Unser Team",
  galerie: "Einblicke ins Studio",
  kontakt: "Kontakt & Anfahrt",
  karriere: "Karriere",
  "elementor-1142": "Karriere",
  impressum: "Impressum",
  datenschutzerklaerung: "Datenschutzerklärung",
  "cookie-richtlinie-eu": "Cookie-Richtlinie",
  shop: "Pflege für zu Hause",
  "termin-vereinbaren": "Termin vereinbaren",
  "category/uncategorized": "Beauty-Archiv",
  "author/albinaletova_ho1055am": "Aus unserem Studio",
};

const adminRouteTitles: Record<string, string> = {
  leistungen: "Все процедуры",
  "leistungen/kosmetische-behandlungen": "Косметологические процедуры",
  "leistungen/wellness": "Уход за телом и релаксация",
  preisliste: "Процедуры и цены",
  "ueber-uns": "Наша студия",
  "ueber-uns/team": "Наша команда",
  galerie: "Галерея студии",
  kontakt: "Контакты и проезд",
  karriere: "Вакансии",
  "elementor-1142": "Вакансии (старая страница)",
  impressum: "Сведения о владельце сайта",
  datenschutzerklaerung: "Политика конфиденциальности",
  "cookie-richtlinie-eu": "Политика использования cookie",
  shop: "Косметика для домашнего ухода",
  "termin-vereinbaren": "Запись на приём",
  "category/uncategorized": "Архив публикаций",
  "author/albinaletova_ho1055am": "Публикации студии",
};

const copySections = {
  "Главная страница": {
    homeHero: "Первый экран · кнопки и описание изображения",
    homeBrands: "Бренды косметики · подпись",
    homeTreatments: "Рекомендуемые процедуры · ссылка",
    studioStory: "История студии · ссылки и описания изображений",
    homePhilosophy: "Философия · ссылки",
    homeGallery: "Превью галереи · ссылка",
    homeFaq: "Вопросы и ответы · ссылка на контакты",
  },
  "Каталог процедур": {
    catalogIntro: "Вводные блоки",
    catalogResults: "Заголовок результатов",
    catalogConsultation: "Консультация",
    treatmentExplorer: "Фильтры и поиск",
  },
  "Страницы процедур · общие блоки": {
    serviceHero: "Первый экран",
    serviceStory: "Введение о процедуре",
    serviceHydraSteps: "Этапы HydraFacial",
    servicePrices: "Цены",
    serviceVisit: "Как проходит визит",
    serviceFaq: "Вопросы и ответы",
    serviceRelated: "Похожие процедуры",
  },
  "Прайс-лист": {
    pricesIntro: "Введение",
    pricesResults: "Заголовок прайс-листа",
    priceList: "Таблица цен",
    priceExplorer: "Поиск и фильтры цен",
  },
  "Студия и команда": {
    aboutIntro: "Введение о студии и команде",
    aboutImage: "Фото студии",
    aboutFounder: "Основательница",
    aboutValues: "Наши ценности",
    aboutTeam: "Знакомство с командой",
    teamControls: "Карточки сотрудников",
  },
  Галерея: { galleryIntro: "Введение", galleryControls: "Галерея и просмотр фото" },
  Контакты: { contactIntro: "Введение", contactDetails: "Контактные данные и схема проезда" },
  Вакансии: {
    careersIntro: "Введение",
    careersOverview: "Обзор",
    careersJobs: "Вакансии и отклик",
    careersContact: "Контакты для отклика",
  },
  Магазин: { shopIntro: "Консультация по косметике" },
  "Запись на приём": {
    bookingPage: "Страница записи",
    bookingDialog: "Окно записи",
    bookingButton: "Основная кнопка",
    bookingForm: "Форма записи",
  },
  "Правовая информация": { legalLayout: "Введение и навигация" },
  "Архив и страница ошибки": {
    archiveIntro: "Введение архива",
    archiveLink: "Ссылка на прайс-лист",
    notFound: "Страница ошибки 404",
  },
  "Общие настройки сайта": {
    siteChrome: "Ссылка к содержимому и изображение для соцсетей",
    breadcrumbs: "Хлебные крошки",
    wordmark: "Логотип",
    headerTopbar: "Панель контактов",
    headerNavigation: "Главное меню",
    headerTreatments: "Меню процедур",
    headerSearch: "Поиск по сайту",
    headerMobile: "Мобильное меню",
    footer: "Подвал сайта",
    closingInvitation: "Приглашение в конце страницы",
    cookieBanner: "Окно согласия на cookie",
    cookieSettings: "Настройки cookie",
    cookieMap: "Согласие на загрузку карты",
  },
} satisfies Record<string, Partial<Record<keyof typeof blockCopy, string>>>;

export interface Section {
  key: string;
  group: string;
  title: string;
  initial: Value;
}

const copy = blockCopy as Record<string, Value>;

const homeBlockTitles = {
  hero: "Главное фото и введение",
  brands: "Бренды косметики · список",
  featuredTreatments: "Рекомендуемые процедуры · подборка",
  studioStory: "История студии · текст и фото",
  philosophy: "Философия · введение",
  gallery: "Превью галереи · заголовок",
  faq: "Вопросы и ответы · список",
  invitation: "Приглашение в конце страницы",
};

export const sections: Section[] = [
  ...homePage.layout.flatMap(({ id, blockType, ...fields }) =>
    Object.keys(fields).length
      ? [
          {
            key: `home/${id}`,
            group: "Главная страница",
            title: homeBlockTitles[blockType],
            initial: fields,
          },
        ]
      : [],
  ),
  ...Object.entries(copySections).flatMap(([group, blocks]) =>
    Object.entries(blocks).flatMap(([key, title]) =>
      copy[key] ? [{ key: `copy/${key}`, group, title, initial: copy[key] }] : [],
    ),
  ),
  ...services.map(({ slug, ...fields }) => ({
    key: `services/${slug}`,
    group: "Отдельные процедуры",
    title: serviceLabels[slug] ?? fields.title,
    initial: { ...fields, label: fields.label ?? "", tag: fields.tag ?? "" },
  })),
  ...priceGroups.map(({ id, ...fields }) => ({
    key: `prices/${id}`,
    group: "Прайс-лист · группы цен",
    title: priceGroupLabels[id] ?? fields.title,
    initial: fields,
  })),
  ...Object.entries(legal).map(([slug, fields]) => ({
    key: `legal/${slug}`,
    group: "Правовая информация",
    title: adminRouteTitles[slug] ?? fields.title,
    initial: fields,
  })),
  ...specialRoutes
    .filter((path) => !(path in legal))
    .map((path) => ({
      key: `seo/${path}`,
      group: "Заголовки страниц и SEO",
      title: adminRouteTitles[path] ?? routeTitles[path],
      initial: { title: routeTitles[path], description: homePage.description },
    })),
  {
    key: "seo/home",
    group: "Заголовки страниц и SEO",
    title: "Главная страница",
    initial: { title: homePage.title, description: homePage.description },
  },
  {
    key: "site",
    group: "Общие настройки сайта",
    title: "Студия, контакты и соцсети",
    initial: site,
  },
  {
    key: "categories",
    group: "Каталог процедур",
    title: "Описания категорий",
    initial: categoryDescriptions,
  },
  { key: "gallery", group: "Галерея", title: "Фото галереи", initial: gallery },
  { key: "team", group: "Студия и команда", title: "Сотрудники", initial: team },
  { key: "jobs", group: "Вакансии", title: "Открытые вакансии", initial: jobs },
];

export const sectionByKey = new Map(sections.map((section) => [section.key, section]));

export const fieldOptions = {
  categories: Object.keys(categoryDescriptions),
  serviceSlugs: services.map(({ slug }) => slug),
  priceIds: priceGroups.map(({ id }) => id),
};
