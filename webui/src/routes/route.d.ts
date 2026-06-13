export interface AppRoute {
  id?: string;
  name: string;
  title: string;
  component?: React.ComponentType<unknown>;
  path?: string;
  routes?: AppRoute[];
}

export interface AppLayoutRoute {
  layout: React.ComponentType<unknown>;
  routes: AppRoute[];
}
