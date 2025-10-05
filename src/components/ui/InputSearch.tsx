// ui/InputSearch.tsx
import { SearchNormal } from "iconsax-react";
import { useVendorSearchStore } from "../../store/useSearchSrore";

export default function InputSearch() {
  const { companyName, setCompanyName } = useVendorSearchStore();

  return (
    <div className="flex items-center justify-between gap-8 w-80 relative border rounded-2xl border-[var(--color-light--3)] py-4 px-3 bg-[var( --background-color)] rtl">
      <input
        type="text"
        placeholder="نام شرکت را وارد کنید"
        className=" placeholder-gray-400 w-full text-lg placeholder:text-xl"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <span>
        <SearchNormal color="var(--color-dark--2)" size={22} />
      </span>
    </div>
  );
}
