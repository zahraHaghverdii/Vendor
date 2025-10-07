import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { User } from "../types/Users";
import { getIdUser } from "../services/userService";

export default function useIdUserFetch(id: number | null) {
  const {
    data: UserId,
    isLoading,
    isError,
  } = useQuery<User, Error>({
    queryKey: ["Users", id], // lowercase
    queryFn: async () => {
      try {
        if (id === null) return null as unknown as User; // اگر id null بود، هیچ fetch ای انجام نشه
        return await getIdUser(id);
      } catch (err) {
        if (err instanceof Error) toast.error(err.message);
        else toast.error("خطا در دریافت داده‌");
        throw err; // حتماً throw کن تا useQuery حالت error رو بشناسه
      }
    },
  });

  return { UserId, isLoading, isError };
}
