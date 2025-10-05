// hooks/useAuth.ts
export function useAuth() {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token));
    if (payload.exp < Date.now()) {
      // منقضی شده
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
