import { API_BASE_URL } from "@/config/config";
import { UpdateUserDTO, User } from "@/types/users/user.type"
import { fetch } from "@tauri-apps/plugin-http"

export const updateUserService = async (user: UpdateUserDTO): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}users`,{
    method:"PUT",
    body: JSON.stringify(user),
    headers: {
    "Content-Type": "application/json",
  },
  })
  if (!response.ok) {
     const errorData = await response.json();
    throw new Error(errorData.message || "Error desconocido al crear el usuario");
  }
  return response.json()
}