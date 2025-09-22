import { Input } from "antd";
import { LockOutlined } from "@ant-design/icons";

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
  return (
    <Input.Password
      disabled={disabled}
      size="large"
      placeholder="암호를 입력하세요"
      prefix={<LockOutlined />}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      style={{ background: "#222", color: "#fff" }}
    />
  );
}

export { PasswordInput };
