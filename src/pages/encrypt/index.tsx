import {
  CloudServerOutlined,
  LockOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  message,
  Radio,
  Row,
  Space,
  Typography,
  Upload,
  type RadioChangeEvent,
} from "antd";
import type { RcFile } from "antd/es/upload";
import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const { Title, Text } = Typography;

const MEGABYTE_SIZE = 1024 * 1024;
const MAX_FILE_SIZE = 100 * MEGABYTE_SIZE;
const MAX_FILE_SIZE_STRING = "100MB";

type EncryptionType = "client" | "server";

function EncryptPage() {
  const { type = "client" } = useParams<{ type: EncryptionType }>();
  const navigate = useNavigate();

  const [fileList, setFileList] = useState<RcFile[]>([]);

  const handleTypeChange = (e: RadioChangeEvent) => {
    const targetType = e.target.value;
    navigate(`/encrypt/${targetType}`);
  };

  const beforeUpload = (file: RcFile) => {
    const nextFiles = [...fileList, file];

    const totalSize = nextFiles.reduce((totalSize, file) => {
      totalSize += file.size ?? 0;
      return totalSize;
    }, 0);

    if (totalSize <= MAX_FILE_SIZE) {
      setFileList(nextFiles);
      return file;
    }

    message.error("100MB를 초과하는 파일은 업로드할 수 없습니다.");
    return Upload.LIST_IGNORE;
  };

  const handleUpload = useCallback(() => {
    message.info("암호화 기능은 곧 제공됩니다!");
  }, [fileList]);

  return (
    <div>
      <Row justify="center" style={{ minHeight: "80vh", alignItems: "center" }}>
        <Col xs={24} sm={20} md={16} lg={12} xl={10}>
          <Card
            style={{ borderRadius: 16, boxShadow: "0 4px 24px #0001" }}
            bodyStyle={{ padding: 32 }}
          >
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Title level={2} style={{ textAlign: "center", marginBottom: 0 }}>
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
              <Radio.Group
                value={type}
                onChange={handleTypeChange}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  display: "flex",
                }}
                size="large"
              >
                <Radio.Button value="client" style={{ padding: "0 32px" }}>
                  <LockOutlined style={{ marginRight: 8 }} />
                  클라이언트
                </Radio.Button>
                <Radio.Button
                  value="server"
                  style={{ padding: "0 32px" }}
                  disabled
                >
                  <CloudServerOutlined style={{ marginRight: 8 }} />
                  서버
                </Radio.Button>
              </Radio.Group>

              {type === "client" && (
                <Text
                  type="secondary"
                  style={{
                    textAlign: "center",
                    display: "block",
                  }}
                >
                  Argon2 알고리즘을 사용합니다.
                  <br />
                  최소 암호 해독 시간을 보장하여 무차별 대입 공격에 안전합니다.
                </Text>
              )}

              {type === "server" && (
                <Text
                  type="secondary"
                  style={{ textAlign: "center", display: "block" }}
                >
                  해싱된 사용자의 암호가 서버에 저장되어 열람 기간, 암호 입력
                  시도 제한 등 다양한 보안 기능을 제공합니다.
                </Text>
              )}

              <Upload.Dragger
                multiple
                fileList={fileList}
                beforeUpload={beforeUpload}
                accept="*"
                style={{
                  borderRadius: 12,
                  borderColor: "#1677ff33",
                }}
              >
                <p style={{ margin: 0 }}>
                  <UploadOutlined style={{ fontSize: 32, color: "#1677ff" }} />
                </p>
                <Text strong>
                  여기에 파일을 드래그하거나 클릭해서 업로드하세요
                </Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  여러 개의 파일을 한 번에 업로드할 수 있습니다.
                </Text>
              </Upload.Dragger>
              <Button
                type="primary"
                size="large"
                block
                disabled={fileList.length === 0}
                style={{ marginTop: 16, borderRadius: 8 }}
                onClick={handleUpload}
              >
                암호화 시작
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export { EncryptPage };
