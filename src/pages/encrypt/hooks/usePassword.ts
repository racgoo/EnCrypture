import { useReactiveRef, useReactiveState } from "@racgoo/reactive-kit/react";
import { useLocale } from "@shares/locale";
import { useCallback, useMemo } from "react";
import { localeTable } from "../locale";

function validatePassword(password: string) {
  // password length check
  const lengthCheck = password.length >= 6;
  // password number check
  const numberCheck = /[0-9]/.test(password);
  // password letter check
  const letterCheck = /[a-zA-Z]/.test(password);
  // password special character check
  const specialCheck = /[^a-zA-Z0-9]/.test(password);
  return lengthCheck && numberCheck && letterCheck && specialCheck;
}

function usePassword() {
  const { t } = useLocale(localeTable);
  const passwordRef = useReactiveRef<string>("");
  const passwordState = useReactiveState(passwordRef);
  const error = useMemo(() => {
    if (passwordState.length === 0) {
      return null;
    }
    if (!validatePassword(passwordState)) {
      return t("invalid_password_message");
    }
    return null;
  }, [passwordState, t]);

  const changePassword = useCallback((password: string) => {
    passwordRef.current = password;
  }, []);

  const clearPassword = useCallback(() => {
    passwordRef.current = "";
  }, []);

  const valid = useMemo(() => {
    return error === null && passwordState.length > 0;
  }, [error, passwordState]);

  return {
    passwordRef,
    changePassword,
    clearPassword,
    error,
    valid,
  };
}

export { usePassword };
