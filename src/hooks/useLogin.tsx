// hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { User } from "../types/Users";
import { LoginUser } from "../services/userService";

export interface LoginResponse {
  user: User;
  token: string;
}

export default function useLogin() {
  const { mutate: loginUser, isPending: isLoadingLogin } = useMutation<
    LoginResponse,
    Error,
    User
  >({
    mutationFn: LoginUser,
    onSuccess: (data) => {
      toast.success("ورود موفقیت‌آمیز بود");
      // ذخیره در کوکی
      document.cookie = `token=${data.token}; max-age=${3 * 60 * 60}; path=/`;
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { loginUser, isLoadingLogin };
}
