import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetch } from "@tauri-apps/plugin-http";
import {
  Configuration,
  UpdateConfigurationTemplate
} from "@/types/configuration/configuration.type";
import { API_BASE_URL } from "@/config/config";
export function useUpdateConfiguration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateConfigurationTemplate) => post(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["configurations"] });
    },
  });
}

const post = async (
  data: UpdateConfigurationTemplate
): Promise<Configuration> => {
  const response = await fetch(`${API_BASE_URL}configurations`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Error desconocido al actualizar la configuracion"
    );
  }
  return response.json();
};
