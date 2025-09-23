import { Navigate, RouterProvider, createHashRouter } from "react-router-dom";
import { HomePage } from "@pages/home";
import { EncryptPage } from "@pages/encrypt";
import { DecryptPage } from "@pages/decrypt";
import mobile from "is-mobile";
import { useMemo } from "react";
import MobileBlockPage from "@pages/mobile";

const router = createHashRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/encrypt/:type",
    element: <EncryptPage />,
  },
  {
    path: "/decrypt",
    element: <DecryptPage />,
  },
  {
    path: "*",
    element: <Navigate to="/mobile" replace={true} />,
  },
]);

export function AppRoutes() {
  const isMobile = useMemo(mobile, []);
  if (isMobile) {
    return <MobileBlockPage />;
  }
  return <RouterProvider router={router} />;
}
