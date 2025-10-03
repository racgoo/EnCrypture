import type { LocaleTable } from "./constant";

export const localeTable: LocaleTable = {
  title: {
    ko: "EnCrypture",
    en: "EnCrypture",
  },
  description: {
    ko: "파일을 안전하게 암호화하고 복호화할 수 있는 웹 서비스입니다.",
    en: "A web service that allows you to safely encrypt and decrypt files.",
  },
} as const;
