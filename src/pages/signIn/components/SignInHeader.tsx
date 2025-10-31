import { LockOutlined } from "@ant-design/icons";
import { useLocale } from "@shares/locale";
import { Typography } from "antd";
import { localeTable } from "../local";

const { Title, Paragraph, Text } = Typography;

function SignInHeader() {
  const { t } = useLocale(localeTable);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <LockOutlined
        style={{
          fontSize: 48,
          color: "#1677ff",
          marginBottom: 16,
          background: "linear-gradient(135deg, #e6f7ff 60%, #f0f5ff 100%)",
          borderRadius: "50%",
          padding: 16,
          boxShadow: "0 2px 10px rgba(22,119,255,0.07)",
        }}
      />
      <Title level={2} style={{ marginBottom: 10 }}>
        EnCrypture
      </Title>
      <Paragraph
        type="secondary"
        style={{
          marginBottom: 16,
          fontSize: 17,
          wordBreak: "keep-all",
          whiteSpace: "normal",
        }}
      >
        {t("signInDescription")}
      </Paragraph>

      <Text
        style={{
          color: "#5C6BC0",
          wordBreak: "keep-all",
          whiteSpace: "normal",
        }}
      >
        {t("serviceDescription")}
      </Text>
    </div>
  );
}

export { SignInHeader };
