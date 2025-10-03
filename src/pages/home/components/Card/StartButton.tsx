import { InfoCircleOutlined } from "@ant-design/icons";
import { localeTable } from "../../locale";
import { useLocale } from "@shares/locale";
import { useLocaleNavigate } from "@shares/locale/hooks/useLocaleNavigate";
import { Button, Space, Tooltip } from "antd";
import { useCallback } from "react";

function StartButton({ disabled, href }: { disabled: boolean; href: string }) {
  const navigate = useLocaleNavigate();
  const { t } = useLocale(localeTable);
  const onClick = useCallback(() => {
    navigate(href);
  }, [href, navigate]);

  if (disabled) {
    return (
      <Button
        type="default"
        size="large"
        block
        disabled
        style={{ marginTop: 16 }}
      >
        <Space>
          Coming Soon
          <Tooltip title={t("comingSoon")}>
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      </Button>
    );
  }

  return (
    <Button
      type="primary"
      size="large"
      block
      style={{ marginTop: 16 }}
      onClick={onClick}
    >
      {t("start")}
    </Button>
  );
}

export { StartButton };
