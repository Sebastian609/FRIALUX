import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "@/services/user/get-user.service";
import { User } from "@/types/users/user.type";

export function useFetchUserById(userId: number) {
  return useQuery<User>({
    queryKey: ["get-user-id", userId],
    queryFn: () => fetchUserById(userId),
    placeholderData: (previousData) => previousData,
  });
}
