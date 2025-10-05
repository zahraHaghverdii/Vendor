import Footer from "../layout/Footer";
import Dropdown from "../../context/DropdownItemsContext";
import useVendorFetch from "../../hooks/useVendorfetch";
import Spinner from "../ui/Spinner";
import VendorCard from "./VendorCard";
import useSearchVendor from "../../hooks/useSearchVendor";
import { useVendorSearchStore } from "../../store/useSearchSrore";

export default function VendorList() {
  const { companyName } = useVendorSearchStore();
  const { vendors = [], isLoading: isLoadingGetVendor } = useVendorFetch();
  const { searchVendors, isLoading: isLoadingSearchVendor } =
    useSearchVendor(companyName);

  // تعیین اینکه چه داده‌ای نمایش داده بشه
  const finalData = companyName ? searchVendors : vendors;
  const isLoading = companyName ? isLoadingSearchVendor : isLoadingGetVendor;

  return (
    <Dropdown>
      <div className=" bg-white w-full rounded-xl shadow-md p-4 flex flex-col h-[500px] order-1 md:order-2 rtl">
        <h2 className="text-xl font-medium text-gray-600 my-5">
          {finalData?.length} مورد پیدا شد
        </h2>

        {/* Vendor Cards */}
        <div className="space-y-10 overflow-y-auto h-full">
          {isLoading ? (
            <Spinner />
          ) : finalData?.length > 0 ? (
            finalData?.map((vendor) => (
              <VendorCard
                id={vendor.id}
                companyName={vendor.companyName}
                manager={vendor.manager}
                phone={vendor.phone}
                logo={vendor.logo}
                key={vendor.id}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center">موردی پیدا نشد</p>
          )}
        </div>

        <Footer />
      </div>
    </Dropdown>
  );
}
