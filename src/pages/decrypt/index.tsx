import { useState } from "react";
import { LockOutlined, FileTextOutlined } from "@ant-design/icons";
import { Button, Input, Typography, Upload, message, Card, Space } from "antd";

const { Title, Paragraph } = Typography;

function DecryptPage() {
  const [password, setPassword] = useState("");
  const [decryptedContent, setDecryptedContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDecrypt = async () => {};

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#242424",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 64,
      }}
    >
      <Card
        style={{
          width: 420,
          maxWidth: "90vw",
          background: "#1a1a1a",
          borderRadius: 16,
          boxShadow: "0 4px 24px #0008",
        }}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
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

          <Input.Password
            size="large"
            placeholder="암호를 입력하세요"
            prefix={<LockOutlined />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ background: "#222", color: "#fff" }}
          />
          <Button
            type="primary"
            size="large"
            block
            loading={loading}
            onClick={handleDecrypt}
            disabled={!password}
            style={{ marginTop: 8 }}
          >
            복호화하기
          </Button>
          {decryptedContent && (
            <Card
              style={{
                marginTop: 16,
                background: "#181818",
                color: "#fff",
                whiteSpace: "pre-wrap",
                maxHeight: 240,
                overflowY: "auto",
              }}
              title="복호화 결과"
              size="small"
            >
              {decryptedContent}
            </Card>
          )}
        </Space>
      </Card>
    </div>
  );
}

export { DecryptPage };
