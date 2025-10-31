import { useLocale } from "@shares/locale";
import { ProfileLayout } from "./components/ProfileLayout";
import { localeTable } from "./locale";

function ProfilePage() {
  const { t } = useLocale(localeTable);
  return (
    <ProfileLayout>
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
        {t("profile_coming_soon")}
      </div>
    </ProfileLayout>
  );
}

export { ProfilePage };
