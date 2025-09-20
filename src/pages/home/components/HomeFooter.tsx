import { Col, Row, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
const { Text } = Typography;

function HomeFooter() {
  return (
    <Row justify="center" style={{ marginTop: 48 }}>
      <Col>
        <Text type="secondary">
          <InfoCircleOutlined /> 모든 암호화는 안전하게 처리되며, 개인정보는
          저장되지 않습니다.
        </Text>
      </Col>
    </Row>
  );
}

export { HomeFooter };
