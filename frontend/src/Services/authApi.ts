import type { LoginCredentials, LoginResponse } from "../Types/Auth";

const BASE_URL = "http://localhost:3000/api";

export async function loginRequest(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    //fetch does not throw error on 401/400/500,so check res.ok
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? "Login failed");
  }

  return res.json() as Promise<LoginResponse>;
}