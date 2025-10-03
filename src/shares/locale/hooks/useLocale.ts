import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { type LangType } from "../constant";

type LocaleTable = Record<string, Record<LangType, string>>;

function useLocale<T extends LocaleTable>(table: T) {
  const { lang } = useParams<{ lang: LangType }>();

  const t = useCallback(
    <K extends keyof T>(key: K): T[K][LangType] => {
      console.log(lang);
      if (!lang) {
        return "";
      }
      return table[key][lang];
    },
    [lang, table]
  );

  return { t };
}

export { useLocale };
