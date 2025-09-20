import AntdProvider from "./provider/antd/antd.provider";
import { RoutesProvider } from "./provider/route/route.provider";

function App() {
  return (
    <AntdProvider>
      <RoutesProvider />
    </AntdProvider>
  );
}

export default App;
