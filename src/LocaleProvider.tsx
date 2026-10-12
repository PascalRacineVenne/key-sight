import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { IntlProvider } from "react-intl";
import { getInitialLocale, MESSAGES } from "./i18n";
import type { Locale } from "./i18n";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside LocaleProvider");
  return context;
};

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <IntlProvider locale={locale} messages={MESSAGES[locale]}>
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};
