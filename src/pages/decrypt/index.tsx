import { FileTextOutlined, LockOutlined } from "@ant-design/icons";
import { Progress, Space, Typography } from "antd";
import { Fragment, useMemo } from "react";
import { DataLoading } from "./components/DataLoading";
import { DecryptButton } from "./components/DecryptButton";
import { DecryptCard } from "./components/DecryptCard";
import { DecryptLayout } from "./components/DecryptLayout";
import { DecryptResult } from "./components/DecryptResult";
import { PasswordInput } from "./components/PasswordInput";
import { useDecrypt } from "./hooks/useDecrypt";
import { useLoadData } from "./hooks/useLoadData";

const { Title, Paragraph, Text } = Typography;

function DecryptPage() {
  const {
    dataLoaded,
    dataLoading,
    loadDataPercentage,
    encryptedFiles,
    fileNames,
    chunkCount,
    allChunkCount,
    invalidNavigation,
  } = useLoadData();
  const {
    password,
    setPassword,
    decrypt,
    files,
    decryptLoading,
    decryptPercentage,
  } = useDecrypt(encryptedFiles, fileNames);

  const handleDecrypt = () => {
    decrypt();
  };

  const inputLoading = useMemo(() => {
    return dataLoading || !dataLoaded || decryptLoading;
  }, [dataLoading, dataLoaded, decryptLoading]);

  const successDecrypt = useMemo(() => {
    return files.length > 0 && !inputLoading;
  }, [files, inputLoading]);

  console.log(files);
  return (
    <DecryptLayout>
      <DecryptCard>
        {invalidNavigation && (
          <div style={{ textAlign: "center" }}>
            <Title level={2} style={{ color: "#fff" }}>
              잘못된 접근입니다. 복호화 페이지를 통해 접근해주세요.
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
                    파일 복호화
                  </Title>
                  <Paragraph style={{ color: "#aaa" }}>
                    암호화된 파일을 업로드하고 암호를 입력하세요.
                    <br />
                    <FileTextOutlined /> 안전하게 파일을 복호화할 수 있습니다.
                  </Paragraph>
                </div>

                <PasswordInput
                  password={password}
                  setPassword={setPassword}
                  disabled={inputLoading}
                />

                <div>
                  <Text> 진행률{decryptPercentage}</Text>
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
