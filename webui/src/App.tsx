import { useAuth } from "react-oidc-context";
import { Routes } from "./routes";

const App = () => {
  const auth = useAuth();
  if (auth.isLoading) {
    return <div>Loading...</div>;
  }
  if (auth.error) {
    return (
      <div>
        Oops... {auth.error.source} caused {auth.error.message}
      </div>
    );
  }
  return <Routes isAuthorized={auth.isAuthenticated} />;
};

export default App;
