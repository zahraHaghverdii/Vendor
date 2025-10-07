import { useAuthStore } from "../store/useAuthStore";

export function useAuth() {
  const { user, token, checkAuth, logout } = useAuthStore();

  const isAuthenticated = Boolean(token);

  return { user, token, isAuthenticated, checkAuth, logout };
}
