import { DecryptPage } from "@pages/decrypt";
import { EncryptPage } from "@pages/encrypt";
import { HomePage } from "@pages/home";
import MobileBlockPage from "@pages/mobile";
import NotFoundPage from "@pages/notFound";
import { getDefaultLocalePath, langs, type LangType } from "@shares/locale";
import isMobile from "is-mobile";
import {
  createBrowserRouter,
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
        const defaultLocale = getDefaultLocalePath();
        return redirect(`/${defaultLocale}/not-found`);
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
            return redirect(`/${params.lang}/not-found`);
          }
          if (isMobile()) {
            return redirect(`/${params.lang}/mobile-not-supported`);
          }
        },
        element: <EncryptPage />,
      },

      {
        path: "decrypt",
        loader: ({ params }) => {
          if (isMobile()) {
            return redirect(`/${params.lang}/mobile-not-supported`);
          }
        },
        element: <DecryptPage />,
      },

      {
        path: "mobile-not-supported",
        element: <MobileBlockPage />,
      },

      {
        path: "not-found",
        element: <NotFoundPage />,
      },

      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
