import React from "react";
import { Route, Routes as ReactRoutes } from "react-router";
import NotFound from "@/shared/pages/NotFound";
import type { AppLayoutRoute, AppRoute } from "./route";

const flattenRoutes = (routes: AppRoute[]): AppRoute[] => {
  if (!routes || routes.length === 0) return [];
  return routes.flatMap(({ routes: subRoutes, ...rest }) => [
    rest,
    ...flattenRoutes(subRoutes ?? []),
  ]);
};

const generateFlattenRoutes = (routes: AppRoute[]): AppRoute[] => {
  return flattenRoutes(routes);
};

export const renderRoutes = (mainRoutes: AppLayoutRoute[]) => {
  const Routes = () => {
    const layouts = mainRoutes.map(({ layout: Layout, routes }, index) => {
      const subRoutes = generateFlattenRoutes(routes);
      return (
        <Route key={index} element={<Layout />}>
          {subRoutes.map(({ component: Component, path, id, name }) => {
            const routeKey = id ?? path ?? name;
            return Component && path && routeKey ? (
              <Route key={routeKey} element={<Component />} path={path} />
            ) : null;
          })}
        </Route>
      );
    });
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <ReactRoutes>
          {layouts} <Route path="*" element={<NotFound />} />
        </ReactRoutes>
      </React.Suspense>
    );
  };
  return Routes;
};
