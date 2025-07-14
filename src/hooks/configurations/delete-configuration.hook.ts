import { API_BASE_URL } from "@/config/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetch } from "@tauri-apps/plugin-http";
export function useDeleteConfiguration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (configurationId: number) => post(configurationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["configurations"] });
    },
  });
}

const post = async (
  configurationId: number
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/configurations/${configurationId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Error desconocido al actualizar la configuracion"
    );
  }
};
