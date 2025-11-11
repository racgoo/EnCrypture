import { downloadHtml } from "@features/file";
import { getRedirectionHtmlTemplete } from "@shares/templete";
import { Progress } from "antd";
import { useCallback } from "react";
import { localeTable } from "../locale";
import { useLocale } from "@shares/locale";
import { useLanguage } from "@shares/locale/hooks/useLanguage";
import type { EncryptionConfigType, EncryptionResultType } from "..";
import { useReactiveState, type ReactiveRef } from "@racgoo/reactive-kit/react";
import type { EncryptionStatusType } from "../hooks/useEncrypt";

interface EncryptionResultProps {
  encryptionConfigRef: ReactiveRef<EncryptionConfigType>;
  encryptionStatusRef: ReactiveRef<EncryptionStatusType>;
  encryptionResultRef: ReactiveRef<EncryptionResultType>;
}

function EncryptionResult({
  encryptionConfigRef,
  encryptionStatusRef,
  encryptionResultRef,
}: EncryptionResultProps) {
  const { t } = useLocale(localeTable);
  const encryptionResultState = useReactiveState(encryptionResultRef);
  const encryptionStatusState = useReactiveState(encryptionStatusRef);
  const encryptionConfigState = useReactiveState(encryptionConfigRef);

  const { lang } = useLanguage();

  const handleDownloadEncryptedHtml = useCallback(() => {
    const redirectionHtmlTemplete = getRedirectionHtmlTemplete(
      encryptionResultState.files,
      encryptionResultState.fileNames,
      lang,
      encryptionResultState.id,
      encryptionResultState.type
    );
    downloadHtml(redirectionHtmlTemplete);
  }, [encryptionResultState, lang]);

  if (!encryptionStatusState.done) {
    return null;
  }

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
      {encryptionStatusState.percentage > 0 && (
        <Progress
          percent={encryptionStatusState.percentage}
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
          marginBottom: encryptionConfigState.finished ? 18 : 0,
          textAlign: "center",
          letterSpacing: "-0.5px",
          color: "#e0e0e0",
        }}
      >
        {encryptionStatusState.message}
      </div>
      {encryptionConfigState.finished && (
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
          🔒 {t("download_decrypt_page_button_text")}
        </button>
      )}
    </div>
  );
}

export { EncryptionResult };
