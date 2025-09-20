import { Card, Typography, Button, Row, Col, Space, Tag, Tooltip } from "antd";
import {
  LockOutlined,
  CloudServerOutlined,
  FileProtectOutlined,
  FileTextOutlined,
  ThunderboltOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { HomeLayout } from "./components/layout/HomeLayout";

const { Title, Paragraph, Text } = Typography;

function HomePage() {
  return (
    <HomeLayout>
      <Row justify="center" style={{ marginBottom: 32 }}>
        <Col>
          <Space direction="vertical" align="center">
            <ThunderboltOutlined style={{ fontSize: 48, color: "#1677ff" }} />
            <Title level={1} style={{ marginBottom: 0 }}>
              파일 암호화 HTML 변환기
            </Title>
            <Text type="secondary">
              오프라인/온라인 모두 지원하는 안전한 파일 암호화 솔루션
            </Text>
          </Space>
        </Col>
      </Row>
      <Row gutter={32} justify="center">
        <Col xs={24} md={10}>
          <Card
            hoverable
            style={{
              borderRadius: 16,
              boxShadow: "0 4px 24px rgba(22,119,255,0.08)",
              minHeight: 340,
            }}
            cover={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 120,
                  background: "#f0f5ff",
                  borderRadius: "16px 16px 0 0",
                }}
              >
                <LockOutlined style={{ fontSize: 48, color: "#1677ff" }} />
              </div>
            }
          >
            <Title level={3}>
              <Tag color="blue">클라이언트 전용</Tag> 오프라인 암호화
            </Title>
            <Paragraph>
              <FileProtectOutlined /> 파일을 <b>암호화된 HTML</b>로 변환하여
              인터넷 없이도 안전하게 열람할 수 있습니다.
              <br />
              <FileTextOutlined /> <b>암호화된 HTML</b>과{" "}
              <b>열람 가능한 문서</b>를 함께 제공합니다.
            </Paragraph>
            <Paragraph>
              <Tag color="success">100% 오프라인</Tag>{" "}
              <Tag color="processing">빠른 변환</Tag>
            </Paragraph>
            <Button
              type="primary"
              size="large"
              block
              style={{ marginTop: 16 }}
              href="/client-encrypt"
            >
              시작하기
            </Button>
          </Card>
        </Col>
        <Col xs={24} md={10}>
          <Card
            hoverable
            style={{
              borderRadius: 16,
              boxShadow: "0 4px 24px rgba(22,119,255,0.08)",
              minHeight: 340,
              opacity: 0.7,
              position: "relative",
            }}
            cover={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 120,
                  background: "#f0fdfa",
                  borderRadius: "16px 16px 0 0",
                }}
              >
                <CloudServerOutlined
                  style={{ fontSize: 48, color: "#13c2c2" }}
                />
              </div>
            }
          >
            <Title level={3}>
              <Tag color="cyan">서버 전용</Tag> 온라인 암호화
            </Title>
            <Paragraph>
              <FileProtectOutlined /> 서버를 통한 <b>고급 암호화</b> 및{" "}
              <b>문서 관리</b> 기능을 제공합니다.
            </Paragraph>
            <Paragraph>
              <Tag color="warning">인터넷 필요</Tag>{" "}
              <Tag color="default">고급 기능</Tag>
            </Paragraph>
            <Button
              type="default"
              size="large"
              block
              disabled
              style={{ marginTop: 16 }}
            >
              <Space>
                Coming Soon
                <Tooltip title="곧 제공 예정입니다!">
                  <InfoCircleOutlined />
                </Tooltip>
              </Space>
            </Button>
            <div
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "#fffbe6",
                borderRadius: 8,
                padding: "2px 10px",
                fontWeight: 500,
                color: "#faad14",
                fontSize: 14,
                boxShadow: "0 2px 8px rgba(250,173,20,0.08)",
              }}
            >
              곧 제공 예정
            </div>
          </Card>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: 48 }}>
        <Col>
          <Text type="secondary">
            <InfoCircleOutlined /> 모든 암호화는 안전하게 처리되며, 개인정보는
            저장되지 않습니다.
          </Text>
        </Col>
      </Row>
    </HomeLayout>
  );
}

export { HomePage };
