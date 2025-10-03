export const langs = ["en", "ko"] as const;
export type LangType = (typeof langs)[number];
