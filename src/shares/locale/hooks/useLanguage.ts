import { useParams } from "react-router-dom";
import { langs, type LangType } from "../constant";

function useLanguage() {
  const { lang = langs[0] } = useParams<{ lang: LangType }>();
  const validation = langs.includes(lang);
  if (!validation) {
    return { lang: langs[0] };
  }
  return { lang };
}

export { useLanguage };
