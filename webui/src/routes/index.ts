import { renderRoutes } from "./GenerateRoute";
import type { AppLayoutRoute } from "./route";
import PublicLayout from "@/layouts/PublicLayout";
import HomePage from "@/features/home/pages/HomePage";
import AboutPage from "@/features/public/pages/AboutPage";
import CalendarPage from "@/features/public/pages/CalendarPage";
import RoutesPage from "@/features/public/pages/RoutesPage";
import GalleryPage from "@/features/public/pages/GalleryPage";

export const routes: AppLayoutRoute[] = [
  {
    layout: PublicLayout,
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
      {
        id: "gallery",
        name: "gallery",
        title: "Gallery",
        path: "/gallery",
        component: GalleryPage,
      },
    ],
  },
];

export const Routes = renderRoutes(routes);
