// hooks/useSearchVendor.ts
import { useQuery } from "@tanstack/react-query";
import { SearchVendorFetch } from "../services/vendorService";
import toast from "react-hot-toast";
import type { Vendors } from "../types/Vendors";

export default function useSearchVendor(companyName: string) {
  const {
    data: searchVendors = [],
    isLoading,
    isError,
  } = useQuery<Vendors[], Error>({
    queryKey: ["VendorsSearch", companyName],
    queryFn: async () => {
      try {
        return await SearchVendorFetch(companyName);
      } catch (err) {
        if (err instanceof Error) toast.error(err.message);
        else toast.error("خطا در دریافت داده‌ها");
        throw err;
      }
    },
    enabled: companyName.trim().length > 0, // fetch فقط وقتی مقدار معتبر باشه
  });

  return { searchVendors, isLoading, isError };
}
