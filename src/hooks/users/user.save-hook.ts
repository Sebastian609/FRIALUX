import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "@/services/user/save";
import { SaveUserTemplate } from "@/types/users/saveUser.type";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: SaveUserTemplate) => createUser(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
