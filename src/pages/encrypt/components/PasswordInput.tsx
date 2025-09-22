import { Input } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { Fragment } from "react/jsx-runtime";

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
  return (
    <Fragment>
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
    </Fragment>
  );
}

export { PasswordInput };
