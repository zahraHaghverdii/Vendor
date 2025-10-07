// components/Header.tsx
import InputSearch from "../ui/InputSearch";
import ButtonAddVendor from "../ui/ButtonAddVendor";
import { useVendorModalStor } from "../../store/useVendorModalStor";
import ButtonLogin from "../ui/ButtonLogin";
import { useAuth } from "../../utils/useAuth";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import ButtonLogout from "../ui/ButtomLogout";

export default function Header() {
  const { openModal } = useVendorModalStor();
  const { isAuthenticated, checkAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="bg-white shadow-sm p-4 flex justify-between items-center">
      {/* Search */}
      <InputSearch />

      <div className="flex justify-center items-center gap-x-3">
        {/* Add button */}
        <ButtonAddVendor
          title="افزودن فروشنده جدید"
          onClick={() =>
            !isAuthenticated ? navigate("/login") : openModal("add")
          }
        />
        <ButtonLogin />
        <ButtonLogout />
      </div>
    </div>
  );
}
