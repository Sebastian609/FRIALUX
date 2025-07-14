import { API_BASE_URL } from "@/config/config"
import { fetchUsersResponse } from "@/types/users/fetchUsers.type"
import {fetch} from "@tauri-apps/plugin-http"

export const fetchUsers = async (page: number, itemsPerPage: number): Promise<fetchUsersResponse> => {
  const response = await fetch(`${API_BASE_URL}users?page=${page}&items=${itemsPerPage}`)
  if (!response.ok) {
    throw new Error("Error al cargar usuarios")
  }
  return response.json()
}


 