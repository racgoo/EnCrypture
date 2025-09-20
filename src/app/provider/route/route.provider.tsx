import { Navigate, RouterProvider, createHashRouter } from "react-router-dom";
import { HomePage } from "@pages/home";
import { EncryptPage } from "@pages/encrypt";
import { DecryptPage } from "@pages/decrypt";

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
    element: <Navigate to="/" replace={true} />,
  },
]);

export function RoutesProvider() {
  return <RouterProvider router={router} />;
}
