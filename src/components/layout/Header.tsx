// components/Header.tsx
import InputSearch from "../ui/InputSearch";
import ButtonAddVendor from "../ui/ButtonAddVendor";
import { useVendorModalStor } from "../../store/useVendorModalStor";
import ButtonLogin from "../ui/ButtonLogin";

export default function Header() {
  const { openModal } = useVendorModalStor();
  return (
    <div className="bg-white shadow-sm p-4 flex justify-between items-center">
      {/* Search */}
      <InputSearch />

      <div className="flex justify-center items-center gap-x-3">
        {/* Add button */}
        <ButtonAddVendor
          title="افزودن همکار جدید"
          onClick={() => openModal("add")}
        />
        <ButtonLogin />
      </div>
    </div>
  );
}
