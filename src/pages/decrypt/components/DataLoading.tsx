import { useLocale } from "@shares/locale";
import { Progress } from "antd";
import { localeTable } from "../locale";

interface DataLoadingProps {
  percentage: number;
  chunkCount: number;
  allChunkCount: number;
}

function DataLoading({
  percentage,
  chunkCount,
  allChunkCount,
}: DataLoadingProps) {
  const { t } = useLocale(localeTable);
  return (
    <div
      style={{
        textAlign: "center",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "transparent",
      }}
    >
      <div style={{ marginBottom: 24 }}>
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          style={{ marginBottom: 8, animation: "spin 1.2s linear infinite" }}
        >
          <circle
            cx="30"
            cy="30"
            r="24"
            stroke="#1677ff"
            strokeWidth="6"
            fill="none"
            strokeDasharray="120"
            strokeDashoffset="40"
            strokeLinecap="round"
          />
          <style>
            {`
              @keyframes spin {
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </svg>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: 20 }}>
          {t("data_loading_message")} ({chunkCount}/{allChunkCount})
        </div>
        <div style={{ color: "#aaa", fontSize: 14, marginTop: 4 }}>
          {t("data_loading_sub_message")}
        </div>
      </div>
      <Progress
        percent={percentage}
        showInfo
        strokeColor={{
          "0%": "#1677ff",
          "100%": "#00e0ff",
        }}
        style={{ width: 240, background: "rgba(0,0,0,0.1)", borderRadius: 8 }}
      />
    </div>
  );
}

export { DataLoading };
