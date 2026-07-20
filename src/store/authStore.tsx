// src/store/authStore.ts
import { create } from "zustand";

type AuthStore = {
  user: any;
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (access: string, refresh: string) => void;
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  accessToken: localStorage.getItem("access_token"),
  refreshToken: localStorage.getItem("refresh_token"),
  setTokens: (access, refresh) => {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    set({ accessToken: access, refreshToken: refresh });
  },
  getAccessToken: () => get().accessToken,
  getRefreshToken: () => get().refreshToken,
}));