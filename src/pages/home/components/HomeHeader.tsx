import { ThunderboltOutlined } from "@ant-design/icons";
import { Col, Row, Space, Typography } from "antd";

const { Title, Text } = Typography;

function HomeHeader() {
  return (
    <Row justify="center" style={{ marginBottom: 32 }}>
      <Col>
        <Space direction="vertical" align="center">
          <ThunderboltOutlined style={{ fontSize: 48, color: "#1677ff" }} />
          <Title level={1} style={{ marginBottom: 0 }}>
            DeCrypture
          </Title>
          <Title level={2} style={{ marginBottom: 0 }}>
            파일 암호화 HTML 변환기
          </Title>
          <Text type="secondary">
            오프라인/온라인 모두 지원하는 안전한 파일 암호화 솔루션
          </Text>
        </Space>
      </Col>
    </Row>
  );
}

export { HomeHeader };
