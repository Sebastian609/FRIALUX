import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateUserDTO } from "@/types/users/user.type";
import { updateUserService } from "@/services/user/update-user.service";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: UpdateUserDTO) => updateUserService(formData),
    onSuccess: () => {
  
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
