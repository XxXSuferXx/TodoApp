import type { User } from "../Types/Auth";

const KEY = "auth";

export interface StoredAuth {
    user: User;
    token: string;
}

export function isTokenExpired(token: string): boolean {
    try {
        const payload = JSON.parse(
        atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
        );
        return typeof payload.exp !== "number" || payload.exp * 1000 <= Date.now();
    } catch {
        return true; //treat bad token as expired
    }
}

export function loadAuth(): StoredAuth | null {
    try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return null;
            const parsed = JSON.parse(raw);
        if (!parsed.user || !parsed.token || isTokenExpired(parsed.token)) {
            localStorage.removeItem(KEY);
            return null;
        }
        return parsed as StoredAuth;
    } catch {
        localStorage.removeItem(KEY);
        return null;
    }
}

export function saveAuth(auth: StoredAuth) {
  localStorage.setItem(KEY, JSON.stringify(auth));
}

export function clearAuth() {
  localStorage.removeItem(KEY);
}