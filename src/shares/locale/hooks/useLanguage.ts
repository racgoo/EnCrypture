import { useParams } from "react-router-dom";
import type { LangType } from "../constant";

function useLanguage() {
  const { lang } = useParams<{ lang: LangType }>();
  return { lang };
}

export { useLanguage };
