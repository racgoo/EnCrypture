import { Input } from "antd";
import { LockOutlined } from "@ant-design/icons";

interface PasswordInputProps {
  password: string;
  setPassword: (password: string) => void;
}

function PasswordInput({ password, setPassword }: PasswordInputProps) {
  return (
    <Input.Password
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
