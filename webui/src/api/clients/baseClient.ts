import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import { User } from "oidc-client-ts";
import { config } from "@/lib/config";
import qs from "qs";

// Constants
const OIDC_STORAGE_KEY = `oidc.user:${config.authority}:${config.clientId}`;
const USER_CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes
const DEFAULT_TIMEOUT_MS = 30000; // 30 seconds
const HTTP_UNAUTHORIZED = 401;
const HTTP_INTERNAL_SERVER_ERROR = 500;
const DEFAULT_ERROR_MESSAGE = "An unknown error occurred";

// Types
export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
}

export interface ApiError {
  status: number;
  error: ApiErrorInfo;
  validationErrors?: Record<string, string[]>;
}

export interface ApiErrorInfo {
  code?: string;
  message?: string;
  details?: string;
  data?: Record<string, unknown>;
}

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  metadata?: {
    startTime: number;
  };
}

// User cache management
let cachedUser: User | null = null;
let userCacheTime = 0;

function getUser(): User | null {
  const now = Date.now();

  if (cachedUser && now - userCacheTime < USER_CACHE_DURATION_MS) {
    return cachedUser;
  }

  try {
    const oidcStorage = sessionStorage.getItem(OIDC_STORAGE_KEY);
    if (!oidcStorage) {
      cachedUser = null;
      return null;
    }

    cachedUser = User.fromStorageString(oidcStorage);
    userCacheTime = now;
    return cachedUser;
  } catch (error) {
    console.warn("Failed to parse user from storage:", error);
    cachedUser = null;
    return null;
  }
}

export function clearUserCache(): void {
  cachedUser = null;
  userCacheTime = 0;
  sessionStorage.removeItem(OIDC_STORAGE_KEY);
}

/**
 * Base HTTP client with authentication, error handling, and interceptors.
 * Configured for TanStack Query integration with automatic token management.
 */
export class BaseClient {
  protected axiosInstance: AxiosInstance;

  constructor(baseURL?: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL || config.apiBaseUrl,
      timeout: DEFAULT_TIMEOUT_MS,
      headers: {
        "Content-Type": "application/json",
      },
      paramsSerializer: (params) => qs.stringify(params, { allowDots: true, arrayFormat: 'repeat' }),
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const user = getUser();
        if (user && !user.expired) {
          config.headers.Authorization = `Bearer ${user.access_token}`;
        }

        if (import.meta.env.DEV) {
          (config as ExtendedAxiosRequestConfig).metadata = { startTime: Date.now() };
        }

        return config;
      },
      (error: AxiosError) => Promise.reject(this.transformError(error)),
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      (error: AxiosError) => {
        if (error.response?.status === HTTP_UNAUTHORIZED) {
          clearUserCache();
        }
        return Promise.reject(this.transformError(error));
      },
    );
  }

  private transformError(error: AxiosError): ApiError {
    const status = error.response?.status || HTTP_INTERNAL_SERVER_ERROR;
    const responseData = error.response?.data as { error?: ApiErrorInfo } | undefined;

    const apiErrorInfo: ApiErrorInfo = responseData?.error || {
      message: error.message || DEFAULT_ERROR_MESSAGE,
    };

    return {
      status,
      error: apiErrorInfo,
    };
  }

  /**
   * Performs a GET request.
   * @param url - The endpoint URL
   * @param config - Optional Axios request configuration
   * @returns Promise resolving to the response data
   */
  public async get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.get(url, config) as Promise<T>;
  }

  /**
   * Performs a POST request.
   * @param url - The endpoint URL
   * @param data - The request payload
   * @param config - Optional Axios request configuration
   * @returns Promise resolving to the response data
   */
  public async post<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.axiosInstance.post(url, data, config) as Promise<T>;
  }

  /**
   * Performs a PUT request.
   * @param url - The endpoint URL
   * @param data - The request payload
   * @param config - Optional Axios request configuration
   * @returns Promise resolving to the response data
   */
  public async put<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.axiosInstance.put(url, data, config) as Promise<T>;
  }

  /**
   * Performs a DELETE request.
   * @param url - The endpoint URL
   * @param config - Optional Axios request configuration
   * @returns Promise resolving to the response data
   */
  public async delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.delete(url, config) as Promise<T>;
  }

  /**
   * Performs a PATCH request.
   * @param url - The endpoint URL
   * @param data - The request payload
   * @param config - Optional Axios request configuration
   * @returns Promise resolving to the response data
   */
  public async patch<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.axiosInstance.patch(url, data, config) as Promise<T>;
  }

  /**
   * Returns the underlying Axios instance for advanced use cases.
   * @returns The configured Axios instance
   */
  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

const baseClient = new BaseClient();
export default baseClient;
