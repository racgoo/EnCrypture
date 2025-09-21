import { FileTextOutlined, LockOutlined } from "@ant-design/icons";
import { Space, Typography } from "antd";
import { DecryptButton } from "./components/DecryptButton";
import { DecryptCard } from "./components/DecryptCard";
import { DecryptLayout } from "./components/DecryptLayout";
import { PasswordInput } from "./components/PasswordInput";
import { useDecrypt } from "./hooks/useDecrypt";

const { Title, Paragraph } = Typography;

function DecryptPage() {
  const { password, setPassword, files, decrypt, loading } = useDecrypt([], []);

  const handleDecrypt = async () => {};

  return (
    <DecryptLayout>
      <DecryptCard>
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

          <PasswordInput password={password} setPassword={setPassword} />

          <DecryptButton handleDecrypt={handleDecrypt} />
        </Space>
      </DecryptCard>
    </DecryptLayout>
  );
}

export { DecryptPage };
