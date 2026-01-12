import RootLayout from "../layouts/RootLayout.tsx";
import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { PATHS } from "./paths.ts";
import { lazy, type ReactNode, Suspense } from "react";

const Home = lazy(() => import("../pages/Home"));
const Unit = lazy(() => import("../pages/Unit"));
const Word = lazy(() => import("../pages/Word"));

const Lazy = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
);

const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      {
        path: PATHS.ROOT,
        element: (
          <Lazy>
            <Home />
          </Lazy>
        ),
      },
      {
        path: PATHS.UNIT,
        element: (
          <Lazy>
            <Unit />
          </Lazy>
        ),
      },
      {
        path: PATHS.WORD,
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
