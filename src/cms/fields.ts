import type { Value } from "./manifest";

export const categoryLabels: Record<string, string> = {
  Gesicht: "Уход за лицом",
  "Körper & Entspannung": "Уход за телом и релаксация",
  "Beauty Essentials": "Маникюр, педикюр, брови и ресницы",
  Physiotherapie: "Физиотерапия",
};

export const serviceLabels: Record<string, string> = {
  "kosmetische-behandlungen/hydrafacial": "HydraFacial™",
  "forma-new-by-inmode": "FORMA by InMode",
  microneedling: "Микронидлинг",
  "noon-skin": "Уход NOON Skin",
  exosome: "Уход с экзосомами",
  "is-clinical-behandlung": "Уход iS Clinical",
  "klassische-gesichtsbehandlung": "Классический уход за лицом",
  "laser-haarentfernung": "Лазерная эпиляция",
  "hand-und-fusspflege": "Уход за руками и ногами",
  "augenbrauen-wimpern": "Брови и ресницы",
  "body-fx-by-inmode": "BodyFX by InMode",
  massage: "Массаж и релаксация",
  "private-physiotherapie": "Частная физиотерапия",
};

export const priceGroupLabels: Record<string, string> = {
  "laser-haarentfernung": "Лазерная эпиляция · пакеты",
  "laser-einzelzonen": "Лазерная эпиляция · отдельные зоны",
  "forma-by-inmode": "FORMA by InMode",
  "body-fx": "BodyFX by InMode",
  hydrafacial: "HydraFacial",
  "medizinische-microneedling": "Медицинский микронидлинг",
  noon: "Уход NOON Skin",
  exosome: "Уход с экзосомами",
  "manik-re": "Маникюр",
  "klassische-gesichtspflege": "Классический уход за лицом",
  "pedik-re": "Педикюр",
  "is-clinical-kosmetikbehandlungen": "Уход iS Clinical",
  augenbrauen: "Брови",
  wimpern: "Ресницы",
  "wimpernverl-ngerung": "Наращивание ресниц",
  wellness: "Массаж и релаксация",
  "private-physiotherapie": "Частная физиотерапия",
};

const labels: Record<string, string> = {
  address: "Адрес",
  alt: "Описание изображения",
  answer: "Ответ",
  ariaLabel: "Подпись для скринридера",
  benefits: "Преимущества",
  bio: "Краткая биография",
  body: "Содержимое",
  brands: "Бренды",
  buttonText: "Текст кнопки",
  category: "Категория",
  city: "Город",
  current: "Заголовок в навигации",
  description: "Описание",
  detail: "Подробная биография",
  details: "Подробности",
  duration: "Длительность",
  email: "Электронная почта",
  emphasis: "Выделенный текст",
  eyebrow: "Надзаголовок",
  facebook: "Ссылка на Facebook",
  headerMap: "Ссылка на карту в шапке сайта",
  heading: "Заголовок блока",
  href: "Адрес ссылки",
  image: "Изображение",
  imageAlt: "Описание изображения",
  instagram: "Ссылка на Instagram",
  intro: "Введение",
  items: "Записи",
  label: "Короткая подпись",
  link: "Адрес ссылки",
  links: "Ссылки",
  linkText: "Текст ссылки",
  map: "Ссылка на карту",
  mapEmbed: "Адрес встроенной карты",
  messageConsultation: "Сообщение для записи на консультацию",
  messageDate: "Подпись даты в сообщении",
  messageIntro: "Начало сообщения",
  messageName: "Подпись имени в сообщении",
  messageService: "Подпись процедуры в сообщении",
  mobile: "Мобильный телефон",
  mobileHref: "Ссылка для звонка на мобильный",
  name: "Имя или название",
  option: "Вариант выбора",
  pages: "Страницы",
  phone: "Телефон",
  phoneHref: "Ссылка для звонка",
  placeholder: "Подсказка в поле",
  postal: "Почтовый индекс и город",
  price: "Цена",
  priceIds: "Группы цен",
  profile: "Требования к кандидату",
  question: "Вопрос",
  questions: "Вопросы",
  results: "Результаты",
  role: "Должность",
  secondaryImage: "Второе изображение",
  service: "Процедура",
  serviceSlugs: "Рекомендуемые процедуры",
  shareImage: "Изображение для соцсетей",
  shareImageAlt: "Описание изображения",
  skipLink: "Ссылка для перехода к содержимому",
  src: "Изображение",
  steps: "Этапы",
  subheading: "Подзаголовок",
  tag: "Метка на изображении",
  tasks: "Обязанности",
  text: "Текст",
  title: "Заголовок",
  treatment: "Процедура для этой позиции прайс-листа",
  type: "Тип занятости",
  values: "Ценности",
  whatsapp: "Ссылка для связи в WhatsApp",
  whatsappSocial: "Ссылка на WhatsApp для соцсетей",
};

