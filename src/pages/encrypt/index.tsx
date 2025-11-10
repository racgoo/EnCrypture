import {
  useReactiveState,
  useReactiveSubRef,
} from "@racgoo/reactive-kit/react";
import { useLocale } from "@shares/locale";
import { Card, Space, Typography } from "antd";
import { motion } from "motion/react";
import { useCallback, useEffect, useMemo } from "react";
import type { EncryptionType } from "../../features/encrypt/type";
import { EncryptButton } from "./components/EncryptButton";
import { EncryptionCaution } from "./components/EncryptionCaution";
import { EncryptionResult } from "./components/EncryptionResult";
import { EncryptLayout } from "./components/EncryptLayout";
import { FileUploadDragger } from "./components/FileUploadDragger";
import { PasswordInput } from "./components/PasswordInput";
import { RetryCountInput } from "./components/RetryCountInput";
import { TypeDescription } from "./components/TypeDescription";
import { TypeSelect } from "./components/TypeSelect";
import { CLIENT_ENCRYPT_TYPE, MAX_FILE_SIZE_STRING } from "./constants";
import { useEncrypt } from "./hooks/useEncrypt";
import { useEncryptionConfig } from "./hooks/useEncryptionConfig";
import { useEncryptionResult } from "./hooks/useEncryptionResult";
import { useFile } from "./hooks/useFile";
import { usePassword } from "./hooks/usePassword";
import { useType } from "./hooks/useType";
import { localeTable } from "./locale";
const { Title, Text } = Typography;

export type EncryptionResultType = {
  type: EncryptionType;
  id: number | null;
  files: string[];
  fileNames: string[];
};

export type EncryptionConfigType = {
  loading: boolean;
  finished: boolean;
  retryCount: number;
};
function EncryptPage() {
  const { t } = useLocale(localeTable);
  const { type } = useType();
  const { fileRef, addFile, deleteFile, clearFiles } = useFile();
  const { password, changePassword, clearPassword, error, valid } =
    usePassword();
  const {
    clientEncrypt,
    serverEncrypt,
    percentage,
    message,
    done,
    clearEncryption,
  } = useEncrypt({
    files: fileRef,
    password,
  });

  const { encryptionConfigRef, clearEncryptionConfig, updateEncryptionConfig } =
    useEncryptionConfig();
  const { encryptionResultRef, clearEncryptionResult, updateEncryptionResult } =
    useEncryptionResult();

  const loadingRef = useReactiveSubRef(
    encryptionConfigRef,
    (ref) => ref.current.loading
  );

  const finishedRef = useReactiveSubRef(
    encryptionConfigRef,
    (ref) => ref.current.finished
  );

  const retryCountRef = useReactiveSubRef(
    encryptionConfigRef,
    (ref) => ref.current.retryCount
  );

  const initializeInput = useCallback(() => {
    clearPassword();
    // reset encryption config
    clearEncryptionConfig();
    // reset encryption result
    clearEncryptionResult();
    // reset files
    clearEncryption();
    // clear files
    clearFiles();
  }, []);

  // reactive state for loading
  const loadingState = useReactiveState(loadingRef);
  // reactive state for finished
  const finishedState = useReactiveState(finishedRef);

  // update encryption data(result and config) after encrypt
  const updateEncryptionData = useCallback(
    (
      type: EncryptionType,
      encryptionId: number | null,
      encryptedFiles: string[],
      fileNames: string[]
    ) => {
      // update encryption result
      updateEncryptionResult({
        type: type,
        id: encryptionId,
        files: encryptedFiles,
        fileNames: fileNames,
      });
      // update encryption config
      updateEncryptionConfig({ loading: false, finished: true });
    },
    []
  );

  // handle client encrypt
  const handleClientEncrypt = useCallback(async () => {
    updateEncryptionConfig({ loading: true, finished: false });
    const fileNames = fileRef.current.map((file) => file.name);
    // encrypt files
    const { type, encryptionId, encryptedFiles } = await clientEncrypt();
    updateEncryptionData(type, encryptionId, encryptedFiles, fileNames);
  }, [clientEncrypt]);

  // handle server encrypt
  const handleSeverEncrypt = useCallback(async () => {
    updateEncryptionConfig({ loading: true, finished: false });
    const fileNames = fileRef.current.map((file) => file.name);
    // encrypt files
    const { type, encryptionId, encryptedFiles } = await serverEncrypt(
      retryCountRef.current
    );
    updateEncryptionData(type, encryptionId, encryptedFiles, fileNames);
  }, [serverEncrypt]);

  // button disabled(disable double click)
  const buttonDisabled = useMemo(
    () =>
      fileRef.current.length === 0 ||
      valid === false ||
      encryptionConfigRef.current.loading,
    [valid, loadingState]
  );

  // handle encrypt(client or server)
  const handleEncrypt = useCallback(() => {
    if (type === "client") {
      handleClientEncrypt();
    } else {
      handleSeverEncrypt();
    }
  }, [type, handleClientEncrypt, handleSeverEncrypt]);

  // initialize input when type changes
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
              disabled={loadingState}
              fileRef={fileRef}
              addFile={addFile}
              deleteFile={deleteFile}
            />

            <PasswordInput
              disabled={loadingState}
              password={password}
              setPassword={changePassword}
              error={error}
              placeholder={t("password_placeholder")}
            />

            <RetryCountInput retryCountRef={retryCountRef} />

            <EncryptionResult
              message={message}
              percentage={percentage}
              finished={finishedState}
              encryptionResultRef={encryptionResultRef}
              done={done}
            />

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
