import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteVendor } from "../services/vendorService";
import toast from "react-hot-toast";
import type { Vendors } from "../types/Vendors";

export default function useDeleteVendorFetch(id: number | undefined) {
  const queryClient = useQueryClient();
  const { mutate: deleteVendor, isPending } = useMutation<boolean, Error, void>(
    {
      mutationFn: () => {
        if (id === undefined) throw new Error("شناسه فروشنده مشخص نشده");
        return DeleteVendor(id);
      },
      onSuccess: () => {
        queryClient.setQueryData<Vendors[] | undefined>(
          ["Vendors"],
          (old) => old?.filter((v) => v.id !== id) ?? old
        );
        toast.success("فروشنده با موفقیت حذف شد.");
        // queryClient.invalidateQueries({ queryKey: ["Vendors", id] }); // ریفرش لیست
      },
      onError: (err: Error) => {
        toast.error(err.message);
      },
    }
  );

  return { deleteVendor, isPending };
}
