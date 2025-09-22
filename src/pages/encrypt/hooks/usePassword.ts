import { useMemo, useState } from "react";

function validatePassword(password: string) {
  // 최소 6자리, 숫자 1개, 알파벳 1개, 특수문자 1개 이상
  const lengthCheck = password.length >= 6;
  const numberCheck = /[0-9]/.test(password);
  const letterCheck = /[a-zA-Z]/.test(password);
  const specialCheck = /[^a-zA-Z0-9]/.test(password);
  return lengthCheck && numberCheck && letterCheck && specialCheck;
}

function usePassword() {
  const [password, setPassword] = useState("");

  const error = useMemo(() => {
    if (password.length === 0) {
      return null;
    }
    if (!validatePassword(password)) {
      return "비밀번호는 최소 6자리, 숫자/알파벳/특수문자를 각각 1개 이상 포함해야 합니다.";
    }
    return null;
  }, [password]);

  const valid = useMemo(() => {
    return error === null && password.length > 0;
  }, [error, password]);

  return { password, setPassword, error, valid };
}

export { usePassword };
