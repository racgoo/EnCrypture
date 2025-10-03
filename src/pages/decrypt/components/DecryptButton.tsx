import { useLocale } from "@shares/locale";
import { Button } from "antd";
import { useCallback } from "react";
import { localeTable } from "../locale";

interface DecryptButtonProps {
  disabled: boolean;
  handleDecrypt: () => void;
}

function DecryptButton({ handleDecrypt, disabled }: DecryptButtonProps) {
  const { t } = useLocale(localeTable);
  const handleClick = useCallback(() => {
    handleDecrypt();
  }, [handleDecrypt]);

  return (
    <Button
      type="primary"
      size="large"
      disabled={disabled}
      block
      onClick={handleClick}
      style={{ marginTop: 8 }}
    >
      {t("decrypt_button_text")}
    </Button>
  );
}

export { DecryptButton };
