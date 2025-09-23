import { downloadHtml } from "@features/file";
import { getRedirectionHtmlTemplete } from "@shares/templete";
import { Progress } from "antd";
import { useCallback } from "react";

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
  }, [encryptedFiles, encryptedFileNames]);

  if (!message) return null;

  return (
    <div
      style={{
        width: "100%",
        padding: 28,
        borderRadius: 16,
        background: "linear-gradient(135deg, #274472 0%, #1b263b 100%)",
        boxShadow: "0 4px 24px 0 #0004",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Pretendard', 'Noto Sans KR', Arial, sans-serif",
        margin: "0 auto",
        marginTop: 24,
      }}
    >
      {percentage > 0 && (
        <Progress
          percent={percentage}
          showInfo={true}
          strokeColor={{
            "0%": "#a0c4ff",
            "100%": "#4361ee",
          }}
          style={{ width: "100%", marginBottom: 18 }}
        />
      )}
      <div
        style={{
          fontSize: "1.08rem",
          fontWeight: 500,
          marginBottom: finished ? 18 : 0,
          textAlign: "center",
          letterSpacing: "-0.5px",
          color: "#e0e0e0",
        }}
      >
        {message}
      </div>
      {finished && (
        <button
          type="button"
          onClick={handleDownloadEncryptedHtml}
          style={{
            marginTop: 8,
            padding: "0.85em 2.2em",
            borderRadius: 8,
            border: "2px solid #4361ee",
            background: "linear-gradient(90deg, #4361ee 0%, #48bfe3 100%)",
            color: "#fff",
            fontWeight: 700,
            fontSize: "1.08rem",
            boxShadow: "0 2px 8px 0 #0002",
            cursor: "pointer",
            transition: "background 0.2s, box-shadow 0.2s",
          }}
        >
          🔒 복호화 페이지 다운로드
        </button>
      )}
    </div>
  );
}

export { EncryptionResult };
