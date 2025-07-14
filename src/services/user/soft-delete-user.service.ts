import { API_BASE_URL } from "@/config/config";
import { User } from "@/types/users/user.type";
import { fetch } from "@tauri-apps/plugin-http";

export const softDeleteUserService = async (userId: number): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}users/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Error desconocido al crear el usuario"
    );
  }
  return response.json();
};
