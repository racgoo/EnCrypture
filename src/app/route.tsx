import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { HomePage } from "@pages/home";
import { EncryptPage } from "@pages/encrypt";
import { DecryptPage } from "@pages/decrypt";
import mobile from "is-mobile";
import { useEffect, useMemo } from "react";
import MobileBlockPage from "@pages/mobile";
// import { LocaleProvider } from "@shares/locale";
import NotFoundPage from "@pages/notFound";
import { openPopup } from "@shares/popup";
import { getDefaultLocalePath, langs, type LangType } from "@shares/locale";

const router = createBrowserRouter([
  { path: "/", loader: () => redirect(getDefaultLocalePath()), element: null },
  {
    path: "/:lang",
    loader: ({ params }) => {
      const validation = langs.includes(params.lang as LangType);
      if (!validation) {
        return redirect("/not-found");
      }
    },
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "encrypt/:type",
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
