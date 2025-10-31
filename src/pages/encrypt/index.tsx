import { Card, Space, Typography } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import { EncryptButton } from "./components/EncryptButton";
import { EncryptionResult } from "./components/EncryptionResult";
import { EncryptLayout } from "./components/EncryptLayout";
import { FileUploadDragger } from "./components/FileUploadDragger";
import { PasswordInput } from "./components/PasswordInput";
import { TypeDescription } from "./components/TypeDescription";
import { TypeSelect } from "./components/TypeSelect";
import { CLIENT_ENCRYPT_TYPE, MAX_FILE_SIZE_STRING } from "./constants";
import { useEncrypt } from "./hooks/useEncrypt";
import { useFile } from "./hooks/useFile";
import { usePassword } from "./hooks/usePassword";
import { localeTable } from "./locale";
import { useLocale } from "@shares/locale";
import { useType } from "./hooks/useType";
import { motion } from "motion/react";

import type { EncryptionType } from "../../features/encrypt/type";
import { RetryCountInput } from "./components/RetryCountInput";
import { EncryptionCaution } from "./components/EncryptionCaution";

const { Title, Text } = Typography;

const DEFAULT_RETRY_COUNT = 5;

function EncryptPage() {
  const { t } = useLocale(localeTable);
  const { type } = useType();
  const { files, handleAddFile, handleDeleteFile } = useFile();
  const { password, setPassword, error, valid } = usePassword();
  const { clientEncrypt, serverEncrypt, percentage, message } = useEncrypt({
    files,
    password,
  });

  const [encryptLoading, setEncryptLoading] = useState(false);
  const [encryptFinished, setEncryptFinished] = useState(false);
  const [encryptedFiles, setEncryptedFiles] = useState<string[]>([]);
  const [encryptedFileNames, setEncryptedFileNames] = useState<string[]>([]);
  const [retryCount, setRetryCount] = useState(DEFAULT_RETRY_COUNT);

  const [encryptionId, setEncryptionId] = useState<number | null>(null);
  const [encryptionType, setEncryptionType] = useState<EncryptionType>(type);

  const initializeInput = useCallback(async () => {
    setPassword("");
    setEncryptLoading(false);
    setEncryptFinished(false);
    setEncryptedFiles([]);
    setEncryptedFileNames([]);
    setRetryCount(DEFAULT_RETRY_COUNT);
  }, []);

  const handleClientEncrypt = useCallback(async () => {
    flushSync(() => {
      setEncryptLoading(true);
      setEncryptFinished(false);
    });
    const fileNames = files.map((file) => file.name);
    const { type, encryptionId, encryptedFiles } = await clientEncrypt();
    flushSync(() => {
      setEncryptionType(type);
      setEncryptionId(encryptionId);
      setEncryptedFiles(encryptedFiles);
      setEncryptedFileNames(fileNames);
      setEncryptLoading(false);
      setEncryptFinished(true);
    });
  }, [clientEncrypt, files]);

  const handleSeverEncrypt = useCallback(async () => {
    flushSync(() => {
      setEncryptLoading(true);
      setEncryptFinished(false);
    });
    const fileNames = files.map((file) => file.name);
    const { type, encryptionId, encryptedFiles } = await serverEncrypt(
      retryCount
    );
    flushSync(() => {
      setEncryptionType(type);
      setEncryptionId(encryptionId);
      setEncryptedFiles(encryptedFiles);
      setEncryptedFileNames(fileNames);
      setEncryptLoading(false);
      setEncryptFinished(true);
    });
  }, [serverEncrypt, files]);

  const buttonDisabled = useMemo(
    () => files.length === 0 || valid === false || encryptLoading,
    [files, valid, encryptLoading]
  );

  const handleEncrypt = useCallback(() => {
    if (type === "client") {
      handleClientEncrypt();
    } else {
      handleSeverEncrypt();
    }
  }, [type, handleClientEncrypt, handleSeverEncrypt]);

  useEffect(() => {
    initializeInput();
  }, [type]);

  return (
    <EncryptLayout>
      <motion.div layout initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <Card style={{ maxWidth: 600 }}>
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

            {type === CLIENT_ENCRYPT_TYPE && <EncryptionCaution />}

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

            <RetryCountInput
              retryCount={retryCount}
              setRetryCount={setRetryCount}
            />

            <motion.div layout initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <EncryptionResult
                message={message}
                percentage={percentage}
                finished={encryptFinished}
                encryptedFileNames={encryptedFileNames}
                encryptedFiles={encryptedFiles}
                encryptionId={encryptionId}
                encryptionType={encryptionType}
              />
            </motion.div>

            <EncryptButton
              disabled={buttonDisabled}
              handleEncrypt={handleEncrypt}
            />
          </Space>
        </Card>
      </motion.div>
    </EncryptLayout>
  );
}

export { EncryptPage };
