import { Card, Space, Typography } from "antd";
import { useCallback, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import { EncryptButton } from "./components/EncryptButton";
import { EncryptionResult } from "./components/EncryptionResult";
import { EncryptLayout } from "./components/EncryptLayout";
import { FileUploadDragger } from "./components/FileUploadDragger";
import { PasswordInput } from "./components/PasswordInput";
import { TypeDescription } from "./components/TypeDescription";
import { TypeSelect } from "./components/TypeSelect";
import { MAX_FILE_SIZE_STRING } from "./constants";
import { useEncrypt } from "./hooks/useEncrypt";
import { useFile } from "./hooks/useFile";
import { usePassword } from "./hooks/usePassword";
import { localeTable } from "./locale";
import { useLocale } from "@shares/locale";

const { Title, Text } = Typography;

function EncryptPage() {
  const { t } = useLocale(localeTable);
  const { files, handleAddFile, handleDeleteFile } = useFile();
  const { password, setPassword, error, valid } = usePassword();
  const { encrypt, percentage, message } = useEncrypt({
    files,
    password,
  });
  const [encryptLoading, setEncryptLoading] = useState(false);
  const [encryptFinished, setEncryptFinished] = useState(false);
  const [encryptedFiles, setEncryptedFiles] = useState<string[]>([]);
  const [encryptedFileNames, setEncryptedFileNames] = useState<string[]>([]);

  const handleEncrypt = useCallback(async () => {
    flushSync(() => {
      setEncryptLoading(true);
      setEncryptFinished(false);
    });
    const fileNames = files.map((file) => file.name);
    const encryptedFiles = await encrypt();
    flushSync(() => {
      setEncryptedFiles(encryptedFiles);
      setEncryptedFileNames(fileNames);
      setEncryptLoading(false);
      setEncryptFinished(true);
    });
  }, [encrypt, files]);

  const buttonDisabled = useMemo(
    () => files.length === 0 || valid === false || encryptLoading,
    [files, valid, encryptLoading]
  );

  return (
    <EncryptLayout>
      <Card style={{ width: 600 }}>
        <Space
          direction="vertical"
          size="middle"
          style={{ width: "100%", maxWidth: 600 }}
        >
          <Title level={2} style={{ textAlign: "center", marginBottom: 0 }}>
            {t("title")}
          </Title>
          <Text
            type="secondary"
            style={{ textAlign: "center", display: "block" }}
          >
            {t("description_1")}
            <br />
            {MAX_FILE_SIZE_STRING} {t("description_2")}
          </Text>

          <TypeSelect />

          <TypeDescription />

          <FileUploadDragger
            disabled={encryptLoading}
            files={files}
            handleAddFile={handleAddFile}
            handleDeleteFile={handleDeleteFile}
          />

          <PasswordInput
            disabled={encryptLoading}
            password={password}
            setPassword={setPassword}
            error={error}
            placeholder={t("password_placeholder")}
          />

          <EncryptionResult
            message={message}
            percentage={percentage}
            finished={encryptFinished}
            encryptedFileNames={encryptedFileNames}
            encryptedFiles={encryptedFiles}
          />

          <EncryptButton
            disabled={buttonDisabled}
            handleEncrypt={handleEncrypt}
          />
        </Space>
      </Card>
    </EncryptLayout>
  );
}

export { EncryptPage };
