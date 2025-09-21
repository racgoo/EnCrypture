import { Button } from "antd";
import { useCallback, useState } from "react";

interface DecryptButtonProps {
  handleDecrypt: () => void;
}

function DecryptButton({ handleDecrypt }: DecryptButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = useCallback(() => {
    setLoading(true);
    handleDecrypt();
    setLoading(false);
  }, [handleDecrypt]);

  return (
    <Button
      type="primary"
      size="large"
      block
      loading={loading}
      onClick={handleClick}
      disabled={loading}
      style={{ marginTop: 8 }}
    >
      복호화하기
    </Button>
  );
}

export { DecryptButton };
