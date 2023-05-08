import { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import path from "./constants/path";
import MainLayout from "./layouts/MainLayout";

const Movies = lazy(() => import("./pages/Movies"));

export default function useRouteElements() {
  const routeElements = useRoutes([
    // Homepage
    {
      path: path.home,
      element: (
        <MainLayout>
          <Suspense>
            <Movies />
          </Suspense>
        </MainLayout>
      ),
    },
  ]);
  return routeElements;
}
