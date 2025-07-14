import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetch } from "@tauri-apps/plugin-http"
import { Configuration, SaveConfigurationTemplate } from "@/types/configuration/configuration.type";
import { API_BASE_URL } from "@/config/config";



export function useCreateConfiguration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SaveConfigurationTemplate) => post(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["configurations"] });
    },
  });
}

const post = async (data: SaveConfigurationTemplate): Promise<Configuration> => {
  
  console.log(data);
  
  const response = await fetch(`${API_BASE_URL}configurations`,
    {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
  )
  if (!response.ok) {
     const errorData = await response.json();
    throw new Error(errorData.message || "Error desconocido al crear el usuario");
  
  }
  return response.json()
}