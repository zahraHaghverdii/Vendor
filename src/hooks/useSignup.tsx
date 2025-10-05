import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignupUser } from "../services/userService";
import toast from "react-hot-toast";
import type { User } from "../types/Users";

export default function useSignup() {
  const queryClient = useQueryClient();

  const { mutate: signupUser, isPending: isPendingSignup } = useMutation<
    User,
    Error,
    User
  >({
    mutationFn: SignupUser,
    onSuccess: () => {
      toast.success("ثبت نام با موفقیت انجام شد");
      queryClient.invalidateQueries({ queryKey: ["Users"] });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
  return { signupUser, isPendingSignup };
}
