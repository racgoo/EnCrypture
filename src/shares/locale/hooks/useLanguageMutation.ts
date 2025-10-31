import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { LangType } from "../constant";

function useLanguageMutation() {
  const navigate = useNavigate();
  const changeLanguage = useCallback(
    (lang: LangType) => {
      const path = window.location.pathname;
      const splitedPath = path.split("/");
      splitedPath[1] = lang;
      const newPath = splitedPath.join("/");
      navigate(newPath, { replace: true });
    },
    [navigate]
  );
  return { changeLanguage };
}

export { useLanguageMutation };
