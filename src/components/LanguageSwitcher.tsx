import { Segmented } from "antd";
import { useIntl } from "react-intl";
import { SUPPORTED_LOCALES } from "../i18n";
import type { Locale } from "../i18n";
import { useLocale } from "../LocaleProvider";

const LOCALE_OPTIONS = SUPPORTED_LOCALES.map((locale) => ({
  value: locale,
  label: locale.toUpperCase(),
}));

interface Props {
  className?: string;
}

const LanguageSwitcher = ({ className }: Props) => {
  const intl = useIntl();
  const { locale, setLocale } = useLocale();

  return (
    <Segmented<Locale>
      size="small"
      options={LOCALE_OPTIONS}
      value={locale}
      onChange={setLocale}
      aria-label={intl.formatMessage({ id: "language.switcherLabel" })}
      className={className}
    />
  );
};

export default LanguageSwitcher;
