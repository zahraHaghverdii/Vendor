import { useQuery } from "@tanstack/react-query";
import type { Vendors } from "../types/Vendors";
import { getIdVendor } from "../services/vendorService";
import toast from "react-hot-toast";

export default function useIdVendorFetch(id: number | null) {
  const {
    data: VendorId,
    isLoading,
    isError,
  } = useQuery<Vendors, Error>({
    queryKey: ["Vendors", id], // lowercase
    queryFn: async () => {
      try {
        if (id === null) return null as unknown as Vendors; // اگر id null بود، هیچ fetch ای انجام نشه
        return await getIdVendor(id);
      } catch (err) {
        if (err instanceof Error) toast.error(err.message);
        else toast.error("خطا در دریافت داده‌");
        throw err; // حتماً throw کن تا useQuery حالت error رو بشناسه
      }
    },
  });

  return { VendorId, isLoading, isError };
}
