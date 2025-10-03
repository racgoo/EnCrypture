import { Helmet } from "react-helmet-async";

import { localeTable } from "./locale";
import { useLocale } from "./hooks/useLocale";
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const { t, lang } = useLocale(localeTable);
  return (
    <>
      <Helmet htmlAttributes={{ lang }}>
        <title>{t("title")}</title>
        <meta name="description" content={t("description")} />
        <meta property="og:title" content={t("title")} />
        <meta property="og:description" content={t("description")} />
      </Helmet>
      {children}
    </>
  );
}
