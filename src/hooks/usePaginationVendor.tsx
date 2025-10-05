import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PaginationVendorFetch } from "../services/vendorService";
import type { Vendors } from "../types/Vendors";

export function usepaginationVendor(page: number, limit: number) {
  const [paginationVendor, setPaginationVendor] = useState<Vendors[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoadingPagination] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoadingPagination(true);
      try {
        const { data, total } = await PaginationVendorFetch(page, limit);
        setPaginationVendor(data);
        setTotal(total);
      } catch (err: unknown) {
        if (err instanceof Error) toast.error(err.message);
      } finally {
        setLoadingPagination(false);
      }
    }

    fetchData();
  }, [page, limit]);

  return { paginationVendor, total, loading };
}
