import { AntdProvider } from "@shares/antd";
import { OverlayProvider } from "overlay-kit";
import { HelmetProvider } from "react-helmet-async";
import { AppRoutes } from "./route";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallbackRender={() => <>Error</>}>
        <Suspense fallback={<></>}>
          <AntdProvider>
            <HelmetProvider>
              <OverlayProvider>
                <AppRoutes />
              </OverlayProvider>
            </HelmetProvider>
          </AntdProvider>
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
