import { DownloadOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import { downloadFile } from "@features/file";
import { Button, Space, Tooltip, Typography } from "antd";
const { Text } = Typography;

interface DecryptResultProps {
  success: boolean;
  files: File[];
}

function downloadAllFiles(files: File[]) {
  files.forEach((file, idx) => {
    setTimeout(() => downloadFile(file), idx * 200);
  });
}

function DecryptResult({ files, success }: DecryptResultProps) {
  if (!success) {
    return null;
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 900,
        minWidth: 600,
        margin: "0 auto",
        background: "#181818",
        borderRadius: 12,
        padding: "32px 40px",
        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.25)",
      }}
    >
      <div
        style={{
          marginBottom: 24,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text strong style={{ fontSize: 20 }}>
          복호화된 파일 목록
        </Text>
        <Tooltip title="모든 파일을 한 번에 다운로드합니다.">
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={() => downloadAllFiles(files)}
            disabled={files.length === 0}
            style={{
              background: "#1677ff",
              borderColor: "#1677ff",
              fontWeight: 600,
              fontSize: 16,
              padding: "0 24px",
            }}
          >
            모두 다운로드
          </Button>
        </Tooltip>
      </div>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {files.map((file, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              background: "#232323",
              borderRadius: 8,
              padding: "16px 20px",
              minHeight: 56,
              boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)",
            }}
          >
            <Text
              style={{
                color: "#fff",
                flex: 1,
                fontSize: 16,
                wordBreak: "break-all",
              }}
            >
              {file.name}
            </Text>
            <Tooltip title="이 파일만 다운로드">
              <Button
                type="link"
                icon={<CloudDownloadOutlined twoToneColor="#1677ff,#fff" />}
                onClick={() => downloadFile(file)}
                style={{ color: "#1677ff", fontWeight: 500, fontSize: 15 }}
              >
                다운로드
              </Button>
            </Tooltip>
          </div>
        ))}
      </Space>
    </div>
  );
}

export { DecryptResult };
