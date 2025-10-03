import { langs, type LangType } from "../constant";

const preferredLang = navigator.language.split("-")[0] as LangType;

function getDefaultLocalePath() {
  const langValidation = langs.includes(preferredLang);
  const targetLang = langValidation ? preferredLang : langs[0];
  return targetLang;
}

export { getDefaultLocalePath };
