import { useQuery } from "@tanstack/react-query";
import { PaginatedResponse } from "@/types/users/fetchUsers.type";
import { fetch } from "@tauri-apps/plugin-http"
import { Configuration } from "@/types/configuration/configuration.type";
import { useConfigurationStore } from "@/stores/configuration-store";
import { API_BASE_URL } from "@/config/config";

export function usePaginateConfigurations(id: number) {
  const { page, itemsPerPage } = useConfigurationStore();

  return useQuery<PaginatedResponse<Configuration>>({
    queryKey: ["configurations", page, itemsPerPage],
    queryFn: () => fetchData(page, itemsPerPage,id),
    placeholderData: (previousData) => previousData,
  });
}

const fetchData = async (page: number, itemsPerPage: number, id:number): Promise<PaginatedResponse<Configuration>> => {
  
    
  const response = await fetch(`${API_BASE_URL}configurations?page=${page}&items=${itemsPerPage}&id=${id}`)
  console.log(response);
  
  if (!response.ok) {
    throw new Error("Error al cargar configuraciones")
  }
  return response.json()
}

