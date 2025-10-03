import { DecryptPage } from "@pages/decrypt";
import { EncryptPage } from "@pages/encrypt";
import { HomePage } from "@pages/home";
import MobileBlockPage from "@pages/mobile";
import NotFoundPage from "@pages/notFound";
import { getDefaultLocalePath, langs, type LangType } from "@shares/locale";
import { openPopup } from "@shares/popup";
import mobile from "is-mobile";
import { useEffect, useMemo } from "react";
import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { AppLayout } from "./components/AppLayout";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect(getDefaultLocalePath()),
    element: <AppLayout />,
  },
  {
    path: "/:lang",
    loader: ({ params }) => {
      const validation = langs.includes(params.lang as LangType);
      if (!validation) {
        return redirect("/not-found");
      }
    },
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "encrypt/:type",
        loader: ({ params }) => {
          const validation = ["client", "server"].includes(
            params.type as string
          );
          if (!validation) {
            return redirect("/not-found");
          }
        },
        element: <EncryptPage />,
      },
      {
        path: "decrypt",
        element: <DecryptPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/not-found" />,
  },
  {
    path: "not-found",
    element: <NotFoundPage />,
  },
]);

export function AppRoutes() {
  const isMobile = useMemo(mobile, []);

  useEffect(() => {
    if (isMobile) {
      openPopup(<MobileBlockPage />);
    }
  }, [isMobile]);

  return <RouterProvider router={router} />;
}
