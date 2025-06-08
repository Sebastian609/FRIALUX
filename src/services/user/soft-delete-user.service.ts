import { User } from "@/types/users/user.type";
import { fetch } from "@tauri-apps/plugin-http";

export const softDeleteUserService = async (userId: number): Promise<User> => {
  const response = await fetch(`http://localhost:2221/api/users/${userId}`, {
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
