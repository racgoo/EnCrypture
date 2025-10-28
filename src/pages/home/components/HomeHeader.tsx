import { ThunderboltOutlined } from "@ant-design/icons";
import { useLocale } from "@shares/locale";
import { Col, Row, Space, Typography } from "antd";
import { localeTable } from "../locale";

const { Title, Text } = Typography;

function HomeHeader() {
  const { t } = useLocale(localeTable);
  return (
    <Row justify="center" style={{ marginBottom: 32 }}>
      <Col>
        <Space direction="vertical" align="center">
          <ThunderboltOutlined style={{ fontSize: 48, color: "#1677ff" }} />
          <Title level={1} style={{ marginBottom: 0 }}>
            EnCrypture
          </Title>
          <Title level={2} style={{ marginBottom: 0 }}>
            {t("headerTitle")}
          </Title>
          <Text type="secondary">{t("headerDescription")}</Text>
        </Space>
      </Col>
    </Row>
  );
}

export { HomeHeader };
