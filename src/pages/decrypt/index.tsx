import { FileTextOutlined, LockOutlined } from "@ant-design/icons";
import { message, Space, Typography } from "antd";
import { DecryptButton } from "./components/DecryptButton";
import { DecryptCard } from "./components/DecryptCard";
import { DecryptLayout } from "./components/DecryptLayout";
import { PasswordInput } from "./components/PasswordInput";
import { useDecrypt } from "./hooks/useDecrypt";
import { useLoadData } from "./hooks/useLoadData";
import { useMetadataRepository } from "@features/repository";
import { ENCRYPTED_DATA_TYPE } from "@shares/templete/redirectionTemplete";
import { aesEncrypter, argon2Encrypter } from "@features/encrypt";
import { useState } from "react";
import { getFileFromBase64 } from "@features/file";

const { Title, Paragraph, Text } = Typography;

function DecryptPage() {
  const { getMetadata } = useMetadataRepository();
  const { dataLoaded, dataLoading, count } = useLoadData();
  const { password, setPassword, files, decrypt, loading } = useDecrypt([], []);
  const [decryptedFiles, setDecryptedFiles] = useState<File[]>([]);

  const handleDecrypt = async () => {
    const encryptKey = await argon2Encrypter.hash(password);
    const encryptedDatas = getMetadata(ENCRYPTED_DATA_TYPE)?.split(",");
    try {
      if (encryptedDatas) {
        const decryptedFiles = await Promise.all(
          encryptedDatas.map(async (encryptedBase64File, index) => {
            const decryptedFile = await aesEncrypter.decrypt(
              encryptedBase64File,
              encryptKey
            );
            return getFileFromBase64(decryptedFile, "hihi," + index);
          })
        );
        console.log(decryptedFiles);
        setDecryptedFiles(decryptedFiles);
      }
    } catch {
      message.error("파일 복호화에 실패했습니다.");
    }
  };

  return (
    <DecryptLayout>
      <DecryptCard>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div style={{ textAlign: "center" }}>
            <LockOutlined style={{ fontSize: 48, color: "#1677ff" }} />
            <Title
              level={2}
              style={{ color: "#fff", marginTop: 16 }}
              onClick={() => {
                console.log(getMetadata(ENCRYPTED_DATA_TYPE));
              }}
            >
              파일 복호화{count}
            </Title>
            <Paragraph style={{ color: "#aaa" }}>
              암호화된 파일을 업로드하고 암호를 입력하세요.
              <br />
              <FileTextOutlined /> 안전하게 파일을 복호화할 수 있습니다.
            </Paragraph>
          </div>

          <PasswordInput password={password} setPassword={setPassword} />

          {/* 복호화된 파일 리스트 및 다운로드 버튼 표시 */}
          {decryptedFiles.length > 0 && (
            <div>
              <div style={{ marginBottom: 8, color: "#fff" }}>
                복호화된 파일 목록
              </div>
              {decryptedFiles.map((file, idx) => (
                <div key={idx}>
                  <a
                    href={URL.createObjectURL(file)}
                    download={file.name}
                    style={{ color: "#1677ff" }}
                  >
                    <Text style={{ color: "#fff", marginRight: 12 }}>
                      다운로드 {file.name}
                    </Text>
                  </a>
                </div>
              ))}
            </div>
          )}

          <DecryptButton handleDecrypt={handleDecrypt} />
        </Space>
      </DecryptCard>
    </DecryptLayout>
  );
}

export { DecryptPage };
