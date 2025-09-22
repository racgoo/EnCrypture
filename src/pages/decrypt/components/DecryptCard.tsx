import { Card } from "antd";

function DecryptCard({ children }: { children: React.ReactNode }) {
  return (
    <Card
      style={{
        minWidth: 420,
        maxWidth: "90vw",
        background: "#1a1a1a",
        borderRadius: 16,
        boxShadow: "0 4px 24px #0008",
      }}
    >
      {children}
    </Card>
  );
}

export { DecryptCard };
