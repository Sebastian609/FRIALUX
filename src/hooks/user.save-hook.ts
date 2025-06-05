import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "@/services/user/save";
import { SaveUserTemplate } from "@/types/users/saveUser.type";


// useCreateUser.ts
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: SaveUserTemplate) => createUser(formData),
    onSuccess: () => {
      alert("Usuario creado correctamente");
      queryClient.invalidateQueries({ queryKey: ["users"] }); // <-- asegúrate que useUsers usa esta key
    },
    onError: (error) => {
      alert(`Error: ${(error as Error).message}`);
    },
  });
}
