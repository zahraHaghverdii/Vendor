import { create } from "zustand";
import Cookies from "js-cookie";

type User = {
  username: string;
  email: string;
  password: string;
};

interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  login: (user, token) => {
    Cookies.set("token", token, { expires: 1 }); // ذخیره توکن در کوکی
    set({ user, token });
  },

  logout: () => {
    Cookies.remove("token");
    set({ user: null, token: null });
  },

  checkAuth: () => {
    const token = Cookies.get("token");
    if (token) {
      // اینجا می‌تونی کاربر رو از localStorage یا سرور بگیری
      const savedUser = localStorage.getItem("user");
      set({ user: savedUser ? JSON.parse(savedUser) : null, token });
    } else {
      set({ user: null, token: null });
    }
  },
}));
