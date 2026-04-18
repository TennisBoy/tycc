interface Config {
  apiBaseUrl: string;
  clientId: string;
  authority: string;
  isDevelopment: boolean;
  isProduction: boolean;
}

const getEnvVar = (key: keyof ImportMetaEnv, fallback?: string): string => {
  const value = import.meta.env[key];
  if (!value && !fallback) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value || fallback || "";
};

export const config: Config = {
  apiBaseUrl: getEnvVar("VITE_API_BASE_URL", "http://localhost:5000/api"),
  clientId: getEnvVar("VITE_CLIENT_ID", "WebApp"),
  authority: getEnvVar("VITE_AUTHORITY", "https://localhost:6001"),
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

if (!config.authority || !config.apiBaseUrl) {
  throw new Error("Missing required environment variables");
}

export default config;
