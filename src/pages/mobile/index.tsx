import { useLocale } from "@shares/locale";
import { Result, Typography } from "antd";
import { localeTable } from "./locale";

const { Text } = Typography;

function MobileBlockPage() {
  const { t } = useLocale(localeTable);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",
      }}
    >
      <Result
        status="403"
        title={t("title")}
        subTitle={
          <Text>
            {t("mobile_not_supported_title")}
            <br />
            {t("mobile_not_supported_description")}
          </Text>
        }
        icon={<span style={{ fontSize: 48 }}>📵</span>}
      />
    </div>
  );
}

export default MobileBlockPage;
