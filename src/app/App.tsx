import { MetaDataProvider } from "@shares/provider/metadata/metadata.provider";
import AntdProvider from "../shares/provider/antd/antd.provider";
import { AppRoutes } from "./route";

function App() {
  return (
    <MetaDataProvider>
      <AntdProvider>
        <AppRoutes />
      </AntdProvider>
    </MetaDataProvider>
  );
}

export default App;
