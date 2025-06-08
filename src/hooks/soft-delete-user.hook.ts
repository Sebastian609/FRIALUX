import { useMutation, useQueryClient } from "@tanstack/react-query";
import { softDeleteUserService } from "@/services/user/soft-delete-user.service";

export function useSoftDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: number) => softDeleteUserService(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
