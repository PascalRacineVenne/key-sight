import en from "./locales/en.json";
import fr from "./locales/fr.json";

export const SUPPORTED_LOCALES = ["en", "fr"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const MESSAGES: Record<Locale, typeof en> = { en, fr };

const isSupportedLocale = (value: string): value is Locale =>
  (SUPPORTED_LOCALES as readonly string[]).includes(value);

export const getInitialLocale = (): Locale => {
  const browserLanguage = navigator.language.split("-")[0];
  return isSupportedLocale(browserLanguage) ? browserLanguage : DEFAULT_LOCALE;
};
