import { Outlet } from "react-router-dom";
import { GNB, GNB_HEIGHT } from "./GNB";
import { Footer } from "./Footer";
import { LocaleHelmet } from "@shares/locale";

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
