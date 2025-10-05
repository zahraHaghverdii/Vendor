import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditVendor } from "../services/vendorService";
import toast from "react-hot-toast";
import type { Vendors } from "../types/Vendors";

export default function useEditVendorFetch(id: number | undefined) {
  const queryClient = useQueryClient();

  const { mutate: editVendor, isPending } = useMutation<
    boolean,
    Error,
    Vendors
  >({
    mutationFn: (data: Vendors) => {
      if (id === undefined) throw new Error("شناسه فروشنده مشخص نشده");
      return EditVendor(id, data); // ارسال داده فرم به سرور
    },
    onSuccess: () => {
      toast.success("فروشنده با موفقیت ویرایش شد.");
      queryClient.invalidateQueries({ queryKey: ["Vendors"] });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return { editVendor, isPending };
}
