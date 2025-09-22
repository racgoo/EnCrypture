import { useMetadataRepository } from "@features/repository";
import { Space, Typography } from "antd";
import { useCallback, useMemo, useState } from "react";
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
import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

function EncryptPage() {
  const navigate = useNavigate();
  const { setMetadata } = useMetadataRepository();
  const { files, handleAddFile, handleDeleteFile } = useFile();
  const { password, setPassword, error, valid } = usePassword();
  const { encrypt, percentage, message } = useEncrypt({
    files,
    password,
  });
  const [encryptLoading, setEncryptLoading] = useState(false);
  const [encryptFinished, setEncryptFinished] = useState(false);
  const [encryptedFiles, setEncryptedFiles] = useState<string[]>([]);

  const handleEncrypt = useCallback(async () => {
    flushSync(() => {
      setEncryptLoading(true);
      setEncryptFinished(false);
    });
    const fileNames = files.map((file) => file.name);
    const encryptedFiles = await encrypt();
    setEncryptedFiles(encryptedFiles);
    fileNames.forEach((fileName, index) => {
      setMetadata(fileName, encryptedFiles[index]);
    });
    flushSync(() => {
      setEncryptLoading(false);
      setEncryptFinished(true);
    });
  }, [encrypt, files, setMetadata]);

  const buttonDisabled = useMemo(
    () => files.length === 0 || valid === false || encryptLoading,
    [files, valid, encryptLoading]
  );

  return (
    <EncryptLayout>
      <Space
        direction="vertical"
        size="large"
        style={{ width: "100%", maxWidth: 600 }}
      >
        <Title
          level={2}
          style={{ textAlign: "center", marginBottom: 0 }}
          onClick={() => {
            navigate("/decrypt");
          }}
        >
          파일 암호화
        </Title>
        <Text
          type="secondary"
          style={{ textAlign: "center", display: "block" }}
        >
          여러 파일을 안전하게 암호화할 수 있습니다.
          <br />
          {MAX_FILE_SIZE_STRING} 이하의 파일만 업로드할 수 있습니다.
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
          placeholder="영문, 숫자, 특수문자 포함 6자 이상"
        />

        <EncryptionResult
          message={message}
          percentage={percentage}
          finished={encryptFinished}
          encryptedFiles={encryptedFiles}
        />

        <EncryptButton
          disabled={buttonDisabled}
          handleEncrypt={handleEncrypt}
        />
      </Space>
    </EncryptLayout>
  );
}

export { EncryptPage };
