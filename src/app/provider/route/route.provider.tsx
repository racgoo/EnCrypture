import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { HomePage } from "@pages/home";
import { EncryptPage } from "@pages/encrypt";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/encrypt/:type",
    element: <EncryptPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace={true} />,
  },
]);

export function RoutesProvider() {
  return <RouterProvider router={router} />;
}
