import { downloadHtml } from "@features/file";
import { getRedirectionHtmlTemplete } from "@shares/templete";
import { Progress, Typography } from "antd";
import { useCallback } from "react";

const { Text } = Typography;

interface EncryptionResultProps {
  message: string;
  percentage: number;
  finished: boolean;
  encryptedFiles: string[];
  encryptedFileNames: string[];
}

function EncryptionResult({
  message,
  percentage,
  finished,
  encryptedFiles,
  encryptedFileNames,
}: EncryptionResultProps) {
  const handleDownloadEncryptedHtml = useCallback(() => {
    const redirectionHtmlTemplete = getRedirectionHtmlTemplete(
      encryptedFiles,
      encryptedFileNames
    );
    downloadHtml(redirectionHtmlTemplete);
  }, [encryptedFiles]);

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
      {percentage > 0 && <Progress percent={percentage} />}
      {message && <Text>{message}</Text>}
      {finished && (
        <Text>
          <div style={{ marginTop: 12 }}>
            <button type="button" onClick={handleDownloadEncryptedHtml}>
              복호화 페이지 다운로드
            </button>
          </div>
        </Text>
      )}
    </div>
  );
}

export { EncryptionResult };
