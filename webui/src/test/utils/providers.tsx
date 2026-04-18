import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";
import { Toaster } from "sonner";

/**
 * Creates a fresh QueryClient for each test.
 * Disables retries and sets staleTime to 0 so tests see fresh data immediately.
 */
export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: 0 },
      mutations: { retry: false },
    },
  });
}

interface TestProvidersProps {
  children: ReactNode;
  initialRoute?: string;
}

/**
 * Wraps components with QueryClientProvider and MemoryRouter for testing.
 * Creates a fresh QueryClient per render to prevent state leakage between tests.
 */
export function TestProviders({ children, initialRoute = "/" }: TestProvidersProps) {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[initialRoute]}>
        {children}
        <Toaster />
      </MemoryRouter>
    </QueryClientProvider>
  );
}
