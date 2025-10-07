// hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { LoginUser } from "../services/userService";
import { useAuthStore } from "../store/useAuthStore";
import type { UserLoginData } from "../types/Users";

type LoginResponse = {
  user: {
    id: number;
    username: string;
    email: string;
    password: string;
  };
  token: string;
};

export default function useLogin() {
  const { login } = useAuthStore();
  const { mutate: loginUser, isPending: isLoadingLogin } = useMutation<
    LoginResponse,
    Error,
    UserLoginData
  >({
    mutationFn: LoginUser,
    onSuccess: (data) => {
      toast.success("ورود موفقیت‌آمیز بود");

      login(data.user, data.token); // ذخیره در Zustand و کوکی
      localStorage.setItem("user", JSON.stringify(data.user)); // حالا مقدار درست ذخیره می‌شه
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { loginUser, isLoadingLogin };
}
