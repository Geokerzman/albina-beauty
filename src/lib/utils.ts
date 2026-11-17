import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function euro(input: string) {
  const raw = input.replace(/€/g, "").trim();
  if (/^\d+(,\d+)?$/.test(raw))
    return `${new Intl.NumberFormat("de-DE", { minimumFractionDigits: raw.includes(",") ? 2 : 0 }).format(Number(raw.replace(",", ".")))} €`;
  return `${raw.replace(/\s*-\s*/g, "–")} €`;
}
