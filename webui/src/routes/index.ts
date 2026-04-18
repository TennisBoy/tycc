import { renderRoutes } from "./GenerateRoute";
import type { AppLayoutRoute } from "./route";

export const routes: AppLayoutRoute[] = [];

export const Routes = renderRoutes(routes);
