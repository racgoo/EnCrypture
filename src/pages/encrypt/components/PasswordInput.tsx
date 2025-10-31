import { LockOutlined } from "@ant-design/icons";
import { useLocale } from "@shares/locale";
import { Input } from "antd";
import { localeTable } from "../locale";
import { Typography } from "antd";

const { Text } = Typography;

interface PasswordInputProps {
  password: string;
  setPassword: (password: string) => void;
  error: string | null;
  placeholder: string;
  disabled: boolean;
}

function PasswordInput({
  password,
  setPassword,
  error,
  placeholder,
  disabled,
}: PasswordInputProps) {
  const { t } = useLocale(localeTable);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start",
      }}
    >
      <Text type="secondary" style={{ textAlign: "start", display: "block" }}>
        {t("password_description")}
      </Text>
      <Input.Password
        disabled={disabled}
        size="large"
        placeholder={placeholder}
        prefix={<LockOutlined />}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ background: "#222", color: "#fff" }}
      />
      {error && (
        <div style={{ color: "#ff4d4f", marginTop: 8, fontSize: 13 }}>
          {error}
        </div>
      )}
    </div>
  );
}

export { PasswordInput };
