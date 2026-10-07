import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { loginRequest } from "../Services/authApi";
import type { LoginCredentials, Role, User } from "../Types/Auth";
import { clearAuth, loadAuth, saveAuth, type StoredAuth } from "../Services/authStorage";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: ( credentials: LoginCredentials ) => Promise<void>;
  logout: () => void;
  hasRole: (...roles: Role[]) => boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({children }: {children: ReactNode }) {
  const [auth, setAuth] = useState<StoredAuth | null>(() => loadAuth());

  const login = useCallback(async (credentials: LoginCredentials) => {
    const data = await loginRequest(credentials);
    saveAuth({ user: data.user, token: data.token });
    setAuth({ user: data.user, token: data.token });
  }, []);

   const logout = useCallback(() => {
      clearAuth();
      setAuth(null);
    }, []);

    const hasRole = useCallback(
      (...roles: Role[]) => !!auth && roles.includes(auth.user.role),
      [auth]
    );

  const value = useMemo<AuthContextValue>(
    () => ({
      user: auth?.user ?? null,
      token: auth?.token ?? null,
      isAuthenticated: auth !== null,
      login,
      logout,
      hasRole
    }),
    [auth, login, logout, hasRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}