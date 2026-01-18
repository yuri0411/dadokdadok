import RootLayout from "../layouts/RootLayout.tsx";
import { createBrowserRouter, Navigate, type RouteObject } from "react-router-dom";
import { PATHS } from "./paths.ts";
import { lazy, type ReactNode, Suspense } from "react";
import { Stack } from "@/components";

const Home = lazy(() => import("../pages/Home"));
const Unit = lazy(() => import("../pages/Unit"));
const Word = lazy(() => import("../pages/Word"));

const Lazy = ({ children }: { children: ReactNode }) => (
  <Suspense
    fallback={
      <Stack
        align="center"
        justify="center"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        Loading...
      </Stack>
    }
  >
    {children}
  </Suspense>
);

const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      {
        path: PATHS.ROOT,
        element: <Navigate to={PATHS.HOME} replace />,
      },
      {
        path: PATHS.HOME,
        element: (
          <Lazy>
            <Home />
          </Lazy>
        ),
      },
      {
        path: `${PATHS.UNIT}/:level`,
        element: (
          <Lazy>
            <Unit />
          </Lazy>
        ),
      },
      {
        path: `${PATHS.WORD}/:unit`,
        element: (
          <Lazy>
            <Word />
          </Lazy>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
