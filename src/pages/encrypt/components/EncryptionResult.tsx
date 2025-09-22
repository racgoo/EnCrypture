import { Progress, Typography } from "antd";
const { Text } = Typography;

interface EncryptionResultProps {
  message: string;
  percentage: number;
}

function EncryptionResult({ message, percentage }: EncryptionResultProps) {
  return (
    <div
      style={{
        width: "100%",
        padding: 16,
        borderRadius: 8,
        background: "#222",
        display: message ? "block" : "none",
      }}
    >
      <Text>결과</Text>
      {percentage > 0 && <Progress percent={percentage} />}
      {message && <Text>{message}</Text>}
    </div>
  );
}

export { EncryptionResult };
