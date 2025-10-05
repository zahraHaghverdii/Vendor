import { Trash } from "iconsax-react";

import { useVendorModalStor } from "../../store/useVendorModalStor";
import { useAuth } from "../../utils/useAuth";
import { useNavigate } from "react-router";

interface TButtonDelete {
  openId: number;
}

export default function ButtonDeleteVendor({ openId }: TButtonDelete) {
  const { openModal } = useVendorModalStor();
  const navigate = useNavigate();
  // check login
  const user = useAuth();

  return (
    <>
      <div
        className="flex gap-x-3 items-center cursor-pointer"
        onClick={() => {
          if (!user) {
            navigate("/login"); // ریدایرکت
          } else {
            openModal("delete", openId); // باز کردن مودال
          }
        }}
      >
        <Trash size={20} color="#aaa" />
        <span className="text-gray-600 text-2xl">حذف</span>
      </div>
    </>
  );
}
