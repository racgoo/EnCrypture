import { RetweetOutlined } from "@ant-design/icons";
import { useLocale } from "@shares/locale";
import { Input } from "antd";
import { useMemo } from "react";
import { Fragment } from "react/jsx-runtime";
import { CLIENT_ENCRYPT_TYPE } from "../constants";
import { useType } from "../hooks/useType";
import { localeTable } from "../locale";

import { Typography } from "antd";
import { useReactiveState, type ReactiveRef } from "@racgoo/reactive-kit/react";

const { Text } = Typography;

interface RetryCountInputProps {
  retryCountRef: ReactiveRef<number>;
}

function RetryCountInput({ retryCountRef }: RetryCountInputProps) {
  const { type } = useType();
  const { t } = useLocale(localeTable);
  const retryCountState = useReactiveState(retryCountRef);
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
            value={retryCountState}
            type="number"
            min={1}
            onChange={(e) => (retryCountRef.current = Number(e.target.value))}
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
