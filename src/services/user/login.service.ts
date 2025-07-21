import { LoginUserDTO } from "@/types/users/user.type";
import { API_BASE_URL } from "@/config/config";

export async function loginUser(credentials: LoginUserDTO) {
  const response = await fetch(`${API_BASE_URL}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error("Credenciales inválidas");
  }
  return response.json();
} 