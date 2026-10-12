import { Segmented } from "antd";
import { useIntl } from "react-intl";
import { SUPPORTED_LOCALES } from "../i18n";
import type { Locale } from "../i18n";
import { useLocale } from "../LocaleProvider";
import { styles } from "./LanguageSwitcher.styles";

const LOCALE_OPTIONS = SUPPORTED_LOCALES.map((locale) => ({
  value: locale,
  label: locale.toUpperCase(),
}));

const LanguageSwitcher = () => {
  const intl = useIntl();
  const { locale, setLocale } = useLocale();

  return (
    <Segmented<Locale>
      size="small"
      options={LOCALE_OPTIONS}
      value={locale}
      onChange={setLocale}
      aria-label={intl.formatMessage({ id: "language.switcherLabel" })}
      className={styles.switcher}
    />
  );
};

export default LanguageSwitcher;
