function DecryptLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#242424",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 64,
      }}
    >
      {children}
    </div>
  );
}

export { DecryptLayout };
