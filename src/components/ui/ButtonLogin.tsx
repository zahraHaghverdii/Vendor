import { User } from "iconsax-react";
import { useEffect } from "react";
import { Link } from "react-router";
import { useAuth } from "../../utils/useAuth";

export default function ButtonLogin() {
  const { user, isAuthenticated, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  return !isAuthenticated ? (
    <Link
      to={"/login"}
      className="items-center gap-2 px-5 py-5 text-lg bg-gray-100 text-gray-800 font-medium rounded-2xl shadow-sm  hover:bg-gray-200 cursor-pointer transition"
    >
      <span className="text-gray-800 md:hidden flex">ورود | ثبت نام</span>
      <span className="md:flex hidden">
        <User color="#808080" size={20} />
      </span>
    </Link>
  ) : (
    <div className="items-center gap-2 px-5 py-5 text-lg bg-gray-100 text-gray-800 font-medium rounded-2xl shadow-sm  hover:bg-gray-200 cursor-pointer transition">
      {user?.username}
    </div>
  );
}
