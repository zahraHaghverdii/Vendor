import { useState } from "react";
import Container from "../layout/Container";
import FooterLogin from "./FooterLogin";
import InputForm from "../ui/InputForm";
import { useForm } from "react-hook-form";
import type { User } from "../../types/Users";
import useSignup from "../../hooks/useSignup";
import SpinnerBtn from "../ui/SpinnerBtn";
import { useUserStore } from "../../store/useUserStore";
import useLogin from "../../hooks/useLogin";

export default function Login() {
  const [mode, setMode] = useState<"login" | "signup" | "register">("login");
  const { signupUser, isPendingSignup } = useSignup();
  const { loginUser, isLoadingLogin } = useLogin();
  const { setUserName } = useUserStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>();

  // send data
  function onSubmit(data: User) {
    if (mode === "signup") {
      signupUser(data, {
        onSuccess: () => {
          reset();
          setUserName(data.username);
        },
      });
    } else if (mode === "login") {
      loginUser(data, {
        onSuccess: () => {
          reset();
        },
      });
    }
  }

  const isLoading = mode === "login" ? isLoadingLogin : isPendingSignup;

  return (
    <Container>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-4xl h-full m-auto bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            {mode === "login"
              ? "ورود"
              : mode === "signup"
              ? "ثبت نام"
              : "فراموشی رمز عبور"}
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {mode === "signup" && (
              <InputForm
                label={"نام کاربری"}
                placeholder={"نام کاربری را وارد کنید"}
                type={"text"}
                name={"username"}
                register={register}
                rules={{
                  required: "نام کاربری الزامی است",
                  minLength: {
                    value: 3,
                    message: "نام کاربر باید حداقل 3 کاراکتر باشد",
                  },
                }}
                error={errors.username?.message}
              />
            )}

            <InputForm
              label={"ایمیل"}
              placeholder={"ایمیل را وارد کنید"}
              type={"email"}
              name={"email"}
              register={register}
              rules={{
                required: "ایمیل الزامی است",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // regex ایمیل
                  message: "ایمیل وارد شده معتبر نیست",
                },
              }}
              error={errors.email?.message}
            />
            <InputForm
              label={"رمز عبور"}
              placeholder={"رمز عبور را وارد کنید"}
              type={"text"}
              name={"password"}
              register={register}
              rules={{
                required: "رمز عبور الزامی است",
                minLength: {
                  value: 4,
                  message: "رمز عبور باید حداقل 4 کاراکتر باشد",
                },
              }}
              error={errors.password?.message}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="bg-gray-400 text-white rounded px-3 py-4 my-3 hover:bg-gray-500 text-center cursor-pointer transition-colors"
            >
              {isLoading ? (
                <SpinnerBtn />
              ) : mode === "login" ? (
                "ورود"
              ) : (
                "ثبت‌نام"
              )}
            </button>
          </form>

          <FooterLogin mode={mode} setMode={setMode} />
        </div>
      </div>
    </Container>
  );
}
