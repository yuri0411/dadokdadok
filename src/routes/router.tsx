import { lazy } from "react";

import { createBrowserRouter, Navigate, type RouteObject } from "react-router-dom";

import { Lazy } from "@/components";
import { NotfoundPage } from "@/pages/Notfound";

import { RootLayout } from "../layouts/RootLayout.tsx";

import { PATHS } from "./paths.ts";

const Home = lazy(() => import("../pages/Home"));
const Unit = lazy(() => import("../pages/Unit"));
const Word = lazy(() => import("../pages/Word"));
const ReviewWords = lazy(() => import("../pages/ReviewWords"));

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
        path: PATHS.REVIEW_WORDS,
        element: (
          <Lazy>
            <ReviewWords />
          </Lazy>
        ),
      },
      {
        path: PATHS.UNIT,
        element: <Navigate to={PATHS.ROOT} replace />,
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
        path: PATHS.WORD,
        element: <Navigate to={PATHS.ROOT} replace />,
      },
      {
        path: `${PATHS.WORD}/:unit`,
        element: (
          <Lazy>
            <Word />
          </Lazy>
        ),
      },
      {
        path: "/*",
        element: <NotfoundPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
