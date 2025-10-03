import { HelmetProvider } from "react-helmet-async";
import { AntdProvider } from "@shares/antd";
import { AppRoutes } from "./route";
import { OverlayProvider } from "overlay-kit";
import { LocaleProvider } from "@shares/locale";

function App() {
  return (
    <AntdProvider>
      <HelmetProvider>
        <OverlayProvider>
          <LocaleProvider>
            <AppRoutes />
          </LocaleProvider>
        </OverlayProvider>
      </HelmetProvider>
    </AntdProvider>
  );
}

export default App;
