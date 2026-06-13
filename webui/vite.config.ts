import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 8001,
    open: true,
    cors: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router"],
        },
      },
    },
  },
  envPrefix: "VITE_",
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    globals: true,
    env: {
      VITE_API_BASE_URL: "http://localhost:5000",
      VITE_CLIENT_ID: "WebApp",
      VITE_AUTHORITY: "https://localhost:6001",
    },
  },
});
