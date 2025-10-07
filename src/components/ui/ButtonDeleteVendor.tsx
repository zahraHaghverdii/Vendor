import { Trash } from "iconsax-react";

import { useVendorModalStor } from "../../store/useVendorModalStor";
import { useAuth } from "../../utils/useAuth";
import { useNavigate } from "react-router";
import { useEffect } from "react";

interface TButtonDelete {
  openId: number;
}

export default function ButtonDeleteVendor({ openId }: TButtonDelete) {
  const { openModal } = useVendorModalStor();
  const { isAuthenticated, checkAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <div
        className="flex gap-x-3 items-center cursor-pointer"
        onClick={() => {
          if (!isAuthenticated) {
            navigate("/login");
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
