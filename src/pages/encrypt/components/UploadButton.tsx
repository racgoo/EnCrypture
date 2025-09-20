import { Button } from "antd";

interface UploadButtonProps {
  handleUpload: () => void;
  disabled: boolean;
}

function UploadButton({ disabled, handleUpload }: UploadButtonProps) {
  return (
    <Button
      type="primary"
      size="large"
      block
      disabled={disabled}
      style={{ marginTop: 16, borderRadius: 8 }}
      onClick={handleUpload}
    >
      암호화 시작
    </Button>
  );
}

export { UploadButton };
