import { Routes } from "./routes";
import { usePageTracking } from "@/shared/analytics/usePageTracking";

const App = () => {
  usePageTracking();

  return <Routes />;
};

export default App;
