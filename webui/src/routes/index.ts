import { renderRoutes } from "./GenerateRoute";
import type { AppLayoutRoute } from "./route";
import PublicLayout from "@/layouts/PublicLayout";
import HomePage from "@/features/home/pages/HomePage";
import AboutPage from "@/features/public/pages/AboutPage";
import CalendarPage from "@/features/public/pages/CalendarPage";
import RoutesPage from "@/features/public/pages/RoutesPage";

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
      {
        id: "about",
        name: "about",
        title: "About",
        path: "/about",
        component: AboutPage,
      },
      {
        id: "calendar",
        name: "calendar",
        title: "Calendar",
        path: "/calendar",
        component: CalendarPage,
      },
      {
        id: "routes",
        name: "routes",
        title: "Routes",
        path: "/routes",
        component: RoutesPage,
      },
    ],
  },
];

export const Routes = renderRoutes(routes);
