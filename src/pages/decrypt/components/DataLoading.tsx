import { Progress } from "antd";

interface DataLoadingProps {
  percentage: number;
  chunkCount: number;
  allChunkCount: number;
}

function DataLoading({ percentage }: DataLoadingProps) {
  return (
    <div
      style={{
        textAlign: "center",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(20, 20, 30, 0.85)",
        borderRadius: 12,
        padding: "48px 0 32px 0",
        marginBottom: 24,
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
          데이터 로드중...
        </div>
        <div style={{ color: "#aaa", fontSize: 14, marginTop: 4 }}>
          암호화된 파일을 안전하게 불러오고 있습니다.
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
