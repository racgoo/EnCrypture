import { useLocale } from "@shares/locale";
import { Divider, Typography } from "antd";
import { localeTable } from "../local";

const { Paragraph } = Typography;

function SignInFooter() {
  const { t } = useLocale(localeTable);

  return (
    <>
      <Divider style={{ margin: "18px 0 8px 0" }} />
      <Paragraph
        style={{
          marginTop: 0,
          fontSize: 12,
          color: "#A0AEC0",
        }}
      >
        {t("securityDescription")}
      </Paragraph>
    </>
  );
}

export { SignInFooter };
