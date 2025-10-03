import { LocaleHelmet } from "@shares/locale";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { GNB, GNB_HEIGHT } from "./GNB";

function AppLayout() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        paddingTop: GNB_HEIGHT,
      }}
    >
      <GNB />
      <LocaleHelmet />
      <Outlet />
      <Footer />
    </div>
  );
}

export { AppLayout };
