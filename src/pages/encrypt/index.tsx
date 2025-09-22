import { message, Space, Typography } from "antd";
import { useCallback } from "react";
import { EncryptLayout } from "./components/EncryptLayout";
import { FileUploadDragger } from "./components/FileUploadDragger";
import { TypeDescription } from "./components/TypeDescription";
import { TypeSelect } from "./components/TypeSelect";
import { EncryptButton } from "./components/EncryptButton";
import { MAX_FILE_SIZE_STRING } from "./constants";
import { useFile } from "./hooks/useFile";

const { Title, Text } = Typography;

function EncryptPage() {
  const { files, handleAddFile, handleDeleteFile } = useFile();

  const handleEncrypt = useCallback(() => {
    message.info("암호화 기능은 곧 제공됩니다!");
  }, [files]);

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
          onClick={() => {}}
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
          files={files}
          handleAddFile={handleAddFile}
          handleDeleteFile={handleDeleteFile}
        />

        <EncryptButton
          disabled={files.length === 0}
          handleEncrypt={handleEncrypt}
        />
      </Space>
    </EncryptLayout>
  );
}

export { EncryptPage };
