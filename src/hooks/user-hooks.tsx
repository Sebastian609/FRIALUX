import { fetchUsers } from "@/services/user/userServices";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/stores/user-store";
import { fetchUsersResponse } from "@/types/users/fetchUsers.type";

export function useUsers() {
  const { page, itemsPerPage } = useUserStore();

  return useQuery<fetchUsersResponse>({
    queryKey: ["users", page, itemsPerPage],
    queryFn: () => fetchUsers(page, itemsPerPage),
    placeholderData: (previousData) => previousData,
  });
}
