import { Helmet } from "react-helmet-async";

import { localeTable } from "./locale";
import { useLocale } from "./hooks/useLocale";
import { useLanguage } from "./hooks/useLanguage";

export function LocaleHelmet() {
  const { t } = useLocale(localeTable);
  const { lang } = useLanguage();

  return (
    <>
      <Helmet htmlAttributes={{ lang }}>
        <title>{t("title")}</title>
        <meta name="description" content={t("description")} />
        <meta property="og:title" content={t("title")} />
        <meta property="og:description" content={t("description")} />
      </Helmet>
    </>
  );
}
