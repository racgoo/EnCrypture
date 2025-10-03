import { AntdProvider } from "@shares/antd";
import { OverlayProvider } from "overlay-kit";
import { HelmetProvider } from "react-helmet-async";
import { AppRoutes } from "./route";

function App() {
  return (
    <AntdProvider>
      <HelmetProvider>
        <OverlayProvider>
          <AppRoutes />
        </OverlayProvider>
      </HelmetProvider>
    </AntdProvider>
  );
}

export default App;
