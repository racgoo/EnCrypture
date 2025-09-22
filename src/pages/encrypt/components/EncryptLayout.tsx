function EncryptLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: "48px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
}

export { EncryptLayout };
