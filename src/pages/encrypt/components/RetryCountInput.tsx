import { RetweetOutlined } from "@ant-design/icons";
import { useLocale } from "@shares/locale";
import { Input } from "antd";
import { useMemo } from "react";
import { Fragment } from "react/jsx-runtime";
import { CLIENT_ENCRYPT_TYPE } from "../constants";
import { useType } from "../hooks/useType";
import { localeTable } from "../locale";

import { Typography } from "antd";

const { Text } = Typography;

interface RetryCountInputProps {
  retryCount: number;
  setRetryCount: (retryCount: number) => void;
}

function RetryCountInput({ retryCount, setRetryCount }: RetryCountInputProps) {
  const { type } = useType();
  const { t } = useLocale(localeTable);
  const disabled = useMemo(() => {
    return type === CLIENT_ENCRYPT_TYPE;
  }, [type]);

  return (
    <Fragment>
      {disabled ? null : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
          }}
        >
          <Text
            type="secondary"
            style={{ textAlign: "start", display: "block" }}
          >
            {t("retry_count_description")}
          </Text>
          <Input
            disabled={disabled}
            size="large"
            placeholder={t("retry_count_placeholder")}
            prefix={<RetweetOutlined />}
            value={retryCount}
            type="number"
            min={1}
            onChange={(e) => setRetryCount(Number(e.target.value))}
            style={{ MozAppearance: "textfield" }}
            onWheel={(e) => e.currentTarget.blur()}
            inputMode="numeric"
            className="no-spin"
          />
        </div>
      )}
    </Fragment>
  );
}

export { RetryCountInput };
