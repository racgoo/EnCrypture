import {
  CloudServerOutlined,
  FileProtectOutlined,
  FileTextOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Col, Row, Tag, Typography } from "antd";

import { useLocale } from "@shares/locale";
import { useMemo } from "react";
import { OptionCard } from "./components/Card/OptionCard";
import { HomeFooter } from "./components/HomeFooter";
import { HomeHeader } from "./components/HomeHeader";
import { HomeLayout } from "./components/HomeLayout";
import { localeTable } from "./locale";

import { motion } from "motion/react";

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
          <Tag color="processing">{t("argon2+aes")}</Tag>,
        ],
        href: "/encrypt/client",
        disabled: false,
      },
      {
        icon: (
          <CloudServerOutlined style={{ fontSize: 48, color: "#1677ff" }} />
        ),
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
          <Tag color="processing">{t("fastConversion")}</Tag>,
        ],
        href: "/encrypt/server",
        disabled: false,
      },
    ],
    [t]
  );

  return (
    <HomeLayout>
      <HomeHeader />
      <Row gutter={[32, 32]} justify="center">
        {options.map((option) => (
          <Col
            xs={24}
            md={10}
            key={option.href}
            style={{ flex: 1, display: "flex" }}
          >
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
              }}
              style={{ flex: 1, display: "flex" }}
            >
              <OptionCard {...option} />
            </motion.div>
          </Col>
        ))}
      </Row>
      <HomeFooter />
    </HomeLayout>
  );
}

export { HomePage };
