import { Button } from "antd";
import { useCallback } from "react";

interface DecryptButtonProps {
  disabled: boolean;
  handleDecrypt: () => void;
}

function DecryptButton({ handleDecrypt, disabled }: DecryptButtonProps) {
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
      복호화하기
    </Button>
  );
}

export { DecryptButton };
