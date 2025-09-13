import { theme } from "antd";
import type { ThemeConfig } from "antd";

const antdTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    // 기본 색상
    colorPrimary: "#6366f1",
    colorSuccess: "#10b981",
    colorWarning: "#f59e0b",
    colorError: "#ef4444",
    colorInfo: "#06b6d4",

    // 배경 색상
    colorBgContainer: "#1f2937",
    colorBgElevated: "#374151",
    colorBgLayout: "#111827",

    // 텍스트 색상
    colorText: "#f9fafb",
    colorTextSecondary: "#d1d5db",

    // 보더 & 반경
    borderRadius: 12,
    colorBorder: "#4b5563",

    // 폰트
    fontSize: 14,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial',

    // 스페이싱
    padding: 16,
    margin: 16,

    // 그림자 (boxShadow는 components에서 설정)
  },
  components: {
    Layout: {
      headerBg: "#1f2937",
      siderBg: "#111827",
      bodyBg: "#0f172a",
      headerPadding: "0 32px",
    },
    Card: {
      colorBgContainer: "#1e293b",
      borderRadiusLG: 16,
      boxShadowTertiary:
        "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)",
    },
    Button: {
      borderRadius: 10,
      fontWeight: 600,
      primaryShadow: "0 4px 6px -1px rgba(99, 102, 241, 0.3)",
    },
    Avatar: {
      borderRadius: 12,
    },
    Typography: {
      titleMarginTop: 0,
      titleMarginBottom: 8,
    },
  },
};

export default antdTheme;
