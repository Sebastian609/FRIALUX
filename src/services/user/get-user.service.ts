import { User } from "@/types/users/user.type"
import { fetch } from "@tauri-apps/plugin-http"

export const fetchUserById = async (userId: number): Promise<User> => {
  const response = await fetch(`http://localhost:2221/api/users/${userId}`,{
    method:"GET"
  })
  if (!response.ok) {
    throw new Error("Error al cargar usuarios")
  }
  return response.json()
}