import { useAuth } from "react-oidc-context";
import { Routes } from "./routes";

const App = () => {
  const auth = useAuth();

  if (auth.isLoading) {
    return (
      <div className="bg-background text-foreground flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-md rounded-3xl border border-border/70 bg-card/80 p-8 text-center shadow-lg shadow-primary/10 backdrop-blur-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
            Toronto Youth Cycling Club
          </p>
          <h1 className="mt-4 text-3xl font-semibold">Preparing the ride route</h1>
          <p className="text-muted-foreground mt-3 text-base">
            Loading the app shell and checking sign-in status.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {auth.error && (
        <div className="border-border/80 bg-secondary/80 text-foreground border-b px-4 py-3 text-sm">
          <div className="mx-auto max-w-7xl">
            Sign-in services are not configured yet. Public pages are still available, but protected
            screens will stay locked until the backend auth flow is connected.
          </div>
        </div>
      )}
      <Routes isAuthorized={auth.isAuthenticated} />
    </>
  );
};

export default App;
