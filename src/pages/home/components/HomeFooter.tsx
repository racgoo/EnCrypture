import { Col, Row, Typography } from "antd";
import {
  InfoCircleOutlined,
  MailOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { useLocale } from "@shares/locale";
import { localeTable } from "../locale";
const { Text, Link } = Typography;

function HomeFooter() {
  const { t } = useLocale(localeTable);
  return (
    <Row justify="center" style={{ marginTop: 48 }}>
      <Col>
        <Text type="secondary" style={{ display: "block", marginBottom: 4 }}>
          <InfoCircleOutlined /> {t("footerDescription")}
        </Text>
        <Text type="secondary" style={{ display: "block", marginBottom: 2 }}>
          <MailOutlined style={{ marginRight: 4 }} />
          <Link
            href="mailto:lhsung98@naver.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            lhsung98@naver.com
          </Link>
        </Text>
        <Text type="secondary" style={{ display: "block" }}>
          <GithubOutlined style={{ marginRight: 4 }} />
          <Link
            href="https://github.com/racgoo"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/racgoo
          </Link>
        </Text>
      </Col>
    </Row>
  );
}

export { HomeFooter };
