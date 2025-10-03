import { useMemo, useState } from "react";
import { localeTable } from "../locale";
import { useLocale } from "@shares/locale";

function validatePassword(password: string) {
  // 최소 6자리, 숫자 1개, 알파벳 1개, 특수문자 1개 이상
  const lengthCheck = password.length >= 6;
  const numberCheck = /[0-9]/.test(password);
  const letterCheck = /[a-zA-Z]/.test(password);
  const specialCheck = /[^a-zA-Z0-9]/.test(password);
  return lengthCheck && numberCheck && letterCheck && specialCheck;
}

function usePassword() {
  const { t } = useLocale(localeTable);
  const [password, setPassword] = useState("");

  const error = useMemo(() => {
    if (password.length === 0) {
      return null;
    }
    if (!validatePassword(password)) {
      return t("invalid_password_message");
    }
    return null;
  }, [password, t]);

  const valid = useMemo(() => {
    return error === null && password.length > 0;
  }, [error, password]);

  return { password, setPassword, error, valid };
}

export { usePassword };
