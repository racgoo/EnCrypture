import { useLocale } from "@shares/locale";
import { Result } from "antd";
import { Typography } from "antd";
import { localeTable } from "./locale";

const { Text } = Typography;

function NotFoundPage() {
  const { t } = useLocale(localeTable);
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#22222",
        padding: "16px",
      }}
    >
      <Result
        status="404"
        title={t("title")}
        subTitle={
          <Text>
            {t("description_1")}
            <br />
            {t("description_2")}
            <br />
            {t("description_3")}
          </Text>
        }
        icon={<span style={{ fontSize: 48 }}>🔍</span>}
      />
    </div>
  );
}

export default NotFoundPage;
