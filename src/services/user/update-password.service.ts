import { UpdatePasswordDTO, User } from "@/types/users/user.type";
import { fetch } from "@tauri-apps/plugin-http";

export const updatePasswordService = async (data:UpdatePasswordDTO): Promise<User> => {
  const response = await fetch(`http://localhost:2221/api/users/update-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Error desconocido al crear el usuario"
    );
  }
  return response.json();
};
