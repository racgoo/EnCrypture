import { useLocale } from "@shares/locale";
import { DashboardLayout } from "./components/DashboardLayout";
import { localeTable } from "./locale";

function DashboardPage() {
  const { t } = useLocale(localeTable);
  return (
    <DashboardLayout>
      <div
        style={{
          textAlign: "center",
          fontSize: 28,
          fontWeight: 700,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#888",
        }}
      >
        {t("dashboard_coming_soon")}
      </div>
    </DashboardLayout>
  );
}

export { DashboardPage };
