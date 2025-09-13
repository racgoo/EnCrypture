import { ConfigProvider } from "antd";
import antdTheme from "./antd.theme";

function AntdProvider({ children }: { children: React.ReactNode }) {
  return <ConfigProvider theme={antdTheme}> {children}</ConfigProvider>;
}

export default AntdProvider;
