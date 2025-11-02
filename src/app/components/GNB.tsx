import {
  CloudServerOutlined,
  DashboardOutlined,
  GlobalOutlined,
  HomeOutlined,
  LockOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useUser } from "@features/user";
import { useLocale, useLocaleNavigate, type LangType } from "@shares/locale";
import { useLanguage } from "@shares/locale/hooks/useLanguage";
import { useLanguageMutation } from "@shares/locale/hooks/useLanguageMutation";
import { Col, Drawer, Layout, Menu, Row, Typography } from "antd";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

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
    ko: "서버 암호화",
    en: "Server Encryption",
  },
  title: {
    ko: "Encrypture",
    en: "Encrypture",
  },
  language: {
    ko: "언어 선택",
    en: "Language Selection",
  },
  signIn: {
    ko: "로그인",
    en: "Sign in",
  },
  signUp: {
    ko: "회원가입",
    en: "Sign up",
  },
  logout: {
    ko: "로그아웃",
    en: "Logout",
  },
  profile: {
    ko: "프로필",
    en: "Profile",
  },
  dashboard: {
    ko: "대시보드",
    en: "Dashboard",
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
  const { user } = useUser();
  const navigate = useLocaleNavigate();
  const { t } = useLocale(localeTable);
  const { changeLanguage } = useLanguageMutation();

  const { lang } = useLanguage();
  const [drawerOpen, setDrawerOpen] = useState(false);
  console.log(user);
  const handleLangChange = (value: LangType) => {
    changeLanguage(value);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const navMenu = useMemo(
    () => (
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
        <Menu.Item
          key="home"
          onClick={() => {
            navigate("/");
            handleCloseDrawer();
          }}
        >
          <HomeOutlined />
          <span style={{ marginLeft: 8 }}>{t("home")}</span>
        </Menu.Item>
        <Menu.Item
          key="client"
          onClick={() => {
            navigate("/encrypt/client");
            handleCloseDrawer();
          }}
        >
          <LockOutlined />
          <span>{t("client")}</span>
        </Menu.Item>
        <Menu.Item
          key="server"
          onClick={() => {
            navigate("/encrypt/server");
            handleCloseDrawer();
          }}
        >
          <CloudServerOutlined />
          <span>{t("server")}</span>
        </Menu.Item>
      </Menu>
    ),
    [t]
  );

  // Drawer 내부 언어 선택 메뉴
  const langMenu = useMemo(
    () => (
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
            onClick={() => {
              handleLangChange(opt.value);
              handleCloseDrawer();
            }}
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
    ),
    [t]
  );

  const authMenu = useMemo(
    () =>
      user ? (
        <Menu
          selectable={false}
          style={{
            background: "transparent",
            border: "none",
            marginBottom: 8,
            marginTop: 4,
          }}
        >
          <Menu.Item
            key="logout"
            onClick={() => {
              navigate("/logout");
              handleCloseDrawer();
            }}
          >
            <LogoutOutlined />
            <span>{t("logout")}</span>
          </Menu.Item>
        </Menu>
      ) : (
        <Menu
          selectable={false}
          style={{
            background: "transparent",
            border: "none",
            marginBottom: 8,
            marginTop: 4,
          }}
        >
          <Menu.Item
            key="sign-in"
            onClick={() => {
              navigate("/sign-in");
              handleCloseDrawer();
            }}
          >
            <LoginOutlined />
            <span>
              {t("signIn")}/{t("signUp")}
            </span>
          </Menu.Item>
        </Menu>
      ),
    [t, user]
  );

  const userMenu = useMemo(
    () => (
      <Menu
        selectable={false}
        style={{
          background: "transparent",
          border: "none",
          marginBottom: 8,
          marginTop: 4,
        }}
      >
        <Menu.Item
          key="profile"
          onClick={() => {
            navigate("/profile");
            handleCloseDrawer();
          }}
        >
          <UserOutlined />
          <span>{t("profile")}</span>
        </Menu.Item>
        <Menu.Item
          key="dashboard"
          onClick={() => {
            navigate("/dashboard");
            handleCloseDrawer();
          }}
        >
          <DashboardOutlined />
          <span>{t("dashboard")}</span>
        </Menu.Item>
      </Menu>
    ),
    [t, user]
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
          <motion.div
            layout
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => navigate("/")}
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
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
          </motion.div>
        </Col>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.div
            layout
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => setDrawerOpen(true)}
            style={{
              textDecoration: "none",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MenuOutlined style={{ fontSize: 24, color: "#fff" }} />
          </motion.div>
          <Drawer
            title={
              <span style={{ color: "#fff", fontWeight: 700 }}>
                {t("title")}
              </span>
            }
            placement="right"
            onClose={() => setDrawerOpen(false)}
            open={drawerOpen}
            styles={{
              header: {
                background: "#181818",
                color: "#fff",
                borderBottom: "1px solid #222",
              },
              body: {
                padding: 0,
                background: "#181818",
                minHeight: "100vh",
              },
            }}
            width={250}
            closeIcon={
              <motion.div
                layout
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              >
                <span style={{ color: "#fff", fontSize: 20 }}>×</span>
              </motion.div>
            }
          >
            <div
              style={{
                padding: "18px 16px 8px 16px",
                borderBottom: "1px solid #222",
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  color: "#fff",
                  marginBottom: 8,
                  fontSize: 15,
                  display: "flex",
                  alignItems: "center",
                  padding: 0,
                }}
              >
                <GlobalOutlined style={{ marginRight: 8, fontSize: 18 }} />
                {t("language")}
              </div>
              {langMenu}
            </div>
            {/* 메뉴 선택이 먼저, 언어 선택은 아래에 */}
            <div
              style={{
                padding: "18px 16px 0 16px",
                borderBottom: "1px solid #222",
              }}
            >
              {navMenu}
            </div>

            {user && (
              <div
                style={{
                  padding: "18px 16px 0 16px",
                  borderBottom: "1px solid #222",
                }}
              >
                {userMenu}
              </div>
            )}

            <div style={{ padding: "18px 16px 8px 16px" }}>{authMenu}</div>
          </Drawer>
        </div>
      </Row>
    </Header>
  );
}

export { GNB };
