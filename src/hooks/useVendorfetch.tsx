import { useQuery } from "@tanstack/react-query";
import type { Vendors } from "../types/Vendors";
import toast from "react-hot-toast";
import { getAllVendors } from "../services/vendorService";

export default function useVendorFetch() {
  const {
    data: vendors,
    isLoading,
    isError,
  } = useQuery<Vendors[], Error>({
    queryKey: ["Vendors"], // lowercase
    queryFn: async () => {
      try {
        return await getAllVendors();
      } catch (err) {
        if (err instanceof Error) toast.error(err.message);
        else toast.error("خطا در دریافت داده‌ها");
        throw err; // حتماً throw کن تا useQuery حالت error رو بشناسه
      }
    },
  });

  return { vendors, isLoading, isError };
}
