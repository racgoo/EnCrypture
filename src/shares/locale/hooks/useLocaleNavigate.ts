import { useNavigate, useParams, type NavigateOptions } from "react-router-dom";
import type { LangType } from "../constant";
import { useCallback } from "react";

function useLocaleNavigate() {
  const { lang } = useParams<{ lang: LangType }>();
  const nativeNavigate = useNavigate();
  const navigate = useCallback(
    (path: string, options: NavigateOptions = {}) => {
      nativeNavigate(`/${lang}${path}`, { ...options });
    },
    [nativeNavigate, lang]
  );
  return navigate;
}

export { useLocaleNavigate };
