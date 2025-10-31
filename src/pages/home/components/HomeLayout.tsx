function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: "48px 48px",
        minHeight: "100vh",
        background: `
        linear-gradient(135deg, #0f172a 0%, #1e3c72 30%, #1677ff 65%, #69b1ff 100%),
        radial-gradient(circle at 20% 50%, rgba(22, 119, 255, 0.2) 0%, transparent 55%),
        radial-gradient(circle at 80% 80%, rgba(64, 150, 255, 0.2) 0%, transparent 55%)
      `,
        backgroundSize: "400% 400%, 100% 100%, 100% 100%",
        backgroundPosition: "0% 50%, 0 0, 0 0",
        animation: "gradientShift 4s ease-in-out infinite",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>
        {`
        @keyframes gradientShift {
          0% { background-position: 0% 50%, 0 0, 0 0; }
          50% { background-position: 100% 50%, 0 0, 0 0; }
          100% { background-position: 0% 50%, 0 0, 0 0; }
        }
  
        @keyframes cloudPulse {
          0%   { transform: translateX(-10%) scale(1);   opacity: 0.8;  }
          50%  { transform: translateX(5%) scale(1.1);   opacity: 1;    }
          100% { transform: translateX(-10%) scale(1.05); opacity: 0.85; }
        }
  
        @keyframes streakMove {
          0%   { background-position: -100% 0; opacity: 0.15; }
          50%  { background-position: 100% 0;  opacity: 0.35; }
          100% { background-position: -100% 0; opacity: 0.15; }
        }
      `}
      </style>
      {/* 기존 딤 레이어 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(10, 14, 24, 0.85)",
          backdropFilter: "blur(1.5px)",
          zIndex: 0,
        }}
      />
      {/* 강렬한 구름 레이어 */}
      <div
        style={{
          position: "absolute",
          top: -160,
          left: 0,
          right: 0,
          height: 280,
          borderRadius: "50%",
          background: `
          radial-gradient(circle at 15% 40%, rgba(255, 255, 255, 0.4) 0%, transparent 60%),
          radial-gradient(circle at 35% 30%, rgba(240, 248, 255, 0.3) 0%, transparent 58%),
          radial-gradient(circle at 55% 35%, rgba(200, 220, 255, 0.35) 0%, transparent 60%),
          radial-gradient(circle at 75% 45%, rgba(200, 220, 255, 0.4) 0%, transparent 60%),
          radial-gradient(circle at 90% 40%, rgba(255, 255, 255, 0.35) 0%, transparent 55%)
        `,
          filter: "blur(22px)",
          opacity: 0.85,
          animation: "cloudPulse 6s ease-in-out alternate infinite",
          pointerEvents: "none",
          zIndex: 0.5,
          transform: "translateY(-20px)",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

export { HomeLayout };
