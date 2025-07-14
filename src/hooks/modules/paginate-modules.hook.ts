import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/stores/user-store";
import { PaginatedResponse } from "@/types/users/fetchUsers.type";
import { Module } from "@/types/modules/module.type";
import { fetch } from "@tauri-apps/plugin-http"
import { API_BASE_URL } from "@/config/config";

export function usePaginateModules() {
  const { page, itemsPerPage } = useUserStore();

  return useQuery<PaginatedResponse<Module>>({
    queryKey: ["modules", page, itemsPerPage],
    queryFn: () => fetchData(page, itemsPerPage),
    placeholderData: (previousData) => previousData,
  });
}

const fetchData = async (page: number, itemsPerPage: number): Promise<PaginatedResponse<Module>> => {
  const response = await fetch(`${API_BASE_URL}modules?page=${page}&items=${itemsPerPage}`)
  if (!response.ok) {
    throw new Error("Error al cargar usuarios")
  }
  return response.json()
}

