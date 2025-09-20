interface DisabledMarkProps {
  disabled: boolean;
}

function DisabledMark({ disabled }: DisabledMarkProps) {
  if (disabled) {
    return (
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          background: "#fffbe6",
          borderRadius: 8,
          padding: "2px 10px",
          fontWeight: 500,
          color: "#faad14",
          fontSize: 14,
          boxShadow: "0 2px 8px rgba(250,173,20,0.08)",
        }}
      >
        곧 제공 예정
      </div>
    );
  }
  return null;
}

export { DisabledMark };
