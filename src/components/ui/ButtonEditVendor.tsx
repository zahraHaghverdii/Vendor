import { Edit2 } from "iconsax-react";
import { useVendorModalStor } from "../../store/useVendorModalStor";
import { useAuth } from "../../utils/useAuth";
import { useNavigate } from "react-router";

interface Tid {
  openId: number;
}

export default function ButtonEditVendor({ openId }: Tid) {
  const { openModal } = useVendorModalStor();
  const navigate = useNavigate();
  // check login
  const user = useAuth();

  return (
    <div
      className="flex gap-x-3 items-center cursor-pointer"
      onClick={() => {
        if (!user) {
          navigate("/login"); // ریدایرکت
        } else {
          openModal("edit", openId); // باز کردن مودال
        }
      }}
    >
      <Edit2 size={20} color="#aaa" />
      <span className="text-gray-600 text-2xl">ویرایش</span>
    </div>
  );
}
