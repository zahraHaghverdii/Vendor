import { useEffect } from "react";
import { useAuth } from "../../utils/useAuth";

export default function ButtonLogout() {
  const { logout, isAuthenticated, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    isAuthenticated && (
      <div
        onClick={() => logout()}
        className="items-center gap-2 px-5 py-5 text-lg bg-red-400 text-gray-50 font-medium rounded-2xl shadow-sm  hover:bg-red-500 cursor-pointer transition"
      >
        خروج
      </div>
    )
  );
}
