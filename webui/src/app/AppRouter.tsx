import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import App from "@/App";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <App />
      <Toaster position="top-center" />
    </BrowserRouter>
  );
};

export default AppRouter;
