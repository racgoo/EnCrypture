import { LockOutlined } from "@ant-design/icons";
import { useLocale } from "@shares/locale";
import { Progress, Space, Typography } from "antd";
import { Fragment, useCallback, useMemo } from "react";
import { DataLoading } from "./components/DataLoading";
import { DecryptButton } from "./components/DecryptButton";
import { DecryptCard } from "./components/DecryptCard";
import { DecryptLayout } from "./components/DecryptLayout";
import { DecryptResult } from "./components/DecryptResult";
import { PasswordInput } from "./components/PasswordInput";
import { useDecrypt } from "./hooks/useDecrypt";
import { useLoadData } from "./hooks/useLoadData";
import { localeTable } from "./locale";
import {
  CLIENT_ENCRYPT_TYPE,
  SERVER_ENCRYPT_TYPE,
} from "@pages/encrypt/constants";

const { Title, Text } = Typography;

function DecryptPage() {
  const { t } = useLocale(localeTable);
  const {
    dataLoaded,
    dataLoading,
    loadDataPercentage,
    encryptedFiles,
    fileNames,
    chunkCount,
    allChunkCount,
    invalidNavigation,
    encryptionMetaData,
  } = useLoadData();

  const {
    password,
    setPassword,
    clientDecrypt,
    serverDecrypt,
    files,
    decryptLoading,
    decryptPercentage,
  } = useDecrypt(encryptedFiles, fileNames);

  const handleDecrypt = useCallback(() => {
    if (encryptionMetaData.encryptionType === CLIENT_ENCRYPT_TYPE) {
      clientDecrypt();
    }
    if (encryptionMetaData.encryptionType === SERVER_ENCRYPT_TYPE) {
      serverDecrypt(encryptionMetaData.encryptionId);
    }
  }, [clientDecrypt, serverDecrypt, encryptionMetaData]);

  const inputLoading = useMemo(() => {
    return dataLoading || !dataLoaded || decryptLoading;
  }, [dataLoading, dataLoaded, decryptLoading]);

  const successDecrypt = useMemo(() => {
    return files.length > 0 && !inputLoading;
  }, [files, inputLoading]);

  return (
    <DecryptLayout>
      <DecryptCard>
        {invalidNavigation && (
          <div style={{ textAlign: "center" }}>
            <Title level={2} style={{ color: "#fff" }}>
              {t("wrong_access_message")}
            </Title>
          </div>
        )}

        {!invalidNavigation && dataLoading && (
          <DataLoading
            percentage={loadDataPercentage}
            chunkCount={chunkCount}
            allChunkCount={allChunkCount}
          />
        )}

        {!dataLoading && (
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {!successDecrypt && (
              <Fragment>
                <div style={{ textAlign: "center" }}>
                  <LockOutlined style={{ fontSize: 48, color: "#1677ff" }} />
                  <Title level={2} style={{ color: "#fff", marginTop: 16 }}>
                    {t("title")}
                  </Title>
                </div>

                <PasswordInput
                  password={password}
                  setPassword={setPassword}
                  disabled={inputLoading}
                />

                <div>
                  <Text>
                    {" "}
                    {t("progress_message")} {decryptPercentage}
                  </Text>
                  <Progress percent={decryptPercentage} />
                </div>

                <DecryptButton
                  handleDecrypt={handleDecrypt}
                  disabled={inputLoading}
                />
              </Fragment>
            )}

            {successDecrypt && (
              <DecryptResult files={files} success={successDecrypt} />
            )}
          </Space>
        )}
      </DecryptCard>
    </DecryptLayout>
  );
}

export { DecryptPage };
