import { renderRoutes } from "./GenerateRoute";
import type { AppLayoutRoute } from "./route";
import PublicLayout from "@/layouts/PublicLayout";
import HomePage from "@/features/home/pages/HomePage";

export const routes: AppLayoutRoute[] = [
  {
    layout: PublicLayout,
    isPublic: true,
    routes: [
      {
        id: "home",
        name: "home",
        title: "Home",
        path: "/",
        component: HomePage,
      },
    ],
  },
];

export const Routes = renderRoutes(routes);
