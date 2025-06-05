import { fetchUsersResponse } from "@/types/users/fetchUsers.type"
import {fetch} from "@tauri-apps/plugin-http"

export const fetchUsers = async (page: number, itemsPerPage: number): Promise<fetchUsersResponse> => {
  const response = await fetch(`http://localhost:2221/api/users?page=${page}&items=${itemsPerPage}`)
  if (!response.ok) {
    throw new Error("Error al cargar usuarios")
  }
  return response.json()
}


 