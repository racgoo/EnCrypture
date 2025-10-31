import { useLocale } from "@shares/locale";
import { Typography } from "antd";
import { localeTable } from "../locale";
import { motion } from "motion/react";

const { Text } = Typography;

function EncryptionCaution() {
  const { t } = useLocale(localeTable);
  return (
    <motion.div
      layout
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      style={{
        display: "flex",
        alignItems: "center",
        background: "#fffbe6",
        padding: "10px 16px",
        borderRadius: 8,
        border: "1px solid #ffe58f",
        marginTop: 12,
        marginBottom: 8,
      }}
    >
      <span
        style={{
          color: "#faad14",
          fontWeight: "bold",
          marginRight: 10,
          fontSize: 18,
          lineHeight: "1",
        }}
        aria-label="warning"
      >
        ⚠️
      </span>
      <Text strong style={{ color: "#614700" }}>
        {t("client_argon2_caution")}
      </Text>
    </motion.div>
  );
}

export { EncryptionCaution };
