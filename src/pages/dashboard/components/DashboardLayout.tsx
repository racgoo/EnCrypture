function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: "48px",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
}

export { DashboardLayout };
