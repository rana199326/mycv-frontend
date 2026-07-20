// src/hooks/useApi.ts
import axios from "axios";
import type {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "../store/authStore";

const API_URL = import.meta.env.VITE_API_URL; // e.g. http://localhost:3000 (no trailing slash)

export function useApi(): AxiosInstance {
  // Read functions from your auth store (Zustand or similar)
  const { getAccessToken, getRefreshToken, setTokens } = useAuthStore.getState();

  const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
  });

  // ✅ Request Interceptor
  // Always add the access token if present.
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
      // Cast to any to avoid TS error
      (config.headers as any) = {
        ...(config.headers || {}),
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);


  // 🔁 Response Interceptor
  // On 401, try to refresh using the refresh token, then retry the original request once.
  api.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const original: any = error.config;

      if (error.response?.status === 401 && !original?._retry) {
        original._retry = true;
        try {
          const rt = getRefreshToken();
          if (!rt) return Promise.reject(error);

          // Call refresh endpoint with the refresh token in Authorization header
          const r = await axios.post(
            `${API_URL}/auth/refreshToken`,
            null,
            { headers: { Authorization: `Bearer ${rt}` } }
          );

          const { access_token, refresh_token } = r.data;
          // Persist tokens in your store (and wherever else you need)
          setTokens(access_token, refresh_token);

          // Re-attach the new access token and retry
          original.headers = {
            ...(original.headers || {}),
            Authorization: `Bearer ${access_token}`,
          };
          return api(original);
        } catch (e) {
          return Promise.reject(e);
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}
