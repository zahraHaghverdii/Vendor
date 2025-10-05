import type { User } from "../types/Users";

export function generateToken(user: User) {
  const payload = {
    id: user.id,
    email: user.email,
    exp: Date.now() + 3 * 60 * 60 * 1000, // اعتبار 3 ساعت
  };
  return btoa(JSON.stringify(payload));
}
