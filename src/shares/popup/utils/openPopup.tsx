import { overlay } from "overlay-kit";
import type { ComponentType } from "react";

function openPopup(Component: ComponentType) {
  overlay.open(({ unmount }) => (
    <div
      style={{
        width: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <button
        onClick={unmount}
        style={{
          position: "absolute",
          top: 24,
          right: 24,
          background: "#fff",
          border: "1px solid #d9d9d9",
          borderRadius: "50%",
          width: 40,
          height: 40,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: 20,
          color: "#595959",
        }}
      >
        <span
          style={{
            display: "inline-block",
            fontWeight: 600,
            fontSize: 22,
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          ×
        </span>
      </button>
      <Component />
    </div>
  ));
}

export { openPopup };
