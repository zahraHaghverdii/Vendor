import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddVendor } from "../services/vendorService";
import toast from "react-hot-toast";
import type { Vendors } from "../types/Vendors";

// تعریف type برای ورودی mutation
export type NewVendor = {
  id: number;
  companyName: string;
  manager: string;
  address?: string;
  phone: string;
  logo: string;
  location?: {
    lat: number;
    lng: number;
  };
};

export default function useAddVendor() {
  const queryClient = useQueryClient();

  const { mutate: addVendor, isPending } = useMutation<
    Vendors,
    Error,
    NewVendor
  >({
    mutationFn: AddVendor,
    onSuccess: () => {
      toast.success("فروشنده جدید با موفقیت اضافه شد.");
      queryClient.invalidateQueries({ queryKey: ["Vendors"] });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return { addVendor, isPending };
}
