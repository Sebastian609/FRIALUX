import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetch } from "@tauri-apps/plugin-http"
import { SaveModuleTemplate } from "@/types/modules/saveModule.type";
import { Module } from "@/types/modules/module.type";
import { API_BASE_URL } from "@/config/config";


export function useCreateModule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SaveModuleTemplate) => post(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modules"] });
    },
  });
}

const post = async (data: SaveModuleTemplate): Promise<Module> => {
  const response = await fetch(`${API_BASE_URL}modules`,
    {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
  )
  if (!response.ok) {
    throw new Error("Error al cargar módulos")
  }
  return response.json()
}