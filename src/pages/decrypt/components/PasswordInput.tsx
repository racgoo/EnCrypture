import { Input } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useLocale } from "@shares/locale";
import { localeTable } from "../locale";

interface PasswordInputProps {
  password: string;
  setPassword: (password: string) => void;
  disabled: boolean;
}

function PasswordInput({
  password,
  setPassword,
  disabled,
}: PasswordInputProps) {
  const { t } = useLocale(localeTable);
  return (
    <Input.Password
      disabled={disabled}
      size="large"
      placeholder={t("password_placeholder")}
      prefix={<LockOutlined />}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      style={{ background: "#222", color: "#fff" }}
    />
  );
}

export { PasswordInput };
