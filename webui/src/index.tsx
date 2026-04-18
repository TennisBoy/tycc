import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";
import AppProviders from "@/app/AppProviders";
import AppRouter from "@/app/AppRouter";

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </React.StrictMode>,
  );
}
