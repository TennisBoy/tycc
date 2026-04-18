import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "react-oidc-context";
import oidcConfig, { onSigninCallback } from "@/oidcConfig";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
    },
  },
});

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider {...oidcConfig} onSigninCallback={onSigninCallback}>
        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
