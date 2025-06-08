import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdatePasswordDTO } from "@/types/users/user.type";
import { updatePasswordService } from "@/services/user/update-password.service";

export function useUpdatePasswordUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdatePasswordDTO) => updatePasswordService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
