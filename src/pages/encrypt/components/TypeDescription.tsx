import { useLocale } from "@shares/locale";
import { useType } from "../hooks/useType";
import { Typography } from "antd";
import { localeTable } from "../locale";
const { Text } = Typography;

function TypeDescription() {
  const { type } = useType();
  const { t } = useLocale(localeTable);
  if (type === "client") {
    return (
      <Text
        type="secondary"
        style={{
          textAlign: "center",
          display: "block",
        }}
      >
        {t("client_guide_1")}
        <br />
        {t("client_guide_2")}
        <br />
        {t("client_guide_3")}
      </Text>
    );
  }
  if (type === "server") {
    return (
      <Text type="secondary" style={{ textAlign: "center", display: "block" }}>
        {t("server_guide_1")}
      </Text>
    );
  }
  return null;
}

export { TypeDescription };
