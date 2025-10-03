import { Button } from "antd";
import { localeTable } from "../locale";
import { useLocale } from "@shares/locale";

interface EncryptButtonProps {
  handleEncrypt: () => void;
  disabled: boolean;
}

function EncryptButton({ disabled, handleEncrypt }: EncryptButtonProps) {
  const { t } = useLocale(localeTable);
  return (
    <Button
      type="primary"
      size="large"
      block
      disabled={disabled}
      style={{ marginTop: 16, borderRadius: 8, opacity: disabled ? 0.5 : 1 }}
      onClick={handleEncrypt}
    >
      {t("start_encrypt_button_text")}
    </Button>
  );
}

export { EncryptButton };
