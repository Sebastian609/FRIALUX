import { API_BASE_URL } from "@/config/config"
import { SaveUserTemplate } from "@/types/users/saveUser.type"
import { User } from "@/types/users/user.type"
import { fetch } from "@tauri-apps/plugin-http"

export const createUser = async (userData:SaveUserTemplate):Promise<User>=> {
  const response = await fetch(`${API_BASE_URL}users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error desconocido al crear el usuario");
  }

  return response.json()
}
