import { SaveUserTemplate } from "@/types/users/saveUser.type"
import { User } from "@/types/users/user.type"
import { fetch } from "@tauri-apps/plugin-http"

export const createUser = async (userData:SaveUserTemplate):Promise<User>=> {
  const response = await fetch("http://localhost:2221/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    throw new Error("Error al crear el usuario")
  }

  return response.json()
}
