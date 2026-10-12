import en from "./locales/en.json";
import fr from "./locales/fr.json";

export const SUPPORTED_LOCALES = ["en", "fr"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const MESSAGES: Record<Locale, typeof en> = { en, fr };

const isSupportedLocale = (value: string): value is Locale =>
  (SUPPORTED_LOCALES as readonly string[]).includes(value);

const STORAGE_KEY = "key-sight.locale";

// Storage can throw (private windows, blocked site data), so every access is
// wrapped and the app works without it
const readStoredLocale = (): string | null => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

export const saveLocale = (locale: Locale) => {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Not persisting is fine: the choice just won't survive a reload
  }
};

// Saved choice first, then the browser language ("fr-CA" -> "fr"), then the default
export const getInitialLocale = (): Locale => {
  const stored = readStoredLocale();
  if (stored && isSupportedLocale(stored)) return stored;
  const browserLanguage = navigator.language.split("-")[0];
  return isSupportedLocale(browserLanguage) ? browserLanguage : DEFAULT_LOCALE;
};
