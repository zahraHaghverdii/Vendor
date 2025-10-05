import { User } from "iconsax-react";
import { Link } from "react-router";
import { useAuth } from "../../utils/useAuth";
import { useUserStore } from "../../store/useUserStore";

export default function ButtonLogin() {
  const user = useAuth();
  const { userName } = useUserStore();
  return !user ? (
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
      {userName}
    </div>
  );
}
