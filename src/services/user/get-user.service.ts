import { API_BASE_URL } from "@/config/config"
import { User } from "@/types/users/user.type"
import { fetch } from "@tauri-apps/plugin-http"

export const fetchUserById = async (userId: number): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}users/${userId}`,{
    method:"GET"
  })
  if (!response.ok) {
    throw new Error("Error al cargar usuarios")
  }
  return response.json()
}