export function fieldLabel(key: string) {
  const base = key.replace(/\d+$/, "");
  const label = labels[base] ?? categoryLabels[base];
  const number = key.slice(base.length);
  return label ? (number ? `${label} ${number}` : label) : key;
}

export function isImageField(key: string) {
  return ["src", "image", "secondaryImage", "shareImage"].includes(key);
}

export type FieldOptions = {
  categories: string[];
  serviceSlugs: string[];
  priceIds: string[];
};

export function fieldChoices(key: string, options: FieldOptions) {
  if (key === "category") return options.categories;
  if (key === "serviceSlugs") return options.serviceSlugs;
  if (key === "priceIds") return options.priceIds;
  if (key === "treatment") return ["klassische-gesichtsbehandlung", "is-clinical-behandlung"];
}

export function choiceLabel(key: string, value: string) {
  if (key === "category") return categoryLabels[value] ?? value;
  if (key === "priceIds") return priceGroupLabels[value] ?? value;
  return serviceLabels[value] ?? value;
}

const mediaName = /^[a-zA-Z0-9_-]+\.(?:avif|gif|jpe?g|png|webp)$/i;
export function isMediaName(filename: string) {
  return mediaName.test(filename);
}

function validURL(value: string) {
  return (
    /^(?:\/(?![\\/])|#|https:\/\/|mailto:|tel:)/i.test(value) && !/[\\\u0000-\u0020]/.test(value)
  );
}

function isLinkField(key: string) {
  return /^(?:link\d*|href|.*Href|instagram|facebook|whatsapp(?:Social)?|map(?:Embed)?|headerMap)$/.test(
    key,
  );
}

export function validateValue(
  value: unknown,
  initial: Value,
  options: FieldOptions,
  key = "",
  parent = "",
): value is Value {
  if (typeof initial === "string") {
    if (typeof value !== "string" || value.length > (key === "body" ? 200_000 : 50_000))
      return false;
    const choices = parent === "pages" ? undefined : fieldChoices(key, options);
    if (choices) return choices.includes(value);
    if (isImageField(key)) {
      return value.startsWith("/media/")
        ? isMediaName(value.slice(7))
        : /^(?:\/images\/)?[^/\\]+\.(?:avif|gif|jpe?g|png|svg|webp)$/i.test(value) &&
            !/[#?\u0000-\u001f]/.test(value);
    }
    if (key === "mapEmbed") return /^https:\/\//i.test(value) && validURL(value);
    if (isLinkField(key)) return validURL(value);
    if (key === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    return true;
  }
  if (Array.isArray(initial)) {
    return (
      Array.isArray(value) &&
      value.length <= 250 &&
      (initial[0] !== undefined || !value.length) &&
      value.every((item, index) =>
        validateValue(item, initial[index] ?? initial[0], options, key, parent),
      )
    );
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const fields = value as Record<string, unknown>;
  return (
    Object.keys(fields).length === Object.keys(initial).length &&
    Object.entries(initial).every(
      ([k, child]) => Object.hasOwn(fields, k) && validateValue(fields[k], child, options, k, key),
    )
  );
}
