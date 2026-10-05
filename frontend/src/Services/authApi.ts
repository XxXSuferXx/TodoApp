import type { LoginCredentials, LoginResponse } from "../Types/Auth";
import type { ApiResponse } from "../Types/todo";

const BASE_URL = "http://localhost:3000/api";

export async function loginRequest(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  const res = await fetch(`${BASE_URL}/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const body: ApiResponse<LoginResponse> | null = await res.json().catch(() => null);

  // fetch does not reject 401/400/500 errors, so check res.ok
  if (!res.ok || !body?.success || !body.data?.user || !body.data?.token) {
    throw new Error(body?.message ?? "Login failed");
  }

  return body.data;
}