import { useCallback } from "react";
import { useAuth } from "../Context/authContext";
import type { ApiResponse } from "../Types/todo";

const API = "http://localhost:3000/api/v1";

export default function useApi() {
  const { token, logout } = useAuth();

  return useCallback(
    async function api<T>(path: string, init: RequestInit = {}): Promise<ApiResponse<T>> {
      const headers = new Headers(init.headers);
      if (init.body) headers.set("Content-Type", "application/json");
      if (token) headers.set("Authorization", `Bearer ${token}`);

      const res = await fetch(`${API}${path}`, { ...init, headers });
      const body = await res.json().catch(() => null);

      if (res.status === 401) {
        logout(); //token expired or invalid
        throw new Error(body?.message ?? "Session expired, please sign in again");
      }
      if (!res.ok) {
        throw new Error(body?.message ?? `Server responded with ${res.status}`);
      }
      return body as ApiResponse<T>;
    },
    [token, logout]
  );
}