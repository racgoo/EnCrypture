import {
  FileProtectOutlined,
  FileTextOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Col, Row, Tag, Typography } from "antd";

import { OptionCard } from "./components/Card/OptionCard";
import { HomeHeader } from "./components/HomeHeader";
import { HomeLayout } from "./components/HomeLayout";
import { HomeFooter } from "./components/HomeFooter";
import { useMemo } from "react";
import { useLocale } from "@shares/locale";
import { localeTable } from "./locale";

const { Title, Paragraph } = Typography;

function HomePage() {
  const { t } = useLocale(localeTable);

  const options = useMemo(
    () => [
      {
        icon: <LockOutlined style={{ fontSize: 48, color: "#1677ff" }} />,
        title: <Title level={3}>{t("clientEncryption")}</Title>,
        description: (
          <Paragraph>
            <FileProtectOutlined /> {t("clientDescription_1")}
            <br />
            <FileTextOutlined /> {t("clientDescription_2")}
          </Paragraph>
        ),
        tags: [
          <Tag color="blue">{t("clientEncryption")}</Tag>,
          <Tag color="success">{t("offline")}</Tag>,
          <Tag color="processing">{t("fastConversion")}</Tag>,
        ],
        href: "/encrypt/client",
        disabled: false,
      },
      {
        icon: <LockOutlined style={{ fontSize: 48, color: "#1677ff" }} />,
        title: <Title level={3}>{t("onlineEncryption")}</Title>,
        description: (
          <Paragraph>
            <FileProtectOutlined /> {t("onlineDescription_1")}
          </Paragraph>
        ),
        tags: [
          <Tag color="cyan">{t("onlineEncryption")}</Tag>,
          <Tag color="warning">{t("online")}</Tag>,
          <Tag color="default">{t("moreAdvanced")}</Tag>,
        ],
        href: "/encrypt/server",
        disabled: true,
      },
    ],
    [t]
  );

  return (
    <HomeLayout>
      <HomeHeader />
      <Row gutter={32} justify="center">
        {options.map((option) => (
          <Col xs={24} md={10} key={option.href}>
            <OptionCard {...option} />
          </Col>
        ))}
      </Row>
      <HomeFooter />
    </HomeLayout>
  );
}

export { HomePage };
