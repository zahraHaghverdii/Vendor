type ModeType = "login" | "signup" | "register";

interface FooterLoginProps {
  mode: ModeType;
  setMode: React.Dispatch<React.SetStateAction<ModeType>>;
}

export default function FooterLogin({ mode, setMode }: FooterLoginProps) {
  return (
    <div className="text-center mt-4 text-gray-600 text-lg">
      {mode === "login" ? (
        <div>
          حساب کاربری نداری؟
          <button
            className="text-gray-800 font-medium underline cursor-pointer"
            onClick={() => setMode("signup")}
          >
            ثبت‌نام
          </button>
        </div>
      ) : (
        <>
          قبلاً ثبت‌نام کردی؟
          <button
            className="text-gray-800 font-medium underline cursor-pointer"
            onClick={() => setMode("login")}
          >
            ورود
          </button>
        </>
      )}
    </div>
  );
}
