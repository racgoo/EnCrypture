import { FileTextOutlined, LockOutlined } from "@ant-design/icons";
import { message, Space, Typography } from "antd";
import { Fragment, useMemo } from "react";
import { DecryptButton } from "./components/DecryptButton";
import { DecryptCard } from "./components/DecryptCard";
import { DecryptLayout } from "./components/DecryptLayout";
import { PasswordInput } from "./components/PasswordInput";
import { useDecrypt } from "./hooks/useDecrypt";
import { useLoadData } from "./hooks/useLoadData";
import { DecryptResult } from "./components/DecryptResult";

const { Title, Paragraph, Text } = Typography;

function DecryptPage() {
  const { dataLoaded, dataLoading, count, encryptedFiles, fileNames } =
    useLoadData();
  const { password, setPassword, decrypt, files } = useDecrypt(
    encryptedFiles,
    fileNames
  );

  const handleDecrypt = async () => {
    try {
      await decrypt();
    } catch {
      message.error("파일 복호화에 실패했습니다.");
    }
  };

  const inputLoading = useMemo(() => {
    return dataLoading || !dataLoaded;
  }, [dataLoading, dataLoaded]);

  const successDecrypt = useMemo(() => {
    return files.length > 0 && !inputLoading;
  }, [files, inputLoading]);

  return (
    <DecryptLayout>
      <DecryptCard>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {!successDecrypt && (
            <Fragment>
              <div style={{ textAlign: "center" }}>
                <LockOutlined style={{ fontSize: 48, color: "#1677ff" }} />
                <Title level={2} style={{ color: "#fff", marginTop: 16 }}>
                  파일 복호화{count}
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
      </DecryptCard>
    </DecryptLayout>
  );
}

export { DecryptPage };
