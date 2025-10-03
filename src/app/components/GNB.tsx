import {
  GlobalOutlined,
  HomeOutlined,
  LockOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useLocale, useLocaleNavigate, type LangType } from "@shares/locale";
import { useLanguage } from "@shares/locale/hooks/useLanguage";
import { useLanguageMutation } from "@shares/locale/hooks/useLanguageMutation";
import { Button, Col, Drawer, Layout, Menu, Row, Typography } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const { Header } = Layout;
const { Title } = Typography;

export const GNB_HEIGHT = 56;

const localeTable = {
  home: {
    ko: "홈",
    en: "Home",
  },
  client: {
    ko: "클라이언트 암호화",
    en: "Client Encryption",
  },
  server: {
    ko: "서버 암호화(준비중)",
    en: "Server Encryption (Coming Soon)",
  },
  title: {
    ko: "Encrypture",
    en: "Encrypture",
  },
  language: {
    ko: "언어 선택",
    en: "Language Selection",
  },
} as const;

const LANG_OPTIONS: { value: LangType; flag: string; short: string }[] = [
  {
    value: "ko",
    flag: "🇰🇷",
    short: "한국어",
  },
  {
    value: "en",
    flag: "🇺🇸",
    short: "English",
  },
];

function GNB() {
  const navigate = useLocaleNavigate();
  const { t } = useLocale(localeTable);
  const { changeLanguage } = useLanguageMutation();
  const { lang } = useLanguage();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLangChange = (value: LangType) => {
    console.log("handleLangChange", value);
    changeLanguage(value);
    setDrawerOpen(false);
  };

  const navMenu = (
    <Menu
      mode="vertical"
      theme="dark"
      selectable={false}
      style={{
        background: "transparent",
        borderBottom: "none",
        fontWeight: 500,
        fontSize: 15,
        display: "block",
        verticalAlign: "middle",
        padding: "0 0 8px 0",
      }}
      onClick={() => setDrawerOpen(false)}
    >
      <Menu.Item key="home" onClick={() => navigate("/")}>
        <HomeOutlined />
        <span style={{ marginLeft: 8 }}>{t("home")}</span>
      </Menu.Item>
      <Menu.Item key="client" onClick={() => navigate("/encrypt/client")}>
        {t("client")}
      </Menu.Item>
      <Menu.Item
        key="server"
        disabled
        onClick={() => navigate("/encrypt/server")}
      >
        {t("server")}
      </Menu.Item>
    </Menu>
  );

  // Drawer 내부 언어 선택 메뉴
  const langMenu = (
    <Menu
      selectable={false}
      style={{
        background: "transparent",
        border: "none",
        marginBottom: 8,
        marginTop: 4,
      }}
    >
      {LANG_OPTIONS.map((opt) => (
        <Menu.Item
          key={opt.value}
          onClick={() => handleLangChange(opt.value)}
          style={{
            fontWeight: lang === opt.value ? 700 : 400,
            background: lang === opt.value ? "#222" : "transparent",
            color: "#fff",
            borderRadius: 6,
            marginBottom: 2,
            fontSize: 15,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 18 }}>{opt.flag}</span>
          <span>{opt.short}</span>
        </Menu.Item>
      ))}
    </Menu>
  );

  // 헤더 오른쪽: 햄버거만
  return (
    <Header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        background: "rgba(26,26,26,0.95)",
        padding: "0 12px",
        height: GNB_HEIGHT,
        display: "flex",
        alignItems: "center",
        boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
        zIndex: 1000,
        backdropFilter: "blur(4px)",
      }}
    >
      <Row
        align="middle"
        justify="space-between"
        style={{ width: "100%" }}
        wrap={false}
      >
        <Col flex="none">
          <Link to="/" style={{ textDecoration: "none" }}>
            <Row align="middle" gutter={8} wrap={false}>
              <Col>
                <LockOutlined
                  style={{
                    fontSize: 26,
                    color: "#1677ff",
                    verticalAlign: "middle",
                    position: "relative",
                  }}
                />
              </Col>
              <Col>
                <Title
                  level={5}
                  style={{
                    color: "#fff",
                    margin: 0,
                    letterSpacing: 2,
                    fontWeight: 800,
                    fontSize: 18,
                    userSelect: "none",
                    textShadow: "0 2px 8px rgba(22,119,255,0.12)",
                  }}
                >
                  {t("title")}
                </Title>
              </Col>
            </Row>
          </Link>
        </Col>
        <Col flex="auto" style={{ textAlign: "right" }}>
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: 24, color: "#fff" }} />}
            onClick={() => setDrawerOpen(true)}
            style={{
              verticalAlign: "middle",
              marginRight: 4,
              background: "none",
              border: "none",
            }}
          />
          <Drawer
            title={
              <span style={{ color: "#fff", fontWeight: 700 }}>
                {t("title")}
              </span>
            }
            placement="right"
            onClose={() => setDrawerOpen(false)}
            open={drawerOpen}
            bodyStyle={{
              padding: 0,
              background: "#181818",
              minHeight: "100vh",
            }}
            headerStyle={{
              background: "#181818",
              color: "#fff",
              borderBottom: "1px solid #222",
            }}
            width={250}
            closeIcon={<span style={{ color: "#fff", fontSize: 20 }}>×</span>}
          >
            {/* 메뉴 선택이 먼저, 언어 선택은 아래에 */}
            <div
              style={{
                padding: "18px 16px 0 16px",
                borderBottom: "1px solid #222",
              }}
            >
              {navMenu}
            </div>
            <div style={{ padding: "18px 16px 8px 16px" }}>
              <div
                style={{
                  fontWeight: 600,
                  color: "#fff",
                  marginBottom: 8,
                  fontSize: 15,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <GlobalOutlined style={{ marginRight: 8, fontSize: 18 }} />
                {t("language")}
              </div>
              {langMenu}
            </div>
          </Drawer>
        </Col>
      </Row>
    </Header>
  );
}

export { GNB };
