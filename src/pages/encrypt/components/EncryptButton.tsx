import { Button } from "antd";

interface EncryptButtonProps {
  handleEncrypt: () => void;
  disabled: boolean;
}

function EncryptButton({ disabled, handleEncrypt }: EncryptButtonProps) {
  return (
    <Button
      type="primary"
      size="large"
      block
      disabled={disabled}
      style={{ marginTop: 16, borderRadius: 8, opacity: disabled ? 0.5 : 1 }}
      onClick={handleEncrypt}
    >
      암호화 시작
    </Button>
  );
}

export { EncryptButton };
