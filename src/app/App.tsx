import { AntdProvider } from "@shares/antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OverlayProvider } from "overlay-kit";
import { Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { AppRoutes } from "./route";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
      retry: false,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<></>}>
        <AntdProvider>
          <HelmetProvider>
            <OverlayProvider>
              <AppRoutes />
            </OverlayProvider>
          </HelmetProvider>
        </AntdProvider>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
