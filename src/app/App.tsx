import AntdProvider from "../shares/provider/antd/antd.provider";
import { AppRoutes } from "./route";

function App() {
  return (
    <AntdProvider>
      <AppRoutes />
    </AntdProvider>
  );
}

export default App;